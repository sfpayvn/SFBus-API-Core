import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Param,
  Query,
  Body,
  HttpCode,
  Headers,
  UseInterceptors,
} from '@nestjs/common';
import { LocalAuthGuard } from '@/guards/local-auth.guard.ts';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { ClientForgotPasswordDto, ClientResetPasswordDto } from './dto/client-auth.dto';
import { ClientAuthService } from './client-auth.service';
import { ClientVerifyAuthRescueDto } from '../client-auth-rescue/dto/client-auth-rescue.dto';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { RolesGuard } from '@/guards/roles.guard';
import { StripFields } from '@/interceptors/strip-fields.interceptor';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { ClientUpdatePasswordUserDto } from '../../client-user/client-user-main/dto/client-update-user.dto';

@Controller('client/auth')
export class AuthController {
  constructor(private clientAuthService: ClientAuthService) {}

  // Endpoint đăng nhập
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    // Sau khi LocalStrategy xác thực, req.user sẽ chứa thông tin người dùng
    return this.clientAuthService.login(req.user);
  }

  // Endpoint đăng ký
  @Post('signUp/:phoneNumber')
  async signUp(@Param('phoneNumber') phoneNumber: string, @Headers('x-tenant-code') tenantCode: string) {
    // Sau khi LocalStrategy xác thực, req.user sẽ chứa thông tin người dùng
    return this.clientAuthService.signUp(phoneNumber, tenantCode);
  }

  @Get('verify-phoneNumber')
  async verifyPhoneNumber(@Query('phoneNumber') phoneNumber: string, @Headers('x-tenant-code') tenantCode: string) {
    return this.clientAuthService.verifyPhoneNumber(phoneNumber, tenantCode);
  }

  // Endpoint kiểm tra token
  @UseGuards(JwtAuthGuard)
  @Get('validate-token')
  async validateToken(@Request() req) {
    // Nếu token hợp lệ, trả về thông tin người dùng
    return { valid: true, user: req.user };
  }

  @Post('verify-forgot-password-otp')
  @HttpCode(200)
  async verifyForgotPasswordOtp(
    @Body(ParseObjectIdPipe) clientVerifyAuthRescueDto: ClientVerifyAuthRescueDto,
    @Headers('x-tenant-code') tenantCode: string,
  ) {
    return this.clientAuthService.verifyForgotPasswordOtp(
      clientVerifyAuthRescueDto.identifier,
      tenantCode,
      clientVerifyAuthRescueDto.purpose,
      clientVerifyAuthRescueDto.token,
    );
  }

  @Post('forgot-password')
  @HttpCode(200)
  async forgotPassword(@Body(ParseObjectIdPipe) ClientForgotPasswordDto: ClientForgotPasswordDto) {
    return this.clientAuthService.forgotPassword(
      ClientForgotPasswordDto.phoneNumber,
      ClientForgotPasswordDto.redirectBaseUrl,
    );
  }

  @Post('reset-password')
  async reset(@Body(ParseObjectIdPipe) ClientResetPasswordDto: ClientResetPasswordDto) {
    return this.clientAuthService.resetPassword(ClientResetPasswordDto.token, ClientResetPasswordDto.newPassword);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(StripFields(['password']))
  @Post('update-password')
  async updatePassword(
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
    @Body(ParseObjectIdPipe) clientUpdatePasswordUserDto: ClientUpdatePasswordUserDto,
  ) {
    const { tenantId, _id } = user;
    const updatedUser = await this.clientAuthService.updatePassword(_id, clientUpdatePasswordUserDto, tenantId);
    return {
      message: 'Cập nhật thông tin thành công!',
      user: {
        email: updatedUser.email,
        name: updatedUser.name,
      },
    };
  }

  // Endpoint lấy thông tin ngư�i dùng hiện tại
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(StripFields(['password']))
  @Get('get-current-user')
  async getCurrentUser(@CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId, _id: userId } = user;
    return this.clientAuthService.getCurrentUser(userId, tenantId);
  }
}
