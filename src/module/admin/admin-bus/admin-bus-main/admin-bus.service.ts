import { BusDocument } from '@/module/core/bus/bus/schema/bus.schema';
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AdminBusDto, AdminSearchBusQuerySortFilter, AdminSearchBusRes } from './dto/admin-bus.dto';
import { AdminCreateBusDto } from './dto/admin-create-bus.dto';
import { AdminUpdateBusDto } from './dto/admin-update-bus.dto';
import { BusService } from '@/module/core/bus/bus/bus.service';

@Injectable()
export class AdminBusService {
  constructor(
    @InjectModel(BusDocument.name) private readonly busModel: Model<BusDocument>,
    @Inject(forwardRef(() => BusService))
    private readonly busService: BusService,
  ) {}

  async create(adminCreateBusDto: AdminCreateBusDto, tenantId: Types.ObjectId): Promise<AdminBusDto> {
    return this.busService.create(adminCreateBusDto, tenantId);
  }

  async update(adminUpdateBusDto: AdminUpdateBusDto, tenantId: Types.ObjectId): Promise<AdminBusDto> {
    return this.busService.update(adminUpdateBusDto, tenantId);
  }

  async delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean> {
    return this.busService.delete(id, tenantId);
  }

  async findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<AdminBusDto | null> {
    return this.busService.findOne(id, tenantId);
  }

  async findByBusTemplate(
    busTemplateId: Types.ObjectId,
    tenantId: Types.ObjectId,
    rootTenantId: Types.ObjectId,
  ): Promise<AdminBusDto[]> {
    return this.busService.findByBusTemplate(busTemplateId, tenantId, rootTenantId);
  }

  async findAll(tenantId: Types.ObjectId): Promise<AdminBusDto[]> {
    return this.busService.findAll(tenantId);
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: AdminSearchBusQuerySortFilter,
    filters: AdminSearchBusQuerySortFilter[],
    tenantId: Types.ObjectId,
  ): Promise<AdminSearchBusRes> {
    return this.busService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
  }
}
