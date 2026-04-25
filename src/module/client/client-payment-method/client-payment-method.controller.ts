import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { Types } from 'mongoose';
import { Controller, UseGuards, Post, Body, Get, Param, Put, Delete, UseInterceptors } from '@nestjs/common';
import { ClientPaymentMethodService } from './client-payment-method-service';
import { TenantScope, TenantScopeResult } from '@/common/tenant/tenant-scope';
import { MarkDefaultTenant } from '@/interceptors/mark-default-tenant';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('client/payment-method')
export class ClientPaymentMethodController {
  constructor(private readonly clientPaymentMethodService: ClientPaymentMethodService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.CLIENT,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.POS,
    ROLE_CONSTANTS.DRIVER,
  )
  @UseInterceptors(MarkDefaultTenant())
  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @TenantScope() tenantScope: TenantScopeResult) {
    const { tenantIds } = tenantScope;
    return this.clientPaymentMethodService.findOne(id, tenantIds);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.CLIENT,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.POS,
    ROLE_CONSTANTS.DRIVER,
  )
  @UseInterceptors(MarkDefaultTenant())
  @Get()
  findAll(@TenantScope() tenantScope: TenantScopeResult) {
    const { tenantIds } = tenantScope;
    return this.clientPaymentMethodService.findAll(tenantIds);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.CLIENT,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.POS,
    ROLE_CONSTANTS.DRIVER,
  )
  @UseInterceptors(MarkDefaultTenant())
  @Get('default')
  async findDefault(@TenantScope() tenantScope: TenantScopeResult) {
    const { tenantIds } = tenantScope;
    return this.clientPaymentMethodService.findDefault(tenantIds);
  }
}
