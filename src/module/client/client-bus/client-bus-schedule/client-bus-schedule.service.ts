// src/bus-schedule/bus-schedule.service.ts
import { BusScheduleService } from '@/module/core/bus/bus-schedule/bus-schedule.service';
import { BusScheduleDocument } from '@/module/core/bus/bus-schedule/schema/bus-schedule.schema';
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { customAlphabet } from 'nanoid';
import {
  ClientBusScheduleDto,
  ClientSearchBusSchedulePagingQuerySortFilter,
  ClientSearchBusSchedulePagingRes,
} from './dto/client-bus-schedule.dto';
import { EVENT_STATUS } from '@/common/constants/status.constants';

@Injectable()
export class ClientBusScheduleService {
  private alphabet = process.env.ALPHABET || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  private nanoid = customAlphabet(this.alphabet, 6);

  constructor(
    @InjectModel(BusScheduleDocument.name) private busScheduleModel: Model<BusScheduleDocument>,
    @Inject(forwardRef(() => BusScheduleService)) private readonly busScheduleService: BusScheduleService,
  ) {}

  async searchBusSchedulePaging(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: ClientSearchBusSchedulePagingQuerySortFilter,
    filters: ClientSearchBusSchedulePagingQuerySortFilter[],
    tenantId: Types.ObjectId,
  ): Promise<ClientSearchBusSchedulePagingRes> {
    const filterByStatus = {
      key: 'status',
      value: EVENT_STATUS.SCHEDULED,
    };

    filters.push(filterByStatus);

    return this.busScheduleService.searchBusSchedulePaging(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
  }
}
