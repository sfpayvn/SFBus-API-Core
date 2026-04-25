import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { TenantService } from '../../core/tenant/tenant.service';
import { CreateTenantDto } from '../../core/tenant/dto/create-tenant.dto';
import { UpdateTenantDto } from '../../core/tenant/dto/update-tenant.dto';
import { AdminCreateTenantDto } from './dto/admin-create-tenant.dto';
import { AdminSearchTenantQuerySortFilter } from './dto/admin-tenant.dto';

@Injectable()
export class AdminTenantService {
  constructor(@Inject(forwardRef(() => TenantService)) private readonly tenantService: TenantService) {}

  create(adminCreateTenantDto: AdminCreateTenantDto) {
    return this.tenantService.create(adminCreateTenantDto);
  }

  validateTenant(phoneNumber: string) {
    return this.tenantService.validateTenant(phoneNumber);
  }

  findAll() {
    return this.tenantService.findAll();
  }

  findOne(id: Types.ObjectId) {
    return this.tenantService.findOne(id);
  }

  findByPhoneNumber(phoneNumber: string) {
    return this.tenantService.findByPhoneNumber(phoneNumber);
  }

  update(updateTenantDto: UpdateTenantDto) {
    return this.tenantService.update(updateTenantDto);
  }

  delete(id: Types.ObjectId) {
    return this.tenantService.delete(id);
  }

  search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: AdminSearchTenantQuerySortFilter,
    filters: AdminSearchTenantQuerySortFilter[],
  ) {
    return this.tenantService.search(pageIdx, pageSize, keyword, sortBy, filters);
  }
}
