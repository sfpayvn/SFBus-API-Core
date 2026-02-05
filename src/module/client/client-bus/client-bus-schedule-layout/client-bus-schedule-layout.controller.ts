// bus-Layout.controller.ts

import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, UseInterceptors } from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { ClientBusScheduleLayoutService } from './client-bus-schedule-layout.service';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { Types } from 'mongoose';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';
import { TenantByCodeInterceptor } from '@/interceptors/tenant-by-code.interceptor';
import { TenantIdByCode } from '@/decorators/tenant-by-code.decorator';

@Controller('client/bus-schedule-layouts')
@UseInterceptors(TenantByCodeInterceptor)
export class ClientBusScheduleLayoutController {
  constructor(private readonly ClientBusScheduleLayoutService: ClientBusScheduleLayoutService) {}

  @Get()
  async findAll(@TenantIdByCode() tenantId: Types.ObjectId) {
    return this.ClientBusScheduleLayoutService.findAll(tenantId);
  }

  @Get('find-one/:id')
  async findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @TenantIdByCode() tenantId: Types.ObjectId) {
    return this.ClientBusScheduleLayoutService.findOne(id, tenantId);
  }

  @Get('find-one-by-bus-schedule/:busScheduleId')
  async findOneByBusSchedule(
    @Param('busScheduleId', ParseObjectIdPipe) busScheduleId: Types.ObjectId,
    @TenantIdByCode() tenantId: Types.ObjectId,
  ) {
    return this.ClientBusScheduleLayoutService.findOneByBusSchedule(busScheduleId, tenantId);
  }
}
