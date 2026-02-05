import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Put } from '@nestjs/common';
import { Types } from 'mongoose';
import { JwtAuthGuard } from '../../../guards/jwt-auth.guard';
import { RolesGuard } from '../../../guards/roles.guard';
import { Roles } from '../../../decorators/roles.decorator';
import { CreateSubscriptionDto } from '../../core/subscription/dto/create-subscription.dto';
import { UpdateSubscriptionDto } from '../../core/subscription/dto/update-subscription.dto';
import { AdminSubscriptionService } from './admin-subscription.service';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { AdminSearchSubscriptionQuery } from './dto/admin-subscription.dto';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('admin/subscription')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(ROLE_CONSTANTS.ADMIN)
export class AdminSubscriptionController {
  constructor(private readonly adminSubscriptionService: AdminSubscriptionService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Post()
  create(@Body(ParseObjectIdPipe) createSubscriptionDto: CreateSubscriptionDto) {
    return this.adminSubscriptionService.create(createSubscriptionDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Put()
  update(@Body(ParseObjectIdPipe) updateSubscriptionDto: UpdateSubscriptionDto) {
    return this.adminSubscriptionService.update(updateSubscriptionDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.adminSubscriptionService.delete(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.adminSubscriptionService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Get('find-all')
  findAll() {
    return this.adminSubscriptionService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Get('find-all-available')
  findAllAvailable() {
    return this.adminSubscriptionService.findAllAvailable();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Post('search')
  async search(@Body(ParseObjectIdPipe) query: AdminSearchSubscriptionQuery) {
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
    return this.adminSubscriptionService.search(+pageIdx, +pageSize, keyword, sortBy, filters);
  }
}
