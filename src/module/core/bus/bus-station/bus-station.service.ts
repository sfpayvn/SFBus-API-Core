import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Types } from 'mongoose';
import { CreateBusStationDto } from './dto/create-bus-station.dto';
import { UpdateBusStationDto } from './dto/update-bus-station.dto';
import { BusStationDto, SearchBusStationsQuerySortFilter, SearchBusStationsRes } from './dto/bus-station.dto';
import { BusStationDocument } from './schema/bus-station.schema';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class BusStationService {
  constructor(@InjectModel(BusStationDocument.name) private readonly busStationModel: Model<BusStationDocument>) {}

  async create(createBusStationDto: CreateBusStationDto, tenantId: Types.ObjectId): Promise<BusStationDto> {
    const createdBusStation = new this.busStationModel({ ...createBusStationDto, tenantId });
    const savedBusStation = await createdBusStation.save();
    return plainToInstance(BusStationDto, savedBusStation.toObject());
  }

  createMany(
    createBusStationDtos: CreateBusStationDto[],
    tenantId: Types.ObjectId,
    provinceId: Types.ObjectId,
    session?: ClientSession,
  ): Promise<BusStationDto[]> {
    const busStationPromises = createBusStationDtos.map(async (dto) => {
      const createdBusStation = new this.busStationModel({ ...dto, tenantId, provinceId });
      const savedBusStation = await createdBusStation.save({ session });
      return plainToInstance(BusStationDto, savedBusStation.toObject());
    });

    return Promise.all(busStationPromises);
  }

  async update(updateBusStationDto: UpdateBusStationDto, tenantId: Types.ObjectId): Promise<BusStationDto> {
    const updatedBusStation = await this.busStationModel
      .findOneAndUpdate({ _id: updateBusStationDto._id, tenantId }, updateBusStationDto, { new: true })
      .lean()
      .exec();
    if (!updatedBusStation) {
      throw new NotFoundException('Bus province not found');
    }
    let result = plainToInstance(BusStationDto, updatedBusStation);
    result = (await this.mapImageUrl([result]))[0];
    return result;
  }

  async updates(updateBusStationDtos: UpdateBusStationDto[], tenantIds: Types.ObjectId[]): Promise<BusStationDto[]> {
    const updatedBusStations = await Promise.all(
      updateBusStationDtos.map(async (updateBusStationDto) => {
        const updatedBusStation = await this.busStationModel
          .findOneAndUpdate({ _id: updateBusStationDto._id, tenantId: { $in: tenantIds } }, updateBusStationDto, {
            new: true,
          })
          .lean()
          .exec();
        if (!updatedBusStation) {
          throw new NotFoundException('Bus station not found');
        }
        return plainToInstance(BusStationDto, updatedBusStation);
      }),
    );

    return updatedBusStations;
  }

  async delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean> {
    const result = await this.busStationModel.findOneAndDelete({ _id: id, tenantId }).lean().exec();
    return result !== null;
  }

  async findAll(tenantIds: Types.ObjectId[]): Promise<BusStationDto[]> {
    const busStations = await this.busStationModel
      .find({ tenantId: { $in: tenantIds } })
      .lean()
      .exec();
    let result = busStations.map((busStation) => plainToInstance(BusStationDto, busStation));
    result = await this.mapImageUrl(result);
    return result;
  }

  async findAllAvailable(tenantId: Types.ObjectId): Promise<BusStationDto[]> {
    const busStations = await this.busStationModel
      .find({ tenantId, provinceId: { $ne: null }, isActive: true })
      .lean()
      .exec();
    let result = busStations.map((busStation) => plainToInstance(BusStationDto, busStation));
    result = await this.mapImageUrl(result);
    return result;
  }


   async findAllUnAssignedAvailable(tenantId: Types.ObjectId): Promise<BusStationDto[]> {
    const busStations = await this.busStationModel
      .find({ tenantId, provinceId: { $eq: null }, isActive: true })
      .lean()
      .exec();
    let result = busStations.map((busStation) => plainToInstance(BusStationDto, busStation));
    result = await this.mapImageUrl(result);
    return result;
  }

  async findOffices(tenantIds: Types.ObjectId[]): Promise<BusStationDto[]> {
    const busStations = await this.busStationModel
      .find({ tenantId: { $in: tenantIds }, provinceId: { $ne: null }, isActive: true, isOffice: true })
      .lean()
      .exec();
    let result = busStations.map((busStation) => plainToInstance(BusStationDto, busStation));
    result = await this.mapImageUrl(result);
    return result;
  }

  async findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<BusStationDto> {
    const busStation = await this.busStationModel
      .findOne({ _id: id, tenantId: { $in: tenantIds } })
      .lean()
      .exec();
    if (!busStation) {
      throw new NotFoundException(`Bus station with ID "${id}" not found.`);
    }
    let result = plainToInstance(BusStationDto, busStation);
    result = (await this.mapImageUrl([result]))[0];
    return result;
  }

  async findByIds(ids: Types.ObjectId[], tenantIds: Types.ObjectId[]): Promise<BusStationDto[]> {
    if (!ids || !ids.length) return [];
    const busStations = await this.busStationModel
      .find({ _id: { $in: ids }, tenantId: { $in: tenantIds } })
      .lean()
      .exec();
    let result = busStations.map((busStation) => plainToInstance(BusStationDto, busStation));
    result = await this.mapImageUrl(result);
    return result;
  }

  async findOneByProvinceId(provinceId: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<BusStationDto> {
    const busStation = await this.busStationModel
      .findOne({ provinceId, tenantId: { $in: tenantIds } })
      .lean()
      .exec();
    if (!busStation) {
      throw new NotFoundException(`Bus Province with ID "${provinceId}" not found.`);
    }
    let result = plainToInstance(BusStationDto, busStation);
    result = (await this.mapImageUrl([result]))[0];
    return result;
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchBusStationsQuerySortFilter,
    filters: SearchBusStationsQuerySortFilter[],
    tenantIds: Types.ObjectId[],
  ): Promise<SearchBusStationsRes> {
    const pipeline = await this.buildQuerySearchBusStation(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);

    // Thực hiện tìm kiếm
    const busStations = await this.busStationModel.aggregate(pipeline).exec();

    // Đếm tổng số mục
    const totalItem = await this.busStationModel.countDocuments({ tenantId: { $in: tenantIds } });

    const result = plainToInstance(
      BusStationDto,
      busStations.map((busStation) => busStation),
    );
    let mapped = result;
    mapped = await this.mapImageUrl(mapped);
    return {
      pageIdx,
      busStations: mapped,
      totalPage: Math.ceil(totalItem / pageSize),
      totalItem,
    };
  }

  async mapImageUrl(busStations: BusStationDto[]): Promise<BusStationDto[]> {
    return await Promise.all(
      busStations.map(async (busStation) => {
        if (busStation.imageId) {
          busStation.image = `${process.env.DOMAIN}:${process.env.PORT}/file/view/${busStation.imageId.toString()}`;
        }
        return busStation;
      }),
    );
  }

  async buildQuerySearchBusStation(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchBusStationsQuerySortFilter,
    filters: SearchBusStationsQuerySortFilter[],
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
