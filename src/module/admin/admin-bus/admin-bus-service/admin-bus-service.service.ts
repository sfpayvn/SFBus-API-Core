import { BusServiceService } from '@/module/core/bus/bus-service/bus-service.service';
import { UpdateBusServiceDto } from '@/module/core/bus/bus-service/dto/update-bus-service.dto';
import { BusServiceDocument } from '@/module/core/bus/bus-service/schema/bus-service.schema';
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  AdminBusServiceDto,
  AdminSearchBusServicesQuerySortFilter,
  AdminSearchBusServicesRes,
} from './dto/admin-bus-service.dto';
import { AdminCreateBusServiceDto } from './dto/admin-create-bus-service.dto';
import { AdminUpdateBusServiceDto } from './dto/admin-update-bus-service.dto';

@Injectable()
export class AdminBusServiceService {
  ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';

  constructor(
    @Inject(forwardRef(() => BusServiceService))
    private readonly busServiceService: BusServiceService,
  ) {}

  async create(
    adminCreateBusServiceDto: AdminCreateBusServiceDto,
    tenantId: Types.ObjectId,
  ): Promise<AdminBusServiceDto> {
    return this.busServiceService.create(adminCreateBusServiceDto, tenantId);
  }

  async update(
    adminUpdateBusServiceDto: AdminUpdateBusServiceDto,
    tenantId: Types.ObjectId,
  ): Promise<AdminBusServiceDto> {
    return this.busServiceService.update(adminUpdateBusServiceDto, tenantId);
  }

  async delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean> {
    return this.busServiceService.delete(id, tenantId);
  }

  async findAll(tenantIds: Types.ObjectId[]): Promise<AdminBusServiceDto[]> {
    return this.busServiceService.findAll(tenantIds);
  }

  async findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<AdminBusServiceDto> {
    return this.busServiceService.findOne(id, tenantIds);
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: AdminSearchBusServicesQuerySortFilter,
    filters: AdminSearchBusServicesQuerySortFilter[],
    tenantIds: Types.ObjectId[],
  ): Promise<AdminSearchBusServicesRes> {
    return this.busServiceService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
  }
}
