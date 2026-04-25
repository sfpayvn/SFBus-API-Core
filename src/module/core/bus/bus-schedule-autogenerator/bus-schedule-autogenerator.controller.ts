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
} from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { BusScheduleAutogeneratorService } from './bus-schedule-autogenerator.service';
import { UpdateBusScheduleAutogeneratorDto } from './dto/update-bus-schedule-autogenerator.dto';
import { Types } from 'mongoose';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { CreateBusScheduleAutogeneratorDto } from './dto/create-bus-schedule-autogenerator.dto';
import { BusScheduleAutogeneratorDto, SearchBusScheduleAutogeneratorQuery } from './dto/bus-schedule-autogenerator.dto';
import { TimezoneOffset } from '@/decorators/timezone.decorator';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('bus-schedule-autogenerators')
export class BusScheduleAutogeneratorController {
  constructor(private readonly busScheduleAutogeneratorService: BusScheduleAutogeneratorService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Post()
  create(
    @Body(ParseObjectIdPipe) createBusScheduleAutogeneratorDto: CreateBusScheduleAutogeneratorDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
    @TimezoneOffset() timezoneOffset: number,
  ) {
    const { tenantId } = user;
    return this.busScheduleAutogeneratorService.create(createBusScheduleAutogeneratorDto, tenantId, timezoneOffset);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Get()
  findAll(@CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.busScheduleAutogeneratorService.findAll(tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: Types.ObjectId, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.busScheduleAutogeneratorService.findOne(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Put()
  update(
    @Body(ParseObjectIdPipe) updateBusScheduleAutogeneratorDto: UpdateBusScheduleAutogeneratorDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
    @TimezoneOffset() timezoneOffset: number,
  ) {
    const { tenantId } = user;
    return this.busScheduleAutogeneratorService.update(updateBusScheduleAutogeneratorDto, tenantId, timezoneOffset);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Post('run-create-bus-schedule/:id')
  runCreateBusSchedule(
    @Param('id', ParseObjectIdPipe) _id: Types.ObjectId,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.busScheduleAutogeneratorService.runCreateBusSchedule(_id, tenantId, tenantId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  delete(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.busScheduleAutogeneratorService.delete(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Get('search')
  async searchBusScheduleAutogenerator(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query: SearchBusScheduleAutogeneratorQuery,
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
    return this.busScheduleAutogeneratorService.searchBusScheduleAutogenerator(
      +pageIdx,
      +pageSize,
      keyword,
      sortBy,
      filters,
      tenantId,
    );
  }
}
