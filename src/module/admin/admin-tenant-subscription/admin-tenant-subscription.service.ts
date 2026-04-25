import { Injectable, BadRequestException, NotFoundException, forwardRef, Inject } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Types, ClientSession, Connection } from 'mongoose';
import {
  AdminRegisterSubscriptionDto,
  AdminSearchTenantSubscriptionQuerySortFilter,
  AdminSearchTenantSubscriptionRes,
  AdminTenantSubscriptionDto,
} from './dto/admin-tenant-subscription.dto';
import { plainToInstance } from 'class-transformer';
import { TenantSubscriptionService } from '@/module/core/tenant-subscription/tenant-subscription.service';

@Injectable()
export class AdminTenantSubscriptionService {
  constructor(
    @Inject(forwardRef(() => TenantSubscriptionService))
    private readonly tenantSubscriptionService: TenantSubscriptionService,
  ) {}

  async registerForTenant(
    tenantId: Types.ObjectId,
    dto: AdminRegisterSubscriptionDto,
  ): Promise<AdminTenantSubscriptionDto> {
    return this.tenantSubscriptionService.registerForTenant(tenantId, dto);
  }

  async findByTenantId(tenantId: Types.ObjectId): Promise<AdminTenantSubscriptionDto | null> {
    return this.tenantSubscriptionService.findByTenantId(tenantId);
  }

  async findAllByTenantId(tenantId: Types.ObjectId): Promise<AdminTenantSubscriptionDto[]> {
    return this.tenantSubscriptionService.findAllByTenantId(tenantId);
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: AdminSearchTenantSubscriptionQuerySortFilter,
    filters: AdminSearchTenantSubscriptionQuerySortFilter[],
  ): Promise<AdminSearchTenantSubscriptionRes> {
    return this.tenantSubscriptionService.search(pageIdx, pageSize, keyword, sortBy, filters);
  }

  async searchMySubscriptions(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: AdminSearchTenantSubscriptionQuerySortFilter,
    filters: AdminSearchTenantSubscriptionQuerySortFilter[],
  ): Promise<AdminSearchTenantSubscriptionRes> {
    return this.tenantSubscriptionService.search(pageIdx, pageSize, keyword, sortBy, filters);
  }
}
