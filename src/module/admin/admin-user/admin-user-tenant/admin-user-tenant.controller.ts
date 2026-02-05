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
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';
import { AdminUpdateUserProfileDto } from '../admin-user-main/dto/admin-update-user.dto';
import { AdminCreateUserDto } from '../admin-user-main/dto/admin-create-user.dto';
import { QuotaHeadersInterceptor } from '@/interceptors/quota-headers.interceptor';
import { AdminUserTenantService } from './admin-user-tenant.service';

@Controller('admin/users/tenant')
export class AdminUserTenantController {
  constructor(private adminUserTenantService: AdminUserTenantService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @UseInterceptors(StripFields(['password']), QuotaHeadersInterceptor)
  @Post('register')
  async register(@Body(ParseObjectIdPipe) adminCreateUserDto: AdminCreateUserDto) {
    try {
      return await this.adminUserTenantService.create(adminCreateUserDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Endpoint cập nhật thông tin người dùng
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @UseInterceptors(StripFields(['password']))
  @Put('profile')
  async updateProfile(@Body(ParseObjectIdPipe) adminUpdateUserProfileDto: AdminUpdateUserProfileDto) {
    try {
      const updatedUser = await this.adminUserTenantService.update(adminUpdateUserProfileDto);
      return updatedUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @UseInterceptors(StripFields(['password']))
  @Put('set-password-temp/:userId')
  async setPasswordAsTemp(
    @Param('userId', ParseObjectIdPipe) userId: Types.ObjectId,
    @Body(ParseObjectIdPipe) body: any,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    const { newPassword } = body;
    return this.adminUserTenantService.setPasswordAsTemp(userId, newPassword);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @UseInterceptors(QuotaHeadersInterceptor)
  @Delete(':id')
  delete(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    return this.adminUserTenantService.delete(id);
  }

  @Post('/search')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(StripFields(['password']))
  @Roles(ROLE_CONSTANTS.ADMIN)
  search(@Body(ParseObjectIdPipe) query: AdminSearchUsersQuery, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { pageIdx = 0, pageSize = 0, keyword = '', sortBy, filters } = query;
    const { tenantId } = user;
    return this.adminUserTenantService.search(+pageIdx, +pageSize, keyword, sortBy, filters);
  }
}
