import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
  ValidationPipe,
  UseInterceptors,
} from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { ClientBusStationService } from './client-bus-station.service';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { Roles } from '@/decorators/roles.decorator';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { Types } from 'mongoose';
import { ClientSearchBusStationsQuery } from './dto/client-bus-station.dto';
import { TenantScope, TenantScopeResult } from '@/common/tenant/tenant-scope';
import { MarkDefaultTenant } from '@/interceptors/mark-default-tenant';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('client/bus-station')
export class ClientBusStationController {
  constructor(private readonly ClientBusStationService: ClientBusStationService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.CLIENT,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.POS,
    ROLE_CONSTANTS.DRIVER,
  )
  @UseInterceptors(MarkDefaultTenant())
  @Get('find-all')
  findAll(@TenantScope() tenantScope: TenantScopeResult) {
    const { tenantIds } = tenantScope;
    return this.ClientBusStationService.findAll(tenantIds);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
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
  findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @TenantScope() tenantScope: TenantScopeResult) {
    const { tenantIds } = tenantScope;
    return this.ClientBusStationService.findOne(id, tenantIds);
  }

  @Get('findOneByProvinceId/:provinceId')
  findOneByProvinceId(
    @Param('provinceId', ParseObjectIdPipe) provinceId: Types.ObjectId,
    @TenantScope() tenantScope: TenantScopeResult,
  ) {
    const { tenantIds } = tenantScope;
    return this.ClientBusStationService.findOneByProvinceId(provinceId, tenantIds);
  }

  @Post('search')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(MarkDefaultTenant())
  @Roles(
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.CLIENT,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.POS,
    ROLE_CONSTANTS.DRIVER,
  )
  search(@TenantScope() tenantScope: TenantScopeResult, @Body(ParseObjectIdPipe) query: ClientSearchBusStationsQuery) {
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
    return this.ClientBusStationService.search(+pageIdx, +pageSize, keyword, sortBy, filters, tenantIds);
  }
}
