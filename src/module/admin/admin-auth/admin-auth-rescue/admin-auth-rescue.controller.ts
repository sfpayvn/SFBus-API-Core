// otp.controller.ts
import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AdminAuthRescueService } from './admin-auth-rescue.service';
import { AdminRequestAuthRescueDto, AdminVerifyAuthRescueDto } from './dto/admin-auth-rescue.dto';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { LocalAuthGuard } from '@/guards/local-auth.guard.ts';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('admin/auth/rescue')
export class AdminAuthRescueController {
  constructor(private readonly adminAuthRescueService: AdminAuthRescueService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Post('request')
  async request(
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
    @Body(ParseObjectIdPipe) adminRequestAuthRescueDto: AdminRequestAuthRescueDto,
  ) {
    const { tenantId } = user;
    const res = await this.adminAuthRescueService.requestAuthRescue(
      adminRequestAuthRescueDto.identifier,
      adminRequestAuthRescueDto.purpose,
      tenantId,
    );
    // PRODUCTION: return { success: true } (không trả Token)
    return res;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Post('verify')
  @HttpCode(200)
  async verify(
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
    @Body(ParseObjectIdPipe) adminVerifyAuthRescueDto: AdminVerifyAuthRescueDto,
  ) {
    const { _id, tenantId } = user;
    return this.adminAuthRescueService.verifyAuthRescue(
      adminVerifyAuthRescueDto.identifier,
      adminVerifyAuthRescueDto.purpose,
      adminVerifyAuthRescueDto.token,
      _id,
      tenantId,
    );
  }
}
