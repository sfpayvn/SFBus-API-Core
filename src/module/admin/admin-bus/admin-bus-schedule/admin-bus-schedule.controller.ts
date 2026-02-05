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
import { AdminBusScheduleService } from './admin-bus-schedule.service';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { SearchBusSchedulePagingQuery } from '@/module/core/bus/bus-schedule/dto/bus-schedule.dto';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { AdminSearchBusSchedulePagingQuery } from './dto/admin-bus-schedule.dto';
import { AdminUpdateBusScheduleDto } from './dto/admin-update-bus-schedule.dto';
import { AdminCreateBusScheduleDto } from './dto/admin-create-bus-schedule.dto';
import { Types } from 'mongoose';
import { TenantScope, TenantScopeResult } from '@/common/tenant/tenant-scope';
import { MarkDefaultTenant } from '@/interceptors/mark-default-tenant';
import { Feature } from '@/decorators/feature.decorator';
import { QuotaHeadersInterceptor } from '@/interceptors/quota-headers.interceptor';
import { QuotaGuard } from '@/guards/quota.guard';
import { MODULE_KEYS, FUNCTION_KEYS } from '@/common/constants/module-function-keys';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('admin/bus-schedules')
export class AdminBusScheduleController {
  constructor(private readonly adminBusScheduleService: AdminBusScheduleService) {}

  @UseGuards(JwtAuthGuard, RolesGuard, QuotaGuard)
  @Feature(MODULE_KEYS.BUS_SCHEDULE, FUNCTION_KEYS.BUS_SCHEDULE.CREATE)
  @UseInterceptors(MarkDefaultTenant(), QuotaHeadersInterceptor)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Post()
  create(
    @Body(ParseObjectIdPipe) adminCreateBusScheduleDto: AdminCreateBusScheduleDto,
    @TenantScope() tenantScope: TenantScopeResult,
  ) {
    const { rootTenantId, tenantId } = tenantScope;
    return this.adminBusScheduleService.create(adminCreateBusScheduleDto, rootTenantId, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Get('find-all')
  findAll(@CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.adminBusScheduleService.findAll(tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.adminBusScheduleService.findOne(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Put('update')
  update(
    @Body(ParseObjectIdPipe) adminUpdateBusScheduleDto: AdminUpdateBusScheduleDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.adminBusScheduleService.update(adminUpdateBusScheduleDto, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Put('update-current-station/:busScheduleId')
  updateCurrentStation(
    @Body('currentStationId', ParseObjectIdPipe) currentStationId: Types.ObjectId,
    @Param('busScheduleId', ParseObjectIdPipe) busScheduleId: Types.ObjectId,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.adminBusScheduleService.updateCurrentStation(busScheduleId, currentStationId, tenantId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  delete(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.adminBusScheduleService.delete(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Post('search')
  async searchBusSchedulePaging(
    @Body(ParseObjectIdPipe) query: AdminSearchBusSchedulePagingQuery,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
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
    const { tenantId } = user;
    return this.adminBusScheduleService.searchBusSchedulePaging(
      +pageIdx,
      +pageSize,
      keyword,
      sortBy,
      filters,
      tenantId,
    );
  }
}
