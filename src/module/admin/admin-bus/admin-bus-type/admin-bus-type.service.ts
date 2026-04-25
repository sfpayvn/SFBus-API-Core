import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BusTypeDocument } from '@/module/core/bus/bus-type/schema/bus-type.schema';
import { BusTypeService } from '@/module/core/bus/bus-type/bus-type.service';
import { AdminBusTypeDto, AdminSearchBusTypesQuerySortFilter, AdminSearchBusTypesRes } from './dto/admin-bus-type.dto';
import { AdminCreateBusTypeDto } from './dto/admin-create-bus-type.dto';
import { AdminUpdateBusTypeDto } from './dto/admin-update-bus-type.dto';

@Injectable()
export class AdminBusTypeService {
  ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';

  constructor(
    @InjectModel(BusTypeDocument.name) private readonly busTypeModel: Model<BusTypeDocument>,
    @Inject(forwardRef(() => BusTypeService))
    private readonly busTypeService: BusTypeService,
  ) {}

  async create(adminCreateBusTypeDto: AdminCreateBusTypeDto, tenantId: Types.ObjectId): Promise<AdminBusTypeDto> {
    return this.busTypeService.create(adminCreateBusTypeDto, tenantId);
  }

  async update(adminUpdateBusTypeDto: AdminUpdateBusTypeDto, tenantId: Types.ObjectId): Promise<AdminBusTypeDto> {
    return this.busTypeService.update(adminUpdateBusTypeDto, tenantId);
  }

  async delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean> {
    return this.busTypeService.delete(id, tenantId);
  }

  async findAll(tenantIds: Types.ObjectId[]): Promise<AdminBusTypeDto[]> {
    return this.busTypeService.findAll(tenantIds);
  }

  async findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<AdminBusTypeDto> {
    return this.busTypeService.findOne(id, tenantIds);
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: AdminSearchBusTypesQuerySortFilter,
    filters: AdminSearchBusTypesQuerySortFilter[],
    tenantIds: Types.ObjectId[],
  ): Promise<AdminSearchBusTypesRes> {
    return this.busTypeService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
  }
}
