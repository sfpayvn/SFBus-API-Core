import { forwardRef, Inject, Injectable, NotFoundException, Type } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateBusRouteDto } from './dto/create-bus-route.dto';
import { UpdateBusRouteDto } from './dto/update-bus-route.dto';
import { BusRouteDto, SearchBusRouteQuerySortFilter, SearchBusRouteRes } from './dto/bus-route.dto';
import { BusRouteDocument } from './schema/bus-route.schema';
import { plainToInstance } from 'class-transformer';
import { BusStationService } from '../bus-station/bus-station.service';

@Injectable()
export class BusRouteService {
  constructor(
    @InjectModel(BusRouteDocument.name) private readonly busRouteModel: Model<BusRouteDocument>,
    @Inject(forwardRef(() => BusStationService)) private readonly busStationService: BusStationService,
  ) {}

  async create(createBusRouteDto: CreateBusRouteDto, tenantId: Types.ObjectId): Promise<BusRouteDto> {
    const createdBusroute = new this.busRouteModel({ ...createBusRouteDto, tenantId });
    const savedBusRoute = await createdBusroute.save();
    return plainToInstance(BusRouteDto, savedBusRoute);
  }

  async update(updateBusRouteDto: UpdateBusRouteDto, tenantId: Types.ObjectId): Promise<BusRouteDto> {
    const updatedBusService = await this.busRouteModel
      .findOneAndUpdate({ _id: updateBusRouteDto._id, tenantId }, updateBusRouteDto, { new: true })
      .lean()
      .exec();
    if (!updatedBusService) {
      throw new NotFoundException(`Bus service with ID "${updateBusRouteDto._id}" not found.`);
    }
    return plainToInstance(BusRouteDto, updatedBusService);
  }

  async delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean> {
    const result = await this.busRouteModel.findOneAndDelete({ _id: id, tenantId }).lean().exec();
    return result !== null;
  }

  async findAll(tenantIds: Types.ObjectId[]): Promise<BusRouteDto[]> {
    const busRoutesModel = await this.busRouteModel
      .find({ tenantId: { $in: tenantIds } })
      .populate('breakPoints.busStation')
      .lean()
      .exec();
    const result = plainToInstance(BusRouteDto, busRoutesModel);
    return result;
  }

  async findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<BusRouteDto> {
    const busRouteModel = await this.busRouteModel
      .findOne({ _id: id, tenantId: { $in: tenantIds } })
      .populate('breakPoints.busStation')
      .exec();
    if (!busRouteModel) throw new NotFoundException('Bus route not found');
    const busRoute = plainToInstance(BusRouteDto, busRouteModel);
    return busRoute;
  }

  async findByStationId(stationId: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<BusRouteDto[]> {
    const busRoutesModel = await this.busRouteModel
      .find({ 'breakPoints.busStationId': stationId, tenantId: { $in: tenantIds } })
      .populate('breakPoints.busStation')
      .lean()
      .exec();
    const result = plainToInstance(BusRouteDto, busRoutesModel);
    return result;
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchBusRouteQuerySortFilter,
    filters: SearchBusRouteQuerySortFilter[],
    tenantIds: Types.ObjectId[],
  ): Promise<SearchBusRouteRes> {
    const pipeline = await this.buildQuerySearchBusRoute(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);

    // Thực hiện tìm kiếm
    const busRoutes = await this.busRouteModel.aggregate(pipeline).exec();

    // Đếm tổng số mục
    const totalItem = await this.busRouteModel.countDocuments({ tenantId: { $in: tenantIds } });

    // Batch-fetch bus stations referenced in breakPoints to avoid N queries
    const stationIdSet = new Set<string>();
    for (const r of busRoutes) {
      if (!r.breakPoints) continue;
      for (const bp of r.breakPoints) {
        if (bp && bp.busStationId) stationIdSet.add(String(bp.busStationId));
      }
    }
    const stationIds = Array.from(stationIdSet).map((id) => new Types.ObjectId(id));
    const stations = await this.busStationService.findByIds(stationIds, tenantIds);
    const stationMap = new Map(stations.map((s: any) => [String(s._id), s]));

    const enriched = busRoutes.map((busRoute: any) => {
      if (!busRoute.breakPoints) return busRoute;
      for (const bp of busRoute.breakPoints) {
        bp.busStation = stationMap.get(String(bp.busStationId)) || null;
      }
      return busRoute;
    });

    const result = plainToInstance(BusRouteDto, enriched);

    return {
      pageIdx,
      busRoutes: result,
      totalPage: Math.ceil(totalItem / pageSize),
      totalItem,
    };
  }

  async buildQuerySearchBusRoute(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchBusRouteQuerySortFilter,
    filters: SearchBusRouteQuerySortFilter[],
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
