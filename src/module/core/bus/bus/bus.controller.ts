import { Controller, Get, Post, Delete, Body, UseGuards, Param, Put, Query, ValidationPipe } from '@nestjs/common';
import { Types } from 'mongoose';

import { BusService } from './bus.service';
import { CreateBusDto } from './dto/create-bus.dto';
import { BusDto, SearchBusQuery } from './dto/bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';

import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';

import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('buses')
export class BusController {
  constructor(private readonly busService: BusService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Post()
  async create(
    @Body(ParseObjectIdPipe) createBusDto: CreateBusDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return await this.busService.create(createBusDto, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Put()
  update(@Body(ParseObjectIdPipe) updateBusDto: UpdateBusDto, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.busService.update(updateBusDto, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Delete(':id')
  delete(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.busService.delete(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Get('find-all')
  async findAll(@CurrentUser(ParseObjectIdPipe) user: UserTokenDto): Promise<BusDto[]> {
    const { tenantId } = user;
    return this.busService.findAll(tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Get(':id')
  async findOne(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.busService.findOne(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Get('find-by-bus-template/:busTemplateId')
  async findByBusTemplate(
    @Param('busTemplateId', ParseObjectIdPipe) busTemplateId: Types.ObjectId,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.busService.findByBusTemplate(busTemplateId, tenantId, tenantId);
  }

  @Post('search')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  search(@Body(ParseObjectIdPipe) query: SearchBusQuery, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    const {
      pageIdx = 0,
      pageSize = 0,
      keyword = '',
      sortBy = { key: 'createdAt', value: 'desc' as const },
      filters = [],
    } = query;
    return this.busService.search(+pageIdx, +pageSize, keyword, sortBy, filters, tenantId);
  }
}
