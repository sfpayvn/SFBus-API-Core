// bus-Layout.controller.ts

import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { CreateBusScheduleLayoutDto } from './dto/create-bus-schedule-layout.dto';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { BusScheduleLayoutService } from './bus-schedule-layout.service';
import { UpdateBusScheduleLayoutDto } from './dto/update-bus-schedule-layout.dto';
import { Types } from 'mongoose';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('bus-schedule-layouts')
export class BusScheduleLayoutController {
  constructor(private readonly busScheduleLayoutService: BusScheduleLayoutService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Post()
  async create(
    @Body(ParseObjectIdPipe) createBusScheduleLayoutDto: CreateBusScheduleLayoutDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.busScheduleLayoutService.create(createBusScheduleLayoutDto, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(ParseObjectIdPipe) updateBusLayoutDto: UpdateBusScheduleLayoutDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.busScheduleLayoutService.update(updateBusLayoutDto, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    await this.busScheduleLayoutService.remove(id, tenantId);
    return { message: 'BusLayout deleted successfully' };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Get()
  async findAll(@CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.busScheduleLayoutService.findAll(tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Get('find-one/:id')
  async findOne(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.busScheduleLayoutService.findOne(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Get('find-one-by-bus-schedule/:busScheduleId')
  async findOneByBusSchedule(
    @Param('busScheduleId', ParseObjectIdPipe) busScheduleId: Types.ObjectId,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.busScheduleLayoutService.findOneByBusSchedule(busScheduleId, tenantId);
  }
}
