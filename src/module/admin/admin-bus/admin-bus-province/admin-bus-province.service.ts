import { BusProvinceService } from '@/module/core/bus/bus-province/bus-province.service';
import { BusProvinceDocument } from '@/module/core/bus/bus-province/schema/bus-schema.schema';
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  AdminBusProvinceDto,
  AdminSearchBusProvincesQuerySortFilter,
  AdminSearchBusProvincesRes,
} from './dto/admin-bus-province.dto';
import { AdminCloneBusProvinceDto, AdminCreateBusProvinceDto } from './dto/admin-create-bus-province.dto';
import { AdminUpdateBusProvinceDto } from './dto/admin-update-bus-province.dto';

@Injectable()
export class AdminBusProvinceService {
  ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';

  constructor(
    @InjectModel(BusProvinceDocument.name) private readonly busProvinceModel: Model<BusProvinceDocument>,
    @Inject(forwardRef(() => BusProvinceService))
    private readonly busProvinceService: BusProvinceService,
  ) {}

  async create(
    adminCreateBusProvinceDto: AdminCreateBusProvinceDto,
    tenantId: Types.ObjectId,
  ): Promise<AdminBusProvinceDto> {
    return this.busProvinceService.create(adminCreateBusProvinceDto, tenantId);
  }

  async clone(
    adminCloneBusProvinceDto: AdminCloneBusProvinceDto,
    tenantId: Types.ObjectId,
  ): Promise<AdminBusProvinceDto> {
    return this.busProvinceService.clone(adminCloneBusProvinceDto, tenantId);
  }

  async findAll(tenantIds: Types.ObjectId[]): Promise<AdminBusProvinceDto[]> {
    return this.busProvinceService.findAll(tenantIds);
  }

  async findAvailable(tenantId: Types.ObjectId): Promise<AdminBusProvinceDto[]> {
    return this.busProvinceService.findAvailable(tenantId);
  }

  async findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<AdminBusProvinceDto> {
    return this.busProvinceService.findOne(id, tenantIds);
  }

  async update(
    updateBusProvinceDto: AdminUpdateBusProvinceDto,
    tenantId: Types.ObjectId,
  ): Promise<AdminBusProvinceDto> {
    return this.busProvinceService.update(updateBusProvinceDto, tenantId);
  }

  async delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean> {
    return this.busProvinceService.delete(id, tenantId);
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: AdminSearchBusProvincesQuerySortFilter,
    filters: AdminSearchBusProvincesQuerySortFilter[],
    tenantIds: Types.ObjectId[],
  ): Promise<AdminSearchBusProvincesRes> {
    return this.busProvinceService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
  }
}
