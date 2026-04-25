import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BusStationDocument } from '@/module/core/bus/bus-station/schema/bus-station.schema';
import { BusStationService } from '@/module/core/bus/bus-station/bus-station.service';
import {
  ClientBusStationDto,
  ClientSearchBusStationsQuerySortFilter,
  ClientSearchBusStationsRes,
} from './dto/client-bus-station.dto';

@Injectable()
export class ClientBusStationService {
  ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';

  constructor(
    @InjectModel(BusStationDocument.name) private readonly busStationModel: Model<BusStationDocument>,
    @Inject(forwardRef(() => BusStationService))
    private readonly busStationService: BusStationService,
  ) {}

  async findAll(tenantIds: Types.ObjectId[]): Promise<ClientBusStationDto[]> {
    return this.busStationService.findAll(tenantIds);
  }

  async findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<ClientBusStationDto> {
    return this.busStationService.findOne(id, tenantIds);
  }

  async findOneByProvinceId(provinceId: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<ClientBusStationDto> {
    return this.busStationService.findOneByProvinceId(provinceId, tenantIds);
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: ClientSearchBusStationsQuerySortFilter,
    filters: ClientSearchBusStationsQuerySortFilter[],
    tenantIds: Types.ObjectId[],
  ): Promise<ClientSearchBusStationsRes> {
    return this.busStationService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
  }
}
