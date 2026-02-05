import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Req,
  Param,
  Query,
  Body,
  HttpCode,
  UseInterceptors,
} from '@nestjs/common';
import { LocalAuthGuard } from '@/guards/local-auth.guard.ts';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { AdminForgotPasswordDto, AdminResetPasswordDto, AdminSignUpDto } from './dto/admin-auth.dto';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { AdminAuthService } from './admin-auth.service';
import { RolesGuard } from '@/guards/roles.guard';
import { StripFields } from '@/interceptors/strip-fields.interceptor';
import { AdminUpdatePasswordUserDto } from '../../admin-user/admin-user-main/dto/admin-update-user.dto';
import { TimezoneOffset } from '@/decorators/timezone.decorator';

@Controller('admin/auth')
export class AuthController {
  constructor(private adminAuthService: AdminAuthService) {}

  // Endpoint đăng nhập
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @TimezoneOffset() timezoneOffset: number) {
    // Sau khi LocalStrategy xác thực, req.user sẽ chứa thông tin người dùng
    // Run auto schedule jobs in background without blocking login
    this.adminAuthService.tryAutoScheduleJobs(req.user, timezoneOffset).catch(() => {
      // Silent fail - already handled in service
    });
    return this.adminAuthService.login(req.user);
  }

  // Endpoint đăng nhập
  @Post('signUp')
  async signUp(@Body(ParseObjectIdPipe) adminSignUpDto: AdminSignUpDto) {
    // Sau khi LocalStrategy xác thực, req.user sẽ chứa thông tin người dùng
    return this.adminAuthService.signUp(adminSignUpDto);
  }

  @Get('verify-phoneNumber')
  async verifyPhoneNumber(@Query('phoneNumber') phoneNumber: string) {
    const name = await this.adminAuthService.verifyPhoneNumber(phoneNumber);
    return JSON.stringify(name);
  }

  // Endpoint kiểm tra token
  @UseGuards(JwtAuthGuard)
  @Get('validate-token')
  async validateToken(@Request() req) {
    // Nếu token hợp lệ, trả về thông tin người dùng
    return { valid: true, user: req.user };
  }

  @Post('forgot-password')
  @HttpCode(200)
  async forgotPassword(@Body(ParseObjectIdPipe) adminForgotPasswordDto: AdminForgotPasswordDto) {
    return this.adminAuthService.forgotPassword(
      adminForgotPasswordDto.phoneNumber,
      adminForgotPasswordDto.redirectBaseUrl,
    );
  }

  @Post('reset-password')
  async reset(@Body(ParseObjectIdPipe) adminResetPasswordDto: AdminResetPasswordDto) {
    return this.adminAuthService.resetPassword(adminResetPasswordDto.token, adminResetPasswordDto.newPassword);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(StripFields(['password']))
  @Post('update-password')
  async updatePassword(
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
    @Body(ParseObjectIdPipe) adminUpdatePasswordUserDto: AdminUpdatePasswordUserDto,
  ) {
    const { tenantId, _id } = user;
    const result = await this.adminAuthService.updatePassword(_id, adminUpdatePasswordUserDto, tenantId);
    return result;
  }

  // Endpoint lấy thông tin ngư�i dùng hiện tại
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(StripFields(['password']))
  @Get('get-current-user')
  async getCurrentUser(@CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId, _id: userId } = user;
    return this.adminAuthService.getCurrentUser(userId, tenantId);
  }
}
