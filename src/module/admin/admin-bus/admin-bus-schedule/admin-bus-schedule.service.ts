// src/bus-schedule/bus-schedule.service.ts
import { BusScheduleService } from '@/module/core/bus/bus-schedule/bus-schedule.service';
import { BusScheduleDocument } from '@/module/core/bus/bus-schedule/schema/bus-schedule.schema';
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { customAlphabet } from 'nanoid';
import {
  AdminBusScheduleDto,
  AdminSearchBusSchedulePagingQuery,
  AdminSearchBusSchedulePagingQuerySortFilter,
  AdminSearchBusSchedulePagingRes,
} from './dto/admin-bus-schedule.dto';
import { AdminCreateBusScheduleDto } from './dto/admin-create-bus-schedule.dto';
import { AdminUpdateBusScheduleDto } from './dto/admin-update-bus-schedule.dto';

@Injectable()
export class AdminBusScheduleService {
  private alphabet = process.env.ALPHABET || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  private nanoid = customAlphabet(this.alphabet, 6);

  constructor(
    @InjectModel(BusScheduleDocument.name) private busScheduleModel: Model<BusScheduleDocument>,
    @Inject(forwardRef(() => BusScheduleService)) private readonly busScheduleService: BusScheduleService,
  ) {}

  async create(
    adminCreateBusScheduleDto: AdminCreateBusScheduleDto,
    rootTenantId: Types.ObjectId,
    tenantId: Types.ObjectId,
  ): Promise<AdminBusScheduleDto> {
    return this.busScheduleService.create(adminCreateBusScheduleDto, rootTenantId, tenantId);
  }

  async findAll(tenantId: Types.ObjectId): Promise<AdminBusScheduleDto[]> {
    return this.busScheduleService.findAll(tenantId);
  }

  async findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<AdminBusScheduleDto> {
    return this.busScheduleService.findOne(id, tenantId);
  }

  async update(
    adminUpdateBusScheduleDto: AdminUpdateBusScheduleDto,
    tenantId: Types.ObjectId,
  ): Promise<AdminBusScheduleDto> {
    return this.busScheduleService.update(adminUpdateBusScheduleDto, tenantId);
  }

  async delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean> {
    return this.busScheduleService.delete(id, tenantId);
  }

  async searchBusSchedulePaging(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: AdminSearchBusSchedulePagingQuerySortFilter,
    filters: AdminSearchBusSchedulePagingQuerySortFilter[],
    tenantId: Types.ObjectId,
  ): Promise<AdminSearchBusSchedulePagingRes> {
    return this.busScheduleService.searchBusSchedulePaging(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
  }

  async updateCurrentStation(
    busScheduleId: Types.ObjectId,
    currentStationId: Types.ObjectId,
    tenantId: Types.ObjectId,
  ): Promise<AdminBusScheduleDto> {
    return this.busScheduleService.updateCurrentStation(busScheduleId, currentStationId, tenantId);
  }
}
