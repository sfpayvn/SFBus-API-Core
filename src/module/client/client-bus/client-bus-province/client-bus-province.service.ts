import { BusProvinceService } from '@/module/core/bus/bus-province/bus-province.service';
import { BusProvinceDocument } from '@/module/core/bus/bus-province/schema/bus-schema.schema';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  ClientBusProvinceDto,
  ClientSearchBusProvincesQuerySortFilter,
  ClientSearchBusProvincesRes,
} from './dto/client-bus-province.dto';

@Injectable()
export class ClientBusProvinceService {
  ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';

  constructor(
    @InjectModel(BusProvinceDocument.name) private readonly busProvinceModel: Model<BusProvinceDocument>,
    @Inject(forwardRef(() => BusProvinceService))
    private readonly busProvinceService: BusProvinceService,
  ) {}

  async findAll(tenantIds: Types.ObjectId[]): Promise<ClientBusProvinceDto[]> {
    return this.busProvinceService.findAll(tenantIds);
  }

  async findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<ClientBusProvinceDto> {
    return this.busProvinceService.findOne(id, tenantIds);
  }
  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: ClientSearchBusProvincesQuerySortFilter,
    filters: ClientSearchBusProvincesQuerySortFilter[],
    tenantIds: Types.ObjectId[],
  ): Promise<ClientSearchBusProvincesRes> {
    return this.busProvinceService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
  }
}
