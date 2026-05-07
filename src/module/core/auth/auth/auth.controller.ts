import { Controller, Request, Post, UseGuards, Get, Req, Param, Query, HttpCode, Body } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '@/guards/local-auth.guard.ts';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { ForgotPasswordDto, ResetPasswordDto } from './dto/auth.dto';
import { RolesGuard } from '@/guards/roles.guard';
import { Roles } from '@/decorators/roles.decorator';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';
import { Types } from 'mongoose';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Endpoint đăng nhập
  @Throttle({ default: { limit: 5, ttl: 900000 } }) // 5 attempts per 15 minutes
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    // Sau khi LocalStrategy xác thực, req.user sẽ chứa thông tin người dùng
    return this.authService.login(req.user);
  }

  @Get('verify-phoneNumber')
  async verifyPhoneNumber(@Query('phoneNumber') phoneNumber: string) {
    const name = await this.authService.verifyPhoneNumber(phoneNumber);
    return JSON.stringify(name);
  }

  // Endpoint kiểm tra token
  @UseGuards(JwtAuthGuard)
  @Get('validate-token')
  async validateToken(@Request() req) {
    // Nếu token hợp lệ, trả về thông tin người dùng
    return { valid: true, user: req.user };
  }

  @Throttle({ default: { limit: 3, ttl: 3600000 } }) // 3 attempts per hour
  @Post('forgot-password')
  @HttpCode(200)
  async forgotPassword(@Body(ParseObjectIdPipe) forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(
      forgotPasswordDto.email,
      forgotPasswordDto.tenantCode,
      forgotPasswordDto.redirectBaseUrl,
    );
  }

  @Post('reset-password')
  async reset(@Body(ParseObjectIdPipe) resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto.token, resetPasswordDto.newPassword);
  }

  // Logout - tăng tokenVersion để vô hiệu hóa tất cả token hiện tại
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(200)
  async logout(@CurrentUser() user: UserTokenDto) {
    return this.authService.logout(new Types.ObjectId(user._id), user.tenantId);
  }

  // Admin force logout - tăng tokenVersion của user bất kỳ
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT)
  @Post('force-logout/:userId')
  @HttpCode(200)
  async forceLogout(@Param('userId', ParseObjectIdPipe) userId: Types.ObjectId, @CurrentUser() user: UserTokenDto) {
    return this.authService.forceLogoutUser(userId, user.tenantId);
  }
}
