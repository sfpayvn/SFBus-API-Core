// admin-pos.controller.ts

import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Put,
  UseGuards,
  Get,
  Param,
  Delete,
  Query,
  UseInterceptors,
  Patch,
} from '@nestjs/common';
import { AdminUserPosService } from './admin-user-pos.service';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { CreateUserDto } from '@/module/core/user/user/dto/create-user.dto';
import { UpdateUserProfileDto, UpdatePasswordUserDto } from '@/module/core/user/user/dto/update-user.dto';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { Roles } from '@/decorators/roles.decorator';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { StripFields } from '@/interceptors/strip-fields.interceptor';
import { Feature } from '@/decorators/feature.decorator';
import { Types } from 'mongoose';
import {
  AdminRequestUpdateUserFieldDto,
  AdminSearchUserQuerySortFilter,
  AdminSearchUsersQuery,
} from '../admin-user-main/dto/admin-user.dto';
import { ACTIONQUOTA_KEYS, FUNCTION_KEYS, MODULE_KEYS } from '@/common/constants/module-function-keys';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';
import { AdminUpdateUserProfileDto } from '../admin-user-main/dto/admin-update-user.dto';
import { AdminCreateUserDto } from '../admin-user-main/dto/admin-create-user.dto';
import { QuotaGuard } from '@/guards/quota.guard';
import { QuotaHeadersInterceptor } from '@/interceptors/quota-headers.interceptor';

@Controller('admin/users/pos')
export class AdminUserPosController {
  constructor(private adminUserPosService: AdminUserPosService) {}

  @UseGuards(JwtAuthGuard, RolesGuard, QuotaGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @UseInterceptors(StripFields(['password']), QuotaHeadersInterceptor)
  @Post('register')
  @Feature(MODULE_KEYS.USER_POS, FUNCTION_KEYS.USER_POS.CREATE)
  async register(
    @Body(ParseObjectIdPipe) adminCreateUserDto: AdminCreateUserDto,
    @CurrentUser(ParseObjectIdPipe) cUser: UserTokenDto,
  ) {
    try {
      const { tenantId } = cUser;
      return await this.adminUserPosService.create(adminCreateUserDto, tenantId);
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
      const updatedUser = await this.adminUserPosService.update(adminUpdateUserProfileDto, tenantId);
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
    return this.adminUserPosService.setPasswordAsTemp(userId, newPassword, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, QuotaGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @UseInterceptors(QuotaHeadersInterceptor)
  @Feature(MODULE_KEYS.USER_POS, FUNCTION_KEYS.USER_POS.CREATE, ACTIONQUOTA_KEYS.RELEASED)
  @Delete(':id')
  delete(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    return this.adminUserPosService.delete(id);
  }

  @Post('/search')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(StripFields(['password']))
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  search(@Body(ParseObjectIdPipe) query: AdminSearchUsersQuery, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { pageIdx = 0, pageSize = 0, keyword = '', sortBy, filters } = query;
    const { tenantId } = user;
    return this.adminUserPosService.search(+pageIdx, +pageSize, keyword, sortBy, filters, tenantId);
  }
}
