// bus-Layout.controller.ts

import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { AdminBusScheduleLayoutService } from './admin-bus-schedule-layout.service';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { Types } from 'mongoose';
import { AdminCreateBusScheduleLayoutDto } from './dto/admin-create-bus-schedule-layout.dto';
import { AdminUpdateBusScheduleLayoutDto } from './dto/admin-update-bus-schedule-layout.dto';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('admin/bus-schedule-layouts')
export class AdminBusScheduleLayoutController {
  constructor(private readonly adminBusScheduleLayoutService: AdminBusScheduleLayoutService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Post()
  async create(
    @Body(ParseObjectIdPipe) adminCreateBusScheduleLayoutDto: AdminCreateBusScheduleLayoutDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.adminBusScheduleLayoutService.create(adminCreateBusScheduleLayoutDto, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(ParseObjectIdPipe) adminUpdateBusScheduleLayoutDto: AdminUpdateBusScheduleLayoutDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.adminBusScheduleLayoutService.update(adminUpdateBusScheduleLayoutDto, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    await this.adminBusScheduleLayoutService.remove(id, tenantId);
    return { message: 'BusLayout deleted successfully' };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Get()
  async findAll(@CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.adminBusScheduleLayoutService.findAll(tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Get('find-one/:id')
  async findOne(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.adminBusScheduleLayoutService.findOne(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Get('find-one-by-bus-schedule/:busScheduleId')
  async findOneByBusSchedule(
    @Param('busScheduleId', ParseObjectIdPipe) busScheduleId: Types.ObjectId,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.adminBusScheduleLayoutService.findOneByBusSchedule(busScheduleId, tenantId);
  }
}
