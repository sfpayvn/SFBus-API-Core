// bus-template.service.ts

import { BusScheduleLayoutService } from '@/module/core/bus/bus-schedule-layout/bus-schedule-layout.service';
import { BusScheduleLayoutDto } from '@/module/core/bus/bus-schedule-layout/dto/bus-schedule-layout.dto';
import { BusScheduleLayoutDocument } from '@/module/core/bus/bus-schedule-layout/schema/bus-schedule-layout.schema';
import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Model, Types } from 'mongoose';
import {
  ClientBusScheduleLayoutDto,
  ClientBusScheduleLayoutSeatDto,
  ClientBusScheduleSeatLayoutTemplateDto,
} from './dto/client-bus-schedule-layout.dto';

@Injectable()
export class ClientBusScheduleLayoutService {
  constructor(
    @InjectModel(BusScheduleLayoutDocument.name)
    private readonly busScheduleLayoutModel: Model<BusScheduleLayoutDocument>,
    @Inject(forwardRef(() => BusScheduleLayoutService))
    private readonly busScheduleLayoutService: BusScheduleLayoutService,
  ) {}

  async findAll(tenantId: Types.ObjectId): Promise<ClientBusScheduleLayoutDto[]> {
    const templates = await this.busScheduleLayoutModel.find({ tenantId }).populate('seatLayouts').lean().exec();
    return templates.map((template) => plainToInstance(BusScheduleLayoutDto, template));
  }

  async findOne(busScheduleId: Types.ObjectId, tenantId: Types.ObjectId): Promise<ClientBusScheduleLayoutDto> {
    return this.busScheduleLayoutService.findOne(busScheduleId, tenantId);
  }

  async findOneByBusSchedule(busScheduleId: Types.ObjectId, tenantId: Types.ObjectId): Promise<any> {
    const layout = await this.busScheduleLayoutService.findOneByBusSchedule(busScheduleId, tenantId);
    if (!layout) {
      throw new BadRequestException('không tìm thấy bố cục cho lịch trình xe buýt này');
    }
    layout.seatLayouts.map((seatLayout: ClientBusScheduleSeatLayoutTemplateDto) => {
      return seatLayout.seats.map((seat: ClientBusScheduleLayoutSeatDto) => {
        if (seat.bookingId) {
          seat.status = 'blocked';
        }
      });
    });
    return plainToInstance(ClientBusScheduleLayoutDto, layout, {});
  }
}
