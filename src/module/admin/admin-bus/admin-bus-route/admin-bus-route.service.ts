import { BusRouteService } from '@/module/core/bus/bus-route/bus-route.service';
import { BusRouteDto } from '@/module/core/bus/bus-route/dto/bus-route.dto';
import { BusRouteDocument } from '@/module/core/bus/bus-route/schema/bus-route.schema';
import { forwardRef, Inject, Injectable, NotFoundException, Type } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  AdminBusRouteDto,
  AdminSearchBusRouteQuerySortFilter,
  AdminSearchBusRouteRes,
} from './dto/admin-admin-bus-route.dto';
import { AdminCreateBusRouteDto } from './dto/admin-create-bus-route.dto';
import { AdminUpdateBusRouteDto } from './dto/admin-update-bus-route.dto';

@Injectable()
export class AdminBusRouteService {
  ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';

  constructor(
    @InjectModel(BusRouteDocument.name) private readonly busRouteModel: Model<BusRouteDocument>,
    @Inject(forwardRef(() => BusRouteService))
    private readonly busRouteService: BusRouteService,
  ) {}

  async create(adminCreateBusRouteDto: AdminCreateBusRouteDto, tenantId: Types.ObjectId): Promise<AdminBusRouteDto> {
    return this.busRouteService.create(adminCreateBusRouteDto, tenantId);
  }

  async findAll(tenantIds: Types.ObjectId[]): Promise<AdminBusRouteDto[]> {
    return this.busRouteService.findAll(tenantIds);
  }

  async findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<AdminBusRouteDto> {
    return this.busRouteService.findOne(id, tenantIds);
  }

  async update(adminUpdateBusRouteDto: AdminUpdateBusRouteDto, tenantId: Types.ObjectId): Promise<AdminBusRouteDto> {
    return this.busRouteService.update(adminUpdateBusRouteDto, tenantId);
  }

  async delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean> {
    return this.busRouteService.delete(id, tenantId);
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: AdminSearchBusRouteQuerySortFilter,
    filters: AdminSearchBusRouteQuerySortFilter[],
    tenantIds: Types.ObjectId[],
  ): Promise<AdminSearchBusRouteRes> {
    return this.busRouteService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
  }

  async findByStationId(stationId: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<AdminBusRouteDto[]> {
    return this.busRouteService.findByStationId(stationId, tenantIds);
  }
}
