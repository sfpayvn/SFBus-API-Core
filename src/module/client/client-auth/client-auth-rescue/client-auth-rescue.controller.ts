// otp.controller.ts
import { Body, Controller, HttpCode, Post, Headers } from '@nestjs/common';
import { ClientAuthRescueService } from './client-auth-rescue.service';
import { ClientRequestAuthRescueDto, ClientVerifyAuthRescueDto } from './dto/client-auth-rescue.dto';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';

@Controller('client/auth/rescue')
export class ClientAuthRescueController {
  constructor(private readonly ClientAuthRescueService: ClientAuthRescueService) {}

  @Post('request')
  async request(
    @Body(ParseObjectIdPipe) ClientRequestAuthRescueDto: ClientRequestAuthRescueDto,
    @Headers('x-tenant-code') tenantCode: string,
  ) {
    const res = await this.ClientAuthRescueService.requestAuthRescue(
      ClientRequestAuthRescueDto.identifier,
      tenantCode,
      ClientRequestAuthRescueDto.purpose,
    );
    // PRODUCTION: return { success: true } (kh�ng tr? Token)
    return res;
  }

  @Post('verify')
  @HttpCode(200)
  async verify(
    @Body(ParseObjectIdPipe) ClientVerifyAuthRescueDto: ClientVerifyAuthRescueDto,
    @Headers('x-tenant-code') tenantCode: string,
  ) {
    return this.ClientAuthRescueService.verifyAuthRescueAndLogin(
      ClientVerifyAuthRescueDto.identifier,
      tenantCode,
      ClientVerifyAuthRescueDto.purpose,
      ClientVerifyAuthRescueDto.token,
    );
  }
}
