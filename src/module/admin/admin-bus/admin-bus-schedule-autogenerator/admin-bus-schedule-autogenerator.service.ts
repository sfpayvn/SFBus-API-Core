// src/bus-schedule/bus-schedule.service.ts
import { BusScheduleAutogeneratorService } from '@/module/core/bus/bus-schedule-autogenerator/bus-schedule-autogenerator.service';
import { BusScheduleAutogeneratorDto } from '@/module/core/bus/bus-schedule-autogenerator/dto/bus-schedule-autogenerator.dto';
import { CreateBusScheduleAutogeneratorDto } from '@/module/core/bus/bus-schedule-autogenerator/dto/create-bus-schedule-autogenerator.dto';
import {
  BusScheduleAutogeneratorDocument,
  SpecificTimeSlotDocument,
} from '@/module/core/bus/bus-schedule-autogenerator/schema/bus-schedule-autogenerator.schema';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model, Types } from 'mongoose';
import { customAlphabet } from 'nanoid';
import {
  AdminBusScheduleAutogeneratorDto,
  AdminSearchBusSchedulePagingQuerySortFilter,
  AdminSearchBusScheduleRes,
} from './dto/admin-bus-schedule-autogenerator.dto';
import { AdminCreateBusScheduleAutogeneratorDto } from './dto/admin-create-bus-schedule-autogenerator.dto';
import { AdminUpdateBusScheduleAutogeneratorDto } from './dto/admin-update-bus-schedule-autogenerator.dto';

@Injectable()
export class AdminBusScheduleAutogeneratorService {
  private alphabet = process.env.ALPHABET || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  private nanoid = customAlphabet(this.alphabet, 6);

  constructor(
    @InjectModel(BusScheduleAutogeneratorDocument.name)
    private busScheduleAutogeneratorModel: Model<BusScheduleAutogeneratorDocument>,
    @Inject(forwardRef(() => BusScheduleAutogeneratorService))
    private readonly busScheduleAutogeneratorService: BusScheduleAutogeneratorService,
  ) {}

  async create(
    adminCreateBusScheduleAutogeneratorDto: AdminCreateBusScheduleAutogeneratorDto,
    tenantId: Types.ObjectId,
    timezoneOffset: number,
  ): Promise<AdminBusScheduleAutogeneratorDto> {
    return this.busScheduleAutogeneratorService.create(
      adminCreateBusScheduleAutogeneratorDto,
      tenantId,
      timezoneOffset,
    );
  }

  async update(
    adminUpdateBusScheduleAutogeneratorDto: AdminUpdateBusScheduleAutogeneratorDto,
    tenantId: Types.ObjectId,
    timezoneOffset: number,
  ): Promise<BusScheduleAutogeneratorDto> {
    return this.busScheduleAutogeneratorService.update(
      adminUpdateBusScheduleAutogeneratorDto,
      tenantId,
      timezoneOffset,
    );
  }

  async delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean> {
    return this.busScheduleAutogeneratorService.delete(id, tenantId);
  }

  async findAll(tenantId: Types.ObjectId): Promise<AdminBusScheduleAutogeneratorDto[]> {
    return this.busScheduleAutogeneratorService.findAll(tenantId);
  }

  async runCreateBusSchedule(
    _id: Types.ObjectId,
    rootTenantId: Types.ObjectId,
    tenantId: Types.ObjectId,
  ): Promise<boolean> {
    return this.busScheduleAutogeneratorService.runCreateBusSchedule(_id, rootTenantId, tenantId);
  }

  async searchBusScheduleAutogenerator(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: AdminSearchBusSchedulePagingQuerySortFilter,
    filters: AdminSearchBusSchedulePagingQuerySortFilter[],
    tenantId: Types.ObjectId,
  ): Promise<AdminSearchBusScheduleRes> {
    return this.busScheduleAutogeneratorService.searchBusScheduleAutogenerator(
      pageIdx,
      pageSize,
      keyword,
      sortBy,
      filters,
      tenantId,
    );
  }

  generateSchedulesForToday(tenantId: Types.ObjectId, timezoneOffset: number): Promise<void> {
    return this.busScheduleAutogeneratorService.generateSchedulesForToday(tenantId, timezoneOffset);
  }
}
