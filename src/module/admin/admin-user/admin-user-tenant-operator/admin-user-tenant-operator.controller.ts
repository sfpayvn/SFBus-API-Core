// admin-pos.controller.ts

import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Put,
  UseGuards,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { Roles } from '@/decorators/roles.decorator';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { StripFields } from '@/interceptors/strip-fields.interceptor';
import { Feature } from '@/decorators/feature.decorator';
import { Types } from 'mongoose';
import { AdminSearchUsersQuery } from '../admin-user-main/dto/admin-user.dto';
import { AdminUpdateUserProfileDto } from '../admin-user-main/dto/admin-update-user.dto';
import { AdminCreateUserDto } from '../admin-user-main/dto/admin-create-user.dto';
import { AdminUserTenantOperatorService } from './admin-user-tenant-operator.service';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';
import { ACTIONQUOTA_KEYS, MODULE_KEYS } from '@/common/constants/module-function-keys';
import { FUNCTION_KEYS } from '@/common/constants/module-function-keys';
import { QuotaGuard } from '@/guards/quota.guard';
import { QuotaHeadersInterceptor } from '@/interceptors/quota-headers.interceptor';

@Controller('admin/users/tenant-operator')
export class AdminUserTenantOperatorController {
  constructor(private adminUserTenantOperatorService: AdminUserTenantOperatorService) {}

  @UseGuards(JwtAuthGuard, RolesGuard, QuotaGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @UseInterceptors(StripFields(['password']), QuotaHeadersInterceptor)
  @Post('register')
  @Feature(MODULE_KEYS.USER_TENANT_OPERATOR, FUNCTION_KEYS.USER_TENANT_OPERATOR.CREATE)
  async register(
    @Body(ParseObjectIdPipe) adminCreateUserDto: AdminCreateUserDto,
    @CurrentUser(ParseObjectIdPipe) cUser: UserTokenDto,
  ) {
    try {
      const { tenantId } = cUser;
      return await this.adminUserTenantOperatorService.create(adminCreateUserDto, tenantId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Endpoint cập nhật thông tin người dùng
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @UseInterceptors(StripFields(['password']))
  @Put('profile')
  async updateProfile(
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
    @Body(ParseObjectIdPipe) adminUpdateUserProfileDto: AdminUpdateUserProfileDto,
  ) {
    try {
      const { tenantId } = user;
      const updatedUser = await this.adminUserTenantOperatorService.update(adminUpdateUserProfileDto, tenantId);
      return updatedUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(StripFields(['password']))
  @Put('set-password-temp/:userId')
  async setPasswordAsTemp(
    @Param('userId', ParseObjectIdPipe) userId: Types.ObjectId,
    @Body(ParseObjectIdPipe) body: any,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    const { newPassword } = body;
    return this.adminUserTenantOperatorService.setPasswordAsTemp(userId, newPassword, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, QuotaGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @UseInterceptors(QuotaHeadersInterceptor)
  @Feature(MODULE_KEYS.USER_TENANT_OPERATOR, FUNCTION_KEYS.USER_TENANT_OPERATOR.CREATE, ACTIONQUOTA_KEYS.RELEASED)
  @Delete(':id')
  delete(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    return this.adminUserTenantOperatorService.delete(id);
  }

  @Post('/search')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(StripFields(['password']))
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  search(@Body(ParseObjectIdPipe) query: AdminSearchUsersQuery, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { pageIdx = 0, pageSize = 0, keyword = '', sortBy, filters } = query;
    const { tenantId } = user;
    return this.adminUserTenantOperatorService.search(+pageIdx, +pageSize, keyword, sortBy, filters, tenantId);
  }
}
