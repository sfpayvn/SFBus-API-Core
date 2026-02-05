// driver.service.ts

import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { DriverDocument } from '@/module/core/user/driver/schema/driver.schema';
import { DriverService } from '@/module/core/user/driver/driver.service';
import { AdminCreateDriverDto } from './dto/admin-create-driver.dto';
import { AdminDriverDto, AdminSearchDriversQuerySortFilter, AdminSearchDriversRes } from './dto/admin-driver.dto';
import { AdminUpdateDriverDto } from './dto/admin-update-driver.dto';

@Injectable()
export class AdminDriverService {
  constructor(
    @InjectModel(DriverDocument.name) private driverModel: Model<DriverDocument>,
    @Inject(forwardRef(() => DriverService))
    private readonly driverService: DriverService,
  ) {}

  async create(adminCreateDriverDto: AdminCreateDriverDto, tenantId: Types.ObjectId): Promise<AdminDriverDto> {
    return this.driverService.create(adminCreateDriverDto, tenantId);
  }

  async update(adminUpdateDriverDto: AdminUpdateDriverDto, tenantId: Types.ObjectId): Promise<AdminDriverDto> {
    return this.driverService.update(adminUpdateDriverDto, tenantId);
  }

  async delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean> {
    return this.driverService.delete(id, tenantId);
  }

  async deleteByUserId(userId: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean> {
    return this.driverService.deleteByUserId(userId, tenantId);
  }

  async findAllUserDriver(tenantId: Types.ObjectId): Promise<AdminDriverDto[]> {
    return this.driverService.findAllUserDriver(tenantId);
  }

  async findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<AdminDriverDto> {
    return this.driverService.findOne(id, tenantId);
  }

  async findUserDriverByIds(ids: Types.ObjectId[], tenantId: Types.ObjectId): Promise<AdminDriverDto[]> {
    return this.driverService.findUserDriverByIds(ids, tenantId);
  }

  async findOneByUser(userId: Types.ObjectId, tenantId: Types.ObjectId): Promise<AdminDriverDto | null> {
    return this.driverService.findOneByUser(userId, tenantId);
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: AdminSearchDriversQuerySortFilter,
    filters: AdminSearchDriversQuerySortFilter[],
    tenantId: Types.ObjectId,
  ): Promise<AdminSearchDriversRes> {
    return this.driverService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
  }
}
