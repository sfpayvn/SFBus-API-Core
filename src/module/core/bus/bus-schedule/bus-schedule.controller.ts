// src/bus-schedule/bus-schedule.controller.ts
import { Controller, Get, Post, Body, Param, Delete, UseGuards, Query, ValidationPipe, Put } from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { BusScheduleService } from './bus-schedule.service';
import { CreateBusScheduleDto } from './dto/create-bus-schedule.dto';
import { UpdateBusScheduleDto } from './dto/update-bus-schedule.dto';
import { Types } from 'mongoose';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import {
  SearchBusScheduleDriverQuery,
  SearchBusSchedulePagingQuery,
  SearchBusScheduleQuery,
} from './dto/bus-schedule.dto';
import { BusService } from '../bus/bus.service';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('bus-schedules')
export class BusScheduleController {
  constructor(
    private readonly busScheduleService: BusScheduleService,
    private readonly busService: BusService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Post()
  create(
    @Body(ParseObjectIdPipe) createBusScheduleDto: CreateBusScheduleDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.busScheduleService.create(createBusScheduleDto, tenantId, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Put('update')
  update(
    @Body(ParseObjectIdPipe) updateBusScheduleDto: UpdateBusScheduleDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.busScheduleService.update(updateBusScheduleDto, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Put('update-note/:busScheduleId')
  updateBusScheduleNote(
    @Body('note') note: string, // Extract the `note` field directly from the body
    @Param('busScheduleId', ParseObjectIdPipe) busScheduleId: Types.ObjectId,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.busScheduleService.updateBusScheduleNote(busScheduleId, note, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Put('update-current-station/:busScheduleId')
  updateCurrentStation(
    @Body('currentStationId', ParseObjectIdPipe) currentStationId: Types.ObjectId,
    @Param('busScheduleId', ParseObjectIdPipe) busScheduleId: Types.ObjectId,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.busScheduleService.updateCurrentStation(busScheduleId, currentStationId, tenantId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  delete(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.busScheduleService.delete(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Get('find-all')
  findAll(@CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.busScheduleService.findAll(tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Get('find-all-available')
  findAvailable(@CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.busScheduleService.findAllAvailable(tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: Types.ObjectId, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.busScheduleService.findOne(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Post('search')
  async searchBusSchedulePaging(
    @Body(ParseObjectIdPipe) query: SearchBusSchedulePagingQuery,
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
    return this.busScheduleService.searchBusSchedulePaging(+pageIdx, +pageSize, keyword, sortBy, filters, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Post('search-driver')
  async searchBusScheduleByDriver(
    @Body(ParseObjectIdPipe) query: SearchBusScheduleDriverQuery,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const {
      keyword = '',
      sortBy = {
        key: 'createdAt',
        value: 'desc',
      },
      filters = [],
    } = query;
    const { tenantId } = user;
    const driverId = user._id;
    return this.busScheduleService.searchBusScheduleByDriver(keyword, sortBy, filters, driverId, tenantId);
  }
}
