// src/bus-schedule/bus-schedule.service.ts
import { BusScheduleTemplateDocument } from '@/module/core/bus/bus-schedule-template/schema/bus-schedule-template.schema';
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AdminCreateBusScheduleTemplateDto } from './dto/admin-create-bus-schedule-template.dto';
import { BusScheduleTemplateService } from '@/module/core/bus/bus-schedule-template/bus-schedule-template.service';
import { AdminUpdateBusScheduleTemplateDto } from './dto/admin-update-bus-schedule-template.dto';
import {
  AdminBusScheduleTemplateDto,
  AdminSearchBusScheduleTemplateQuerySortFilter,
} from './dto/admin-admin-bus-schedule-template.dto';

@Injectable()
export class AdminBusScheduleTemplateService {
  ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';

  constructor(
    @InjectModel(BusScheduleTemplateDocument.name) private BusScheduleTemplateModel: Model<BusScheduleTemplateDocument>,
    @Inject(forwardRef(() => BusScheduleTemplateService))
    private readonly busScheduleTemplateService: BusScheduleTemplateService,
  ) {}

  async create(adminCreateBusScheduleTemplateDto: AdminCreateBusScheduleTemplateDto, tenantId: Types.ObjectId) {
    return this.busScheduleTemplateService.create(adminCreateBusScheduleTemplateDto, tenantId);
  }

  update(adminUpdateBusScheduleTemplateDto: AdminUpdateBusScheduleTemplateDto, tenantId: Types.ObjectId) {
    return this.busScheduleTemplateService.update(adminUpdateBusScheduleTemplateDto, tenantId);
  }

  delete(id: Types.ObjectId, tenantId: Types.ObjectId) {
    return this.BusScheduleTemplateModel.findOneAndDelete({ _id: id, tenantId }).lean().exec();
  }

  async findAll(tenantIds: Types.ObjectId[]): Promise<AdminBusScheduleTemplateDto[]> {
    return this.busScheduleTemplateService.findAll(tenantIds);
  }

  async findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<AdminBusScheduleTemplateDto> {
    return this.busScheduleTemplateService.findOne(id, tenantIds);
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: AdminSearchBusScheduleTemplateQuerySortFilter,
    filters: AdminSearchBusScheduleTemplateQuerySortFilter[],
    tenantIds: Types.ObjectId[],
  ) {
    return this.busScheduleTemplateService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
  }
}
