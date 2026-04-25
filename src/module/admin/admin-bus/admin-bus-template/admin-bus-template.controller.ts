import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { AdminBusTemplateService } from './admin-bus-template.service';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { BusTemplateDto } from '@/module/core/bus/bus-template/dto/bus-template.dto';
import { Types } from 'mongoose';
import { AdminCreateBusTemplateDto } from './dto/admin-create-bus-template.dto';
import { AdminUpdateBusTemplateDto } from './dto/admin-update-bus-template.dto';
import { AdminSearchBusTemplateQuery } from './dto/admin-bus-template.dto';
import { TenantScope, TenantScopeResult } from '@/common/tenant/tenant-scope';
import { MarkDefaultTenant } from '@/interceptors/mark-default-tenant';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('admin/bus-templates')
export class AdminBusTemplateController {
  constructor(private readonly adminBusTemplateService: AdminBusTemplateService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Post()
  async create(
    @Body(ParseObjectIdPipe) adminCreateBusTemplateDto: AdminCreateBusTemplateDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return await this.adminBusTemplateService.create(adminCreateBusTemplateDto, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Put()
  update(
    @Body(ParseObjectIdPipe) adminUpdateBusTemplateDto: AdminUpdateBusTemplateDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.adminBusTemplateService.update(adminUpdateBusTemplateDto, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Delete(':id')
  delete(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.adminBusTemplateService.delete(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @UseInterceptors(MarkDefaultTenant())
  @Get('find-all')
  async findAll(@TenantScope() tenantScope: TenantScopeResult) {
    const { tenantIds } = tenantScope;
    return this.adminBusTemplateService.findAll(tenantIds);
  }

  @Post('/search')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @UseInterceptors(MarkDefaultTenant())
  search(@Body(ParseObjectIdPipe) query: AdminSearchBusTemplateQuery, @TenantScope() tenantScope: TenantScopeResult) {
    const { tenantIds } = tenantScope;
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
    return this.adminBusTemplateService.search(+pageIdx, +pageSize, keyword, sortBy, filters, tenantIds);
  }
}
