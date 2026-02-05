import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BusStationDocument } from '@/module/core/bus/bus-station/schema/bus-station.schema';
import { BusStationService } from '@/module/core/bus/bus-station/bus-station.service';
import {
  AdminBusStationDto,
  AdminSearchBusStationsQuerySortFilter,
  AdminSearchBusStationsRes,
} from './dto/admin-bus-station.dto';
import { AdminCreateBusStationDto } from './dto/admin-create-bus-station.dto';
import { AdminUpdateBusStationDto } from './dto/admin-update-bus-station.dto';

@Injectable()
export class AdminBusStationService {
  ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';

  constructor(
    @InjectModel(BusStationDocument.name) private readonly busStationModel: Model<BusStationDocument>,
    @Inject(forwardRef(() => BusStationService))
    private readonly busStationService: BusStationService,
  ) {}

  async create(
    adminCreateBusStationDto: AdminCreateBusStationDto,
    tenantId: Types.ObjectId,
  ): Promise<AdminBusStationDto> {
    return this.busStationService.create(adminCreateBusStationDto, tenantId);
  }

  async update(
    adminUpdateBusStationDto: AdminUpdateBusStationDto,
    tenantId: Types.ObjectId,
  ): Promise<AdminBusStationDto> {
    return this.busStationService.update(adminUpdateBusStationDto, tenantId);
  }

  async updates(
    adminUpdateBusStationDto: AdminUpdateBusStationDto[],
    tenantIds: Types.ObjectId[],
  ): Promise<AdminBusStationDto[]> {
    return this.busStationService.updates(adminUpdateBusStationDto, tenantIds);
  }

  async delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean> {
    return this.busStationService.delete(id, tenantId);
  }

  async findAll(tenantIds: Types.ObjectId[]): Promise<AdminBusStationDto[]> {
    return this.busStationService.findAll(tenantIds);
  }

  async findAllAvailable(tenantId: Types.ObjectId): Promise<AdminBusStationDto[]> {
    return this.busStationService.findAllAvailable(tenantId);
  }
  async findAllUnAssignedAvailable(tenantId: Types.ObjectId): Promise<AdminBusStationDto[]> {
    return this.busStationService.findAllUnAssignedAvailable(tenantId);
  }

  async findOffices(tenantIds: Types.ObjectId[]): Promise<AdminBusStationDto[]> {
    return this.busStationService.findOffices(tenantIds);
  }

  async findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<AdminBusStationDto> {
    return this.busStationService.findOne(id, tenantIds);
  }

  async findOneByProvinceId(provinceId: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<AdminBusStationDto> {
    return this.busStationService.findOneByProvinceId(provinceId, tenantIds);
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: AdminSearchBusStationsQuerySortFilter,
    filters: AdminSearchBusStationsQuerySortFilter[],
    tenantIds: Types.ObjectId[],
  ): Promise<AdminSearchBusStationsRes> {
    return this.busStationService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
  }
}
