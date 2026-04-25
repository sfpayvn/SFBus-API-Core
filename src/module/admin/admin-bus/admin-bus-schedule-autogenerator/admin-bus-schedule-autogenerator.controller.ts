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
import { AdminBusScheduleAutogeneratorService } from './admin-bus-schedule-autogenerator.service';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { Roles } from '@/decorators/roles.decorator';
import { AdminCreateBusScheduleAutogeneratorDto } from './dto/admin-create-bus-schedule-autogenerator.dto';
import { AdminUpdateBusScheduleAutogeneratorDto } from './dto/admin-update-bus-schedule-autogenerator.dto';
import { Types } from 'mongoose';
import { AdminSearchBusScheduleAutogeneratorQuery } from './dto/admin-bus-schedule-autogenerator.dto';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { TenantScope, TenantScopeResult } from '@/common/tenant/tenant-scope';
import { MarkDefaultTenant } from '@/interceptors/mark-default-tenant';
import { TimezoneOffset } from '@/decorators/timezone.decorator';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('admin/bus-schedule-autogenerators')
export class AdminBusScheduleAutogeneratorController {
  constructor(private readonly adminBusScheduleAutogeneratorService: AdminBusScheduleAutogeneratorService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Post()
  create(
    @Body(ParseObjectIdPipe) adminCreateBusScheduleAutogeneratorDto: AdminCreateBusScheduleAutogeneratorDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
    @TimezoneOffset() timezoneOffset: number,
  ) {
    const { tenantId } = user;
    return this.adminBusScheduleAutogeneratorService.create(
      adminCreateBusScheduleAutogeneratorDto,
      tenantId,
      timezoneOffset,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Put()
  update(
    @Body(ParseObjectIdPipe) adminUpdateBusScheduleAutogeneratorDto: AdminUpdateBusScheduleAutogeneratorDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
    @TimezoneOffset() timezoneOffset: number,
  ) {
    const { tenantId } = user;
    return this.adminBusScheduleAutogeneratorService.update(
      adminUpdateBusScheduleAutogeneratorDto,
      tenantId,
      timezoneOffset,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  delete(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.adminBusScheduleAutogeneratorService.delete(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Get()
  findAll(@CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.adminBusScheduleAutogeneratorService.findAll(tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @UseInterceptors(MarkDefaultTenant())
  @Post('run-create-bus-schedule/:id')
  runCreateBusSchedule(
    @Param('id', ParseObjectIdPipe) _id: Types.ObjectId,
    @TenantScope() tenantScope: TenantScopeResult,
  ) {
    const { rootTenantId, tenantId } = tenantScope;
    return this.adminBusScheduleAutogeneratorService.runCreateBusSchedule(_id, rootTenantId, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Post('search')
  async searchBusScheduleAutogenerator(
    @Body(ParseObjectIdPipe) query: AdminSearchBusScheduleAutogeneratorQuery,
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
    return this.adminBusScheduleAutogeneratorService.searchBusScheduleAutogenerator(
      +pageIdx,
      +pageSize,
      keyword,
      sortBy,
      filters,
      tenantId,
    );
  }
}
