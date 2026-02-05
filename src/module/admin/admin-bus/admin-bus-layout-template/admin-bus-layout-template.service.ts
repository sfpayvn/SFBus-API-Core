// bus-template.service.ts

import {
  BusLayoutTemplateDto,
  SearchBusLayoutTemplateQuerySortFilter,
} from '@/module/core/bus/bus-layout-template/dto/bus-layout-template.dto';
import { BusLayoutTemplateDocument } from '@/module/core/bus/bus-layout-template/schema/bus-layout-template.schema';
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AdminBusLayoutTemplateDto, AdminSearchBusTemplateRes } from './dto/admin-bus-layout-template.dto';
import { AdminCreateBusLayoutTemplateDto } from './dto/admin-create-bus-layout-template.dto';
import { AdminUpdateBusLayoutTemplateDto } from './dto/admin-update-bus-layout-template.dto';
import { BusLayoutTemplateService } from '@/module/core/bus/bus-layout-template/bus-layout-template.service';

@Injectable()
export class AdminBusLayoutTemplateService {
  ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';

  constructor(
    @InjectModel(BusLayoutTemplateDocument.name) private busLayoutTemplateModel: Model<BusLayoutTemplateDocument>,
    @Inject(forwardRef(() => BusLayoutTemplateService))
    private readonly busLayoutTemplateService: BusLayoutTemplateService,
  ) {}

  async create(
    adminCreateBusLayoutTemplateDto: AdminCreateBusLayoutTemplateDto,
    tenantId: Types.ObjectId,
  ): Promise<AdminBusLayoutTemplateDto> {
    return this.busLayoutTemplateService.create(adminCreateBusLayoutTemplateDto, tenantId);
  }

  async findAll(tenantIds: Types.ObjectId[]): Promise<BusLayoutTemplateDto[]> {
    return await this.busLayoutTemplateService.findAll(tenantIds);
  }

  async findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<AdminBusLayoutTemplateDto> {
    return this.busLayoutTemplateService.findOne(id, tenantIds);
  }

  async update(
    adminUpdateBusLayoutTemplateDto: AdminUpdateBusLayoutTemplateDto,
    tenantId: Types.ObjectId,
  ): Promise<AdminBusLayoutTemplateDto> {
    return this.busLayoutTemplateService.update(adminUpdateBusLayoutTemplateDto, tenantId);
  }

  async delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean> {
    return this.busLayoutTemplateService.delete(id, tenantId);
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchBusLayoutTemplateQuerySortFilter,
    filters: SearchBusLayoutTemplateQuerySortFilter[],
    tenantIds: Types.ObjectId[],
  ): Promise<AdminSearchBusTemplateRes> {
    return this.busLayoutTemplateService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
  }
}
