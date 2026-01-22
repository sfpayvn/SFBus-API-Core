import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CloneBusProvinceDto, CreateBusProvinceDto } from './dto/create-bus-province.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BusProvinceDto, SearchBusProvincesQuerySortFilter, SearchBusProvincesRes } from './dto/bus-province.dto';
import { UpdateBusProvinceDto } from './dto/update-bus-province.dto';
import { BusProvinceDocument } from './schema/bus-schema.schema';
import { plainToInstance } from 'class-transformer';
import { BusStationService } from '../bus-station/bus-station.service';
import { BusStationDto } from '../bus-station/dto/bus-station.dto';

@Injectable()
export class BusProvinceService {
  constructor(
    @InjectModel(BusProvinceDocument.name) private readonly busProvinceModel: Model<BusProvinceDocument>,
    @Inject(forwardRef(() => BusStationService)) private readonly busStationService: BusStationService,
  ) {}

  async create(createBusProvinceDto: CreateBusProvinceDto, tenantId: Types.ObjectId): Promise<BusProvinceDto> {
    const createBusProvince = new this.busProvinceModel({ ...createBusProvinceDto, tenantId });
    const savedBusProvince = await createBusProvince.save();
    return plainToInstance(BusProvinceDto, savedBusProvince);
  }

  async clone(cloneBusProvinceDto: CloneBusProvinceDto, tenantId: Types.ObjectId): Promise<BusProvinceDto> {
    const busProvince = await this.create(cloneBusProvinceDto.busProvince, tenantId);

    await this.busStationService.createMany(cloneBusProvinceDto.busStations, tenantId, busProvince._id);
    return busProvince;
  }

  async findAll(tenantIds: Types.ObjectId[]): Promise<BusProvinceDto[]> {
    const busProvinces = await this.busProvinceModel
      .find({ tenantId: { $in: tenantIds } })
      .lean()
      .exec();
    return busProvinces.map((busProvince) => plainToInstance(BusProvinceDto, busProvince));
  }

  async findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<BusProvinceDto> {
    const busProvince = await this.busProvinceModel
      .findOne({ _id: id, tenantId: { $in: tenantIds } })
      .lean()
      .exec();
    if (!busProvince) {
      throw new NotFoundException('Bus province not found');
    }
    return plainToInstance(BusProvinceDto, busProvince);
  }

  async update(updateBusProvinceDto: UpdateBusProvinceDto, tenantId: Types.ObjectId): Promise<BusProvinceDto> {
    const updatedBusProvince = await this.busProvinceModel
      .findOneAndUpdate({ _id: updateBusProvinceDto._id, tenantId }, updateBusProvinceDto, { new: true })
      .lean()
      .exec();
    if (!updatedBusProvince) {
      throw new NotFoundException('Bus province not found');
    }
    return plainToInstance(BusProvinceDto, updatedBusProvince.toObject());
  }

  async delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean> {
    const result = await this.busProvinceModel.findOneAndDelete({ _id: id, tenantId }).lean().exec();
    return result !== null;
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchBusProvincesQuerySortFilter,
    filters: SearchBusProvincesQuerySortFilter[],
    tenantIds: Types.ObjectId[],
  ): Promise<SearchBusProvincesRes> {
    const pipeline = await this.buildQuerySearchBusProvince(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);

    pipeline.push({
      $lookup: {
        from: 'bus_stations',
        localField: '_id',
        foreignField: 'provinceId',
        as: 'busStations',
      },
    });

    // Thực hiện tìm kiếm
    const busProvinces = await this.busProvinceModel.aggregate(pipeline).exec();

    // Đếm tổng số mục
    const totalItem = await this.busProvinceModel.countDocuments({ tenantId: { $in: tenantIds } });

    const result = busProvinces.map((busProvince) => {
      const dto = plainToInstance(BusProvinceDto, busProvince);
      if (busProvince.busStations) {
        dto.busStations = busProvince.busStations.map((station: any) => plainToInstance(BusStationDto, station));
      }
      return dto;
    });

    return {
      pageIdx,
      busProvinces: result,
      totalPage: Math.ceil(totalItem / pageSize),
      totalItem,
    };
  }

  async buildQuerySearchBusProvince(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchBusProvincesQuerySortFilter,
    filters: SearchBusProvincesQuerySortFilter[],
    tenantIds: Types.ObjectId[],
  ) {
    // Thêm điều kiện kiểm tra điểm khởi hành nếu có

    const skip = pageIdx ? (pageIdx - 1) * pageSize : 0;

    const pipeline: any = [];
    const matchConditions: any[] = [{ tenantId: { $in: tenantIds } }];

    // 1. Tìm theo keyword
    if (keyword) {
      matchConditions.push({
        $or: [{ name: { $regex: keyword, $options: 'i' } }],
      });
    }

    // 2. Xác định start/end date và các filter còn lại
    let startDateValue: string = '';
    let endDateValue: string = '';

    if (Array.isArray(filters)) {
      await Promise.all(
        filters.map(async ({ key, value }) => {
          if (!key || value == null) return;

          if (key === 'startDate') {
            startDateValue = value;
          } else if (key === 'endDate') {
            endDateValue = value;
          } else {
            matchConditions.push({ [key]: value });
          }
        }),
      );
    }

    // 3. Tạo điều kiện range cho createdAt nếu có startDate và/hoặc endDate
    if (startDateValue || endDateValue) {
      const rangeCond: any = {};
      if (startDateValue) rangeCond.$gte = startDateValue;
      if (endDateValue) rangeCond.$lte = endDateValue;

      matchConditions.push({ startDate: rangeCond });
    }

    // 4. Đẩy $match nếu có bất kỳ điều kiện nào
    if (matchConditions.length) {
      pipeline.push({
        $match: { $and: matchConditions },
      });
    }

    // 4. $sort
    if (sortBy?.key) {
      pipeline.push({
        $sort: { [sortBy.key]: sortBy.value === 'ascend' ? 1 : -1 },
      });
    }

    // 5. paging: $skip + $limit
    pipeline.push({ $skip: skip }, { $limit: pageSize });
    return pipeline;
  }
}
