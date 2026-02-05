// bus-template.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  ValidationPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { Types } from 'mongoose';
import { ClientSearchBusLayoutTemplateQuery } from './dto/client-bus-layout-template.dto';
import { ClientBusLayoutTemplateService } from './client-bus-layout-template.service';
import { TenantScope, TenantScopeResult } from '@/common/tenant/tenant-scope';
import { MarkDefaultTenant } from '@/interceptors/mark-default-tenant';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('client/bus-layout-templates')
export class ClientBusLayoutTemplateController {
  constructor(private readonly ClientBusLayoutTemplateService: ClientBusLayoutTemplateService) {}

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
  @Get('/find-all')
  async findAll(@TenantScope() tenantScope: TenantScopeResult) {
    const { tenantIds } = tenantScope;
    return this.ClientBusLayoutTemplateService.findAll(tenantIds);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(MarkDefaultTenant())
  @Roles(
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.CLIENT,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.POS,
    ROLE_CONSTANTS.DRIVER,
  )
  @Get('find-one/:id')
  async findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @TenantScope() tenantScope: TenantScopeResult) {
    const { tenantIds } = tenantScope;
    return this.ClientBusLayoutTemplateService.findOne(id, tenantIds);
  }

  @Post('search')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(MarkDefaultTenant())
  @Roles(
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.CLIENT,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.POS,
    ROLE_CONSTANTS.DRIVER,
  )
  search(
    @Body(ParseObjectIdPipe) query: ClientSearchBusLayoutTemplateQuery,
    @TenantScope() tenantScope: TenantScopeResult,
  ) {
    const { tenantIds } = tenantScope;
    const {
      pageIdx = 0,
      pageSize = 0,
      keyword = '',
      sortBy = {
        key: 'createdAt',
        value: 'desc',
      },
      filters = [],
    } = query;
    return this.ClientBusLayoutTemplateService.search(+pageIdx, +pageSize, keyword, sortBy, filters, tenantIds);
  }
}
