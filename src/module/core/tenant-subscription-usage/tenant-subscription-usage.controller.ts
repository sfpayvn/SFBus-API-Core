import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { TenantSubscriptionUsageService } from './tenant-subscription-usage.service';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';

@Controller('tenant/tenant-subscription-usage')
export class TenantSubscriptionUsageController {
  constructor(private readonly tenantSubscriptionUsageService: TenantSubscriptionUsageService) {}

  @UseGuards(JwtAuthGuard)
  @Get('capabilities')
  getCapabilities(@Request() req) {
    // tuỳ bạn: subjectId có thể là tenantId hoặc userId
    const subjectId = req.user.tenantId ?? req.user._id;
    return this.tenantSubscriptionUsageService.buildCapabilities(subjectId);
  }
}
