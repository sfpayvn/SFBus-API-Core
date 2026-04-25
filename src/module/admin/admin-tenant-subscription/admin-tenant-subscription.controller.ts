import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Roles } from '@/decorators/roles.decorator';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { Types } from 'mongoose';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import {
  AdminRegisterSubscriptionDto,
  AdminRegisterSubscriptionForTenantDto,
  AdminSearchTenantSubscriptionQuery,
} from './dto/admin-tenant-subscription.dto';
import { AdminTenantSubscriptionService } from './admin-tenant-subscription.service';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('admin/tenant-subscription')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminTenantSubscriptionController {
  constructor(private adminTenantSubscriptionService: AdminTenantSubscriptionService) {}

  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR) // hoặc 'owner' tuỳ mô hình
  @Post('register')
  register(
    @Body(ParseObjectIdPipe) adminRegisterSubscriptionDto: AdminRegisterSubscriptionDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const tenantId = new Types.ObjectId(user.tenantId);
    return this.adminTenantSubscriptionService.registerForTenant(tenantId, adminRegisterSubscriptionDto);
  }

  @Roles(ROLE_CONSTANTS.ADMIN) // hoặc 'owner' tuỳ mô hình
  @Post('register-for-tenant')
  registerForTenant(@Body(ParseObjectIdPipe) dto: AdminRegisterSubscriptionForTenantDto) {
    return this.adminTenantSubscriptionService.registerForTenant(dto.tenantId, dto);
  }

  @Post('search')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  search(@Body(ParseObjectIdPipe) query: AdminSearchTenantSubscriptionQuery) {
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
    return this.adminTenantSubscriptionService.search(+pageIdx, +pageSize, keyword, sortBy, filters);
  }

  @Post('search/my-subscription')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  searchMySubscriptions(
    @Body(ParseObjectIdPipe) query: AdminSearchTenantSubscriptionQuery,
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
    const tenantId = new Types.ObjectId(user.tenantId);
    filters.push({ key: 'tenantId', value: tenantId }); // Giá trị sẽ được gán trong service
    return this.adminTenantSubscriptionService.searchMySubscriptions(+pageIdx, +pageSize, keyword, sortBy, filters);
  }
}
