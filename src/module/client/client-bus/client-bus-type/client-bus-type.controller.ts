import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { ClientBusTypeService } from './client-bus-type.service';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { Types } from 'mongoose';
import { ClientSearchBusTypesQuery } from './dto/client-bus-type.dto';
import { TenantScope, TenantScopeResult } from '@/common/tenant/tenant-scope';
import { MarkDefaultTenant } from '@/interceptors/mark-default-tenant';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';
import { TenantByCodeInterceptor } from '@/interceptors/tenant-by-code.interceptor';
import { TenantIdsByCode } from '@/decorators/tenant-by-code.decorator';

@Controller('client/bus-type')
@UseInterceptors(TenantByCodeInterceptor)
export class ClientBusTypeController {
  constructor(private readonly ClientBusTypeService: ClientBusTypeService) {}

  @Roles(
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.CLIENT,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.POS,
    ROLE_CONSTANTS.DRIVER,
  )
  @UseInterceptors(MarkDefaultTenant())
  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @TenantIdsByCode() tenantIds: Types.ObjectId[]) {
    return this.ClientBusTypeService.findOne(id, tenantIds);
  }

  @Roles(
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.CLIENT,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.POS,
    ROLE_CONSTANTS.DRIVER,
  )
  @Get('find-all')
  findAll(@TenantIdsByCode() tenantIds: Types.ObjectId[]) {
    return this.ClientBusTypeService.findAll(tenantIds);
  }

  @Post('search')
  @UseInterceptors(MarkDefaultTenant())
  @Roles(
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.CLIENT,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.POS,
    ROLE_CONSTANTS.DRIVER,
  )
  search(@Body(ParseObjectIdPipe) query: ClientSearchBusTypesQuery, @TenantIdsByCode() tenantIds: Types.ObjectId[]) {
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
    return this.ClientBusTypeService.search(+pageIdx, +pageSize, keyword, sortBy, filters, tenantIds);
  }
}
