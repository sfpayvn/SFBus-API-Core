import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, UseInterceptors } from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { RolesGuard } from '@/guards/roles.guard';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { Roles } from '@/decorators/roles.decorator';

import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { AdminPromotionService } from './admin-promotion-service';
import { Feature } from '@/decorators/feature.decorator';
import { QuotaGuard } from '@/guards/quota.guard';
import { AdminCreatePromotionDto } from './dto/admin-create-promotion.dto';
import {
  AdminRedeemPromotionDto,
  AdminRequestPromotionByRule,
  AdminRequestPromotionMass,
  AdminSearchPromotionPagingQuery,
} from './dto/admin-promotion.dto';
import { AdminUpdatePromotionDto } from './dto/admin-update-promotion.dto';
import { QuotaHeadersInterceptor } from '@/interceptors/quota-headers.interceptor';
import { TenantScope, TenantScopeResult } from '@/common/tenant/tenant-scope';
import { MarkDefaultTenant } from '@/interceptors/mark-default-tenant';
import { FUNCTION_KEYS, MODULE_KEYS } from '@/common/constants/module-function-keys';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('admin/promotion')
export class AdminPromotionController {
  constructor(private readonly adminPromotionService: AdminPromotionService) {}

  @UseGuards(JwtAuthGuard, RolesGuard, QuotaGuard)
  @UseInterceptors(QuotaHeadersInterceptor) // ✅ đúng decorator
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Feature(MODULE_KEYS.PROMOTION_MANAGEMENT, FUNCTION_KEYS.PROMOTION_MANAGEMENT.CREATE)
  @Post()
  create(
    @Body(ParseObjectIdPipe) adminCreatePromotionDto: AdminCreatePromotionDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.adminPromotionService.create(adminCreatePromotionDto, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Put()
  update(
    @Body(ParseObjectIdPipe) adminUpdatePromotionDto: AdminUpdatePromotionDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.adminPromotionService.update(adminUpdatePromotionDto, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Put('updates')
  updates(
    @Body(ParseObjectIdPipe) adminUpdatePromotionDto: AdminUpdatePromotionDto[],
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.adminPromotionService.updates(adminUpdatePromotionDto, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.adminPromotionService.remove(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Post('redeem')
  redeem(
    @Body(ParseObjectIdPipe) adminRedeemPromotionDto: AdminRedeemPromotionDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.adminPromotionService.redeem(adminRedeemPromotionDto, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @UseInterceptors(MarkDefaultTenant())
  @Get()
  findAll(@TenantScope() tenantScope: TenantScopeResult) {
    const { tenantIds } = tenantScope;
    return this.adminPromotionService.findAll(tenantIds);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.adminPromotionService.findOne(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Post('find-all-by-rule')
  findAllByRule(
    @Body(ParseObjectIdPipe) query: AdminRequestPromotionByRule,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { userId, bookingIds } = query;
    const { tenantId } = user;
    return this.adminPromotionService.findAllByRule(userId, bookingIds, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Post('find-mass-promotion')
  findMassPromotion(
    @Body(ParseObjectIdPipe) query: AdminRequestPromotionMass,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.adminPromotionService.findMassPromotion(tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @UseInterceptors(MarkDefaultTenant())
  @Post('search')
  async searchPromotionPaging(
    @Body(ParseObjectIdPipe) query: AdminSearchPromotionPagingQuery,
    @TenantScope() tenantScope: TenantScopeResult,
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
    const { tenantIds } = tenantScope;
    return this.adminPromotionService.searchPromotionPaging(+pageIdx, +pageSize, keyword, sortBy, filters, tenantIds);
  }
}
