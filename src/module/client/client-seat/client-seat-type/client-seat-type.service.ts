import { SeatTypeDocument } from '@/module/core/seat/seat-type/schema/seat-type.schema';
import { SeatTypeService } from '@/module/core/seat/seat-type/seat-type.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  ClientSeatTypeDto,
  ClientSearchSeatTypesQuerySortFilter,
  ClientSearchSeatTypeRes,
} from './dto/client-seat-type.dto';

@Injectable()
export class ClientSeatTypeService {
  ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';

  constructor(
    @InjectModel(SeatTypeDocument.name) private readonly seatTypeModel: Model<SeatTypeDocument>,
    @Inject(forwardRef(() => SeatTypeService))
    private readonly seatTypeService: SeatTypeService,
  ) {}

  async findAll(tenantIds: Types.ObjectId[]): Promise<ClientSeatTypeDto[]> {
    return this.seatTypeService.findAll(tenantIds);
  }

  async findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<ClientSeatTypeDto> {
    return this.seatTypeService.findOne(id, tenantIds);
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: ClientSearchSeatTypesQuerySortFilter,
    filters: ClientSearchSeatTypesQuerySortFilter[],
    tenantIds: Types.ObjectId[],
  ): Promise<ClientSearchSeatTypeRes> {
    return this.seatTypeService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
  }
}
