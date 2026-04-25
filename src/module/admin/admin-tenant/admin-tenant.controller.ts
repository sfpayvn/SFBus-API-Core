import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Put } from '@nestjs/common';
import { Types } from 'mongoose';
import { AdminTenantService } from './admin-tenant.service';
import { JwtAuthGuard } from '../../../guards/jwt-auth.guard';
import { RolesGuard } from '../../../guards/roles.guard';
import { Roles } from '../../../decorators/roles.decorator';
import { CreateTenantDto } from '../../core/tenant/dto/create-tenant.dto';
import { UpdateTenantDto } from '../../core/tenant/dto/update-tenant.dto';
import { AdminCreateTenantDto } from './dto/admin-create-tenant.dto';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { AdminSearchTenantQuery } from './dto/admin-tenant.dto';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('admin/tenant')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(ROLE_CONSTANTS.ADMIN)
export class AdminTenantController {
  constructor(private readonly adminTenantService: AdminTenantService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Post()
  create(@Body(ParseObjectIdPipe) adminCreateTenantDto: AdminCreateTenantDto) {
    return this.adminTenantService.create(adminCreateTenantDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Put()
  update(@Body(ParseObjectIdPipe) updateTenantDto: UpdateTenantDto) {
    return this.adminTenantService.update(updateTenantDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Get()
  findAll() {
    return this.adminTenantService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Post('search')
  search(@Body(ParseObjectIdPipe) query: AdminSearchTenantQuery) {
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
    return this.adminTenantService.search(+pageIdx, +pageSize, keyword, sortBy, filters);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.adminTenantService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.adminTenantService.delete(id);
  }
}
