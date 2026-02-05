import { BusTemplateService } from '@/module/core/bus/bus-template/bus-template.service';
import { BusTemplateDocument } from '@/module/core/bus/bus-template/schema/bus-template.schema';
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  AdminBusTemplateDto,
  AdminSearchBusTemplateQuerySortFilter,
  AdminSearchBusTemplateRes,
} from './dto/admin-bus-template.dto';
import { AdminCreateBusTemplateDto } from './dto/admin-create-bus-template.dto';
import { AdminUpdateBusTemplateDto } from './dto/admin-update-bus-template.dto';

@Injectable()
export class AdminBusTemplateService {
  ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';

  constructor(
    @InjectModel(BusTemplateDocument.name) private readonly busTemplateModel: Model<BusTemplateDocument>,
    @Inject(forwardRef(() => BusTemplateService)) private readonly busTemplateService: BusTemplateService,
  ) {}

  async create(
    adminCreateBusTemplateDto: AdminCreateBusTemplateDto,
    tenantId: Types.ObjectId,
  ): Promise<AdminBusTemplateDto> {
    return this.busTemplateService.create(adminCreateBusTemplateDto, tenantId);
  }

  async update(
    adminUpdateBusTemplateDto: AdminUpdateBusTemplateDto,
    tenantId: Types.ObjectId,
  ): Promise<AdminBusTemplateDto> {
    return this.busTemplateService.update(adminUpdateBusTemplateDto, tenantId);
  }

  async delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean> {
    return this.busTemplateService.delete(id, tenantId);
  }

  async findAll(tenantIds: Types.ObjectId[]): Promise<AdminBusTemplateDto[]> {
    return this.busTemplateService.findAll(tenantIds);
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: AdminSearchBusTemplateQuerySortFilter,
    filters: AdminSearchBusTemplateQuerySortFilter[],
    tenantIds: Types.ObjectId[],
  ): Promise<AdminSearchBusTemplateRes> {
    return this.busTemplateService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
  }
}
