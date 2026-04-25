// bus-template.controller.ts

import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, ValidationPipe, Query } from '@nestjs/common';
import { BusLayoutTemplateService } from './bus-layout-template.service';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { Types } from 'mongoose';
import { SearchBusLayoutTemplateQuery } from './dto/bus-layout-template.dto';
import { CreateBusLayoutTemplateDto } from './dto/create-bus-layout-template.dto';
import { UpdateBusLayoutTemplateDto } from './dto/update-bus-layout-template.dto';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('bus-layout-templates')
export class BusLayoutTemplateController {
  constructor(private readonly busLayoutTemplateService: BusLayoutTemplateService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Post()
  async create(
    @Body(ParseObjectIdPipe) createBusLayoutTemplateDto: CreateBusLayoutTemplateDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.busLayoutTemplateService.create(createBusLayoutTemplateDto, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Put()
  update(
    @Body(ParseObjectIdPipe) updateBusLayoutTemplateDto: UpdateBusLayoutTemplateDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.busLayoutTemplateService.update(updateBusLayoutTemplateDto, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Delete(':id')
  delete(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.busLayoutTemplateService.delete(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Get('/find-all')
  async findAll(@CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.busLayoutTemplateService.findAll([tenantId]);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Get('find-one/:id')
  async findOne(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.busLayoutTemplateService.findOne(id, [tenantId]);
  }

  @Post('search')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  search(
    @Body(ParseObjectIdPipe) query: SearchBusLayoutTemplateQuery,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
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
    return this.busLayoutTemplateService.search(+pageIdx, +pageSize, keyword, sortBy, filters, [tenantId]);
  }
}
