import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateBusServiceDto } from './dto/create-bus-service.dto';
import { BusServiceDto, SearchBusServicesQuerySortFilter, SearchBusServicesRes } from './dto/bus-service.dto';
import { UpdateBusServiceDto } from './dto/update-bus-service.dto';
import { BusServiceDocument } from './schema/bus-service.schema';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class BusServiceService {
  constructor(@InjectModel(BusServiceDocument.name) private readonly busServiceModel: Model<BusServiceDocument>) {}

  async create(createBusServiceDto: CreateBusServiceDto, tenantId: Types.ObjectId): Promise<BusServiceDto> {
    const createdBusServiceModel = new this.busServiceModel({ ...createBusServiceDto, tenantId });
    const savedBusService = await createdBusServiceModel.save();

    let busService = plainToInstance(BusServiceDto, savedBusService.toObject());
    busService = this.mapBusServiceIconUrl([busService])[0];
    return busService;
  }

  async update(updateBusServiceDto: UpdateBusServiceDto, tenantId: Types.ObjectId): Promise<BusServiceDto> {
    const updatedBusServiceModel = await this.busServiceModel
      .findOneAndUpdate({ _id: updateBusServiceDto._id, tenantId }, updateBusServiceDto, { new: true })
      .lean()
      .exec();
    if (!updatedBusServiceModel) {
      throw new NotFoundException(`Bus service with ID "${updateBusServiceDto._id}" not found.`);
    }

    let busService = plainToInstance(BusServiceDto, updatedBusServiceModel);
    busService = this.mapBusServiceIconUrl([busService])[0];
    return busService;
  }

  async delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean> {
    const result = await this.busServiceModel.findOneAndDelete({ _id: id, tenantId }).lean().exec();
    return result !== null;
  }

  async findAll(tenantIds: Types.ObjectId[]): Promise<BusServiceDto[]> {
    const busServicesModel = await this.busServiceModel
      .find({ tenantId: { $in: tenantIds } })
      .lean()
      .exec();

    let busServices = busServicesModel.map((busService) => {
      return plainToInstance(BusServiceDto, busService);
    });
    busServices = this.mapBusServiceIconUrl(busServices);
    return busServices;
  }

  async findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<BusServiceDto> {
    const busServiceModel = await this.busServiceModel
      .findOne({ _id: id, tenantId: { $in: tenantIds } })
      .lean()
      .exec();
    if (!busServiceModel) {
      throw new NotFoundException(`Bus service with ID "${id}" not found.`);
    }

    let busService = plainToInstance(BusServiceDto, busServiceModel);
    busService = this.mapBusServiceIconUrl([busService])[0];
    return busService;
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchBusServicesQuerySortFilter,
    filters: SearchBusServicesQuerySortFilter[],
    tenantIds: Types.ObjectId[],
  ): Promise<SearchBusServicesRes> {
    const pipeline = await this.buildQuerySearchBusServices(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);

    // Thực hiện tìm kiếm
    const busServices = await this.busServiceModel.aggregate(pipeline).exec();

    // Đếm tổng số mục
    const totalItem = await this.busServiceModel.countDocuments({ tenantId: { $in: tenantIds } });

    let result = plainToInstance(
      BusServiceDto,
      busServices.map((busService) => busService),
    );

    result = this.mapBusServiceIconUrl(result);

    return {
      pageIdx,
      busServices: result,
      totalPage: Math.ceil(totalItem / pageSize),
      totalItem,
    };
  }

  async buildQuerySearchBusServices(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchBusServicesQuerySortFilter,
    filters: SearchBusServicesQuerySortFilter[],
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

  mapBusServiceIconUrl(busServices: BusServiceDto[]): BusServiceDto[] {
    return busServices.map((busService) => {
      if (busService.iconId) {
        const port = process.env.PUBLIC_PORT ? `:${process.env.PUBLIC_PORT}` : '';
        busService.icon = `${process.env.DOMAIN}${port}/file/view/${busService.iconId.toString()}`;
      }
      return busService;
    });
  }
}
