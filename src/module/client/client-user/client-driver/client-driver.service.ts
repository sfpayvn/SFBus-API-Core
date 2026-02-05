// driver.service.ts

import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ClientDriverDto, ClientSearchDriversQuerySortFilter, ClientSearchDriversRes } from './dto/client-driver.dto';
import { DriverService } from '@/module/core/user/driver/driver.service';
import { DriverDocument } from '@/module/core/user/driver/schema/driver.schema';

@Injectable()
export class ClientDriverService {
  constructor(
    @InjectModel(DriverDocument.name) private driverModel: Model<DriverDocument>,
    @Inject(forwardRef(() => DriverService))
    private readonly driverService: DriverService,
  ) {}

  async findAllUserDriver(tenantId: Types.ObjectId): Promise<ClientDriverDto[]> {
    return this.driverService.findAllUserDriver(tenantId);
  }

  async findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<ClientDriverDto> {
    return this.driverService.findOne(id, tenantId);
  }

  async findUserDriverByIds(ids: Types.ObjectId[], tenantId: Types.ObjectId): Promise<ClientDriverDto[]> {
    return this.driverService.findUserDriverByIds(ids, tenantId);
  }

  async findOneByUser(userId: Types.ObjectId, tenantId: Types.ObjectId): Promise<ClientDriverDto | null> {
    return this.driverService.findOneByUser(userId, tenantId);
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: ClientSearchDriversQuerySortFilter,
    filters: ClientSearchDriversQuerySortFilter[],
    tenantId: Types.ObjectId,
  ): Promise<ClientSearchDriversRes> {
    return this.driverService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
  }
}
