import { BusTemplateService } from '@/module/core/bus/bus-template/bus-template.service';
import { BusTemplateDocument } from '@/module/core/bus/bus-template/schema/bus-template.schema';
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  ClientBusTemplateDto,
  ClientSearchBusTemplateQuerySortFilter,
  ClientSearchBusTemplateRes,
} from './dto/client-bus-template.dto';

@Injectable()
export class ClientBusTemplateService {
  ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';

  constructor(
    @InjectModel(BusTemplateDocument.name) private readonly busTemplateModel: Model<BusTemplateDocument>,
    @Inject(forwardRef(() => BusTemplateService)) private readonly busTemplateService: BusTemplateService,
  ) {}

  async findAll(tenantIds: Types.ObjectId[]): Promise<ClientBusTemplateDto[]> {
    return this.busTemplateService.findAll(tenantIds);
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: ClientSearchBusTemplateQuerySortFilter,
    filters: ClientSearchBusTemplateQuerySortFilter[],
    tenantIds: Types.ObjectId[],
  ): Promise<ClientSearchBusTemplateRes> {
    return this.busTemplateService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
  }
}
