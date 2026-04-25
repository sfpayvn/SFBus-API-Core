// src/bus-schedule/bus-schedule.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ValidationPipe,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { AdminBusScheduleTemplateService } from './admin-bus-schedule-template.service';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { Types } from 'mongoose';
import { AdminSearchBusScheduleTemplateQuery } from './dto/admin-admin-bus-schedule-template.dto';
import { AdminCreateBusScheduleTemplateDto } from './dto/admin-create-bus-schedule-template.dto';
import { AdminUpdateBusScheduleTemplateDto } from './dto/admin-update-bus-schedule-template.dto';
import { TenantScope, TenantScopeResult } from '@/common/tenant/tenant-scope';
import { MarkDefaultTenant } from '@/interceptors/mark-default-tenant';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('admin/bus-schedule-templates')
export class AdminBusScheduleTemplateController {
  constructor(private readonly adminBusScheduleTemplateService: AdminBusScheduleTemplateService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Post()
  create(
    @Body(ParseObjectIdPipe) adminCreateBusScheduleTemplateDto: AdminCreateBusScheduleTemplateDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const tenantId = user.tenantId;
    return this.adminBusScheduleTemplateService.create(adminCreateBusScheduleTemplateDto, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Put()
  update(
    @Body(ParseObjectIdPipe) adminUpdateBusScheduleTemplateDto: AdminUpdateBusScheduleTemplateDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const tenantId = user.tenantId;
    return this.adminBusScheduleTemplateService.update(adminUpdateBusScheduleTemplateDto, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Delete(':id')
  delete(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const tenantId = user.tenantId;
    return this.adminBusScheduleTemplateService.delete(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @UseInterceptors(MarkDefaultTenant())
  @Get('find-all')
  findAll(@TenantScope() tenantScope: TenantScopeResult) {
    const { tenantIds } = tenantScope;
    return this.adminBusScheduleTemplateService.findAll(tenantIds);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @UseInterceptors(MarkDefaultTenant())
  @Get(':id')
  findOne(@Param('id') id: Types.ObjectId, @TenantScope() tenantScope: TenantScopeResult) {
    const { tenantIds } = tenantScope;
    return this.adminBusScheduleTemplateService.findOne(id, tenantIds);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @UseInterceptors(MarkDefaultTenant())
  @Post('search')
  async search(
    @Body(ParseObjectIdPipe) query: AdminSearchBusScheduleTemplateQuery,
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
    return this.adminBusScheduleTemplateService.search(+pageIdx, +pageSize, keyword, sortBy, filters, tenantIds);
  }
}
