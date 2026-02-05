import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Type,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { AdminCreateUserDto } from './dto/admin-create-user.dto';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { SearchUsersTypesQuery, UserDto } from '@/module/core/user/user/dto/user.dto';
import { plainToInstance } from 'class-transformer';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { StripFields } from '@/interceptors/strip-fields.interceptor';
import { AdminRequestUpdateUserFieldDto, AdminSearchUsersQuery } from './dto/admin-user.dto';
import { Feature } from '@/decorators/feature.decorator';
import { Roles } from '@/decorators/roles.decorator';
import { RolesGuard } from '@/guards/roles.guard';
import { AdminUpdateUserProfileDto } from './dto/admin-update-user.dto';
import { Types } from 'mongoose';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';
import { AdminUserMainService } from './admin-user-main.service';

@Controller('admin/users')
export class AdminUserMainController {
  constructor(private adminUserMainService: AdminUserMainService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @UseInterceptors(StripFields(['password']))
  @Post('register')
  async register(
    @Body(ParseObjectIdPipe) adminCreateUserDto: AdminCreateUserDto,
    @CurrentUser(ParseObjectIdPipe) cUser: UserTokenDto,
  ) {
    try {
      const { tenantId } = cUser;
      return await this.adminUserMainService.create(adminCreateUserDto, tenantId);
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
      const updatedUser = await this.adminUserMainService.update(adminUpdateUserProfileDto, tenantId);
      return updatedUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(StripFields(['password']))
  @Post('update-user-field')
  async updateUserField(
    @Body(ParseObjectIdPipe) adminRequestUpdateUserFieldDto: AdminRequestUpdateUserFieldDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId, _id } = user;
    const { fieldName, value } = adminRequestUpdateUserFieldDto;
    return this.adminUserMainService.updateUserField(_id, fieldName, value, tenantId);
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
    return this.adminUserMainService.setPasswordAsTemp(userId, newPassword, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Delete(':id')
  delete(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.adminUserMainService.delete(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @UseInterceptors(StripFields(['password']))
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.adminUserMainService.findOne(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @UseInterceptors(StripFields(['password']))
  @Get('role/:role')
  findOneByRole(@Param('role') role: string, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.adminUserMainService.findOneByRole(role, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @UseInterceptors(StripFields(['password']))
  @Get('find-all/:role')
  findAllByRole(@Param('role') role: string, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.adminUserMainService.findAllByRole(role, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @UseInterceptors(StripFields(['password']))
  @Get('find-all')
  findAll(@CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.adminUserMainService.findAll(tenantId);
  }

  @Post('/search')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(StripFields(['password']))
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  search(@Body(ParseObjectIdPipe) query: AdminSearchUsersQuery, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { pageIdx = 0, pageSize = 0, keyword = '', sortBy, filters } = query;
    const { tenantId } = user;
    return this.adminUserMainService.search(+pageIdx, +pageSize, keyword, sortBy, filters, tenantId);
  }
}
