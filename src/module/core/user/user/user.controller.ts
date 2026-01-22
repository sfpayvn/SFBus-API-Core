// user.controller.ts

import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Put,
  UseGuards,
  Request,
  Get,
  Req,
  Query,
  Param,
  ValidationPipe,
  UseInterceptors,
} from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { SearchUsersTypesQuery, UserDto } from './dto/user.dto';
import { plainToInstance } from 'class-transformer';
import { Roles } from '@/decorators/roles.decorator';
import { RolesGuard } from '@/guards/roles.guard';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { StripFields } from '@/interceptors/strip-fields.interceptor';
import { Feature } from '@/decorators/feature.decorator';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseInterceptors(StripFields(['password']))
  @Post('register')
  async register(@Body(ParseObjectIdPipe) createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      return {
        message: 'Đăng ký thành công!',
        user: { phoneNumber: user.phoneNumber, _id: user._id },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(StripFields(['password']))
  @Post('update-password')
  async updatePassword(
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
    @Body(ParseObjectIdPipe) updatePasswordUserDto: UpdatePasswordUserDto,
  ) {
    const { tenantId, _id } = user;
    const updatedUser = await this.userService.updatePassword(_id, updatePasswordUserDto, tenantId);
    return {
      message: 'Cập nhật thông tin thành công!',
      user: {
        email: updatedUser.email,
        name: updatedUser.name,
      },
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @UseInterceptors(StripFields(['password']))
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.userService.findOne(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @UseInterceptors(StripFields(['password']))
  @Get('role/:role')
  findOneByRole(@Param('role') role: string, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.userService.findOneByRole(role, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @UseInterceptors(StripFields(['password']))
  @Get('find-all/:role')
  findAllByRole(@Param('role') role: string, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.userService.findAllByRole(role, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @UseInterceptors(StripFields(['password']))
  @Get('find-all')
  findAll(@CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.userService.findAll(tenantId);
  }

  // Endpoint láº¥y thÃ´ng tin ngÆ°á»i dÃ¹ng hiá»‡n táº¡i
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(StripFields(['password']))
  @Get('get-current-user')
  async getCurrentUser(@CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId, _id: userId } = user;
    const foundUser = await this.userService.findById(userId, tenantId);
    if (!foundUser) {
      throw new BadRequestException('User not found.');
    }
    return plainToInstance(UserDto, foundUser);
  }

  @Post('/search')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(StripFields(['password']))
  @Roles(ROLE_CONSTANTS.ADMIN)
  search(@Body(ParseObjectIdPipe) query: SearchUsersTypesQuery, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { pageIdx = 0, pageSize = 0, keyword = '', sortBy, filters } = query;
    const { tenantId } = user;
    return this.userService.search(+pageIdx, +pageSize, keyword, sortBy, filters, tenantId);
  }
}
