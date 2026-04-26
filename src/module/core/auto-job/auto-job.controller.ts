import { Controller, Post, HttpCode, Query, UseGuards, Headers, UnauthorizedException } from '@nestjs/common';
import { AutoJobService } from './auto-job.service';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { Roles } from '@/decorators/roles.decorator';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';
import { TimezoneOffset } from '@/decorators/timezone.decorator';

@Controller('core/auto-job')
export class AutoJobController {
  constructor(private readonly autoJobService: AutoJobService) {}

  /**
   * Trigger auto-schedule cho tất cả tenant đang active và không bị block module.
   * Mỗi tenant chỉ chạy 1 lần/ngày.
   */
  @Post('run-eligible-tenants-cron')
  @HttpCode(200)
  async runEligibleTenants(
    @Query('moduleKey') moduleKey: string = 'bus-schedule-autogenerators',
    @Query('jobName') jobName: string = 'auto_schedule',
    @TimezoneOffset() timezoneOffset: number,
    @Headers('x-cron-secret') secret: string,
  ) {
    console.log('🚀 ~ AutoJobController ~ runEligibleTenants ~ secret:', secret);
    if (secret !== process.env.CRON_SECRET) {
      throw new UnauthorizedException();
    }
    await this.autoJobService.tryRunTodayForEligibleTenants(moduleKey, jobName, timezoneOffset);
    return { ok: true };
  }
}
