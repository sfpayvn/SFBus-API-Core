// bus-template.service.ts

import { BusScheduleLayoutService } from '@/module/core/bus/bus-schedule-layout/bus-schedule-layout.service';
import { BusScheduleLayoutDto } from '@/module/core/bus/bus-schedule-layout/dto/bus-schedule-layout.dto';
import { BusScheduleLayoutDocument } from '@/module/core/bus/bus-schedule-layout/schema/bus-schedule-layout.schema';
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model, Types } from 'mongoose';
import { AdminBusScheduleLayoutDto } from './dto/admin-bus-schedule-layout.dto';
import { AdminCreateBusScheduleLayoutDto } from './dto/admin-create-bus-schedule-layout.dto';
import { AdminUpdateBusScheduleLayoutDto } from './dto/admin-update-bus-schedule-layout.dto';

@Injectable()
export class AdminBusScheduleLayoutService {
  constructor(
    @InjectModel(BusScheduleLayoutDocument.name)
    private readonly busScheduleLayoutModel: Model<BusScheduleLayoutDocument>,
    @Inject(forwardRef(() => BusScheduleLayoutService))
    private readonly busScheduleLayoutService: BusScheduleLayoutService,
  ) {}

  async create(
    adminCreateBusScheduleLayoutDto: AdminCreateBusScheduleLayoutDto,
    tenantId: Types.ObjectId,
  ): Promise<AdminBusScheduleLayoutDto> {
    return this.busScheduleLayoutService.create(adminCreateBusScheduleLayoutDto, tenantId);
  }

  async update(
    adminUpdateBusScheduleLayoutDto: AdminUpdateBusScheduleLayoutDto,
    tenantId: Types.ObjectId,
  ): Promise<AdminBusScheduleLayoutDto> {
    return this.busScheduleLayoutService.update(adminUpdateBusScheduleLayoutDto, tenantId);
  }

  async remove(id: string, tenantId: Types.ObjectId): Promise<void> {
    await this.busScheduleLayoutService.remove(id, tenantId);
  }

  async findAll(tenantId: Types.ObjectId): Promise<AdminBusScheduleLayoutDto[]> {
    const templates = await this.busScheduleLayoutModel.find({ tenantId }).populate('seatLayouts').lean().exec();
    return templates.map((template) => plainToInstance(BusScheduleLayoutDto, template));
  }

  async findOne(busScheduleId: Types.ObjectId, tenantId: Types.ObjectId): Promise<AdminBusScheduleLayoutDto> {
    return this.busScheduleLayoutService.findOne(busScheduleId, tenantId);
  }

  async findOneByBusSchedule(
    busScheduleId: Types.ObjectId,
    tenantId: Types.ObjectId,
  ): Promise<AdminBusScheduleLayoutDto> {
    return this.busScheduleLayoutService.findOneByBusSchedule(busScheduleId, tenantId);
  }
}
