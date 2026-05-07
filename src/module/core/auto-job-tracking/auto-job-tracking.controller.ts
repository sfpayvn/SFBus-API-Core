import { Controller, Post, Delete, Get, Param, Query, HttpCode, UseGuards } from '@nestjs/common';
import { AutoJobTrackingService } from './auto-job-tracking.service';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { TimezoneOffset } from '@/decorators/timezone.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('auto-job-tracking')
export class AutoJobTrackingController {
  constructor(private readonly autoJobTrackingService: AutoJobTrackingService) {}

  /**
   * Manually trigger a job run for today.
   * Returns { ran: true } if the job was triggered, { ran: false } if already ran today.
   */
  @Post('try-run')
  @HttpCode(200)
  async tryRun(
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
    @Query('jobName') jobName: string = 'auto_schedule',
    @TimezoneOffset() timezoneOffset: number,
  ) {
    const ran = await this.autoJobTrackingService.tryRunToday(user.tenantId, jobName, timezoneOffset);
    return { ran };
  }

  /**
   * Reset tracking for a specific job today — allows it to run again.
   */
  @Delete('reset/:jobName')
  async reset(
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
    @Param('jobName') jobName: string,
    @TimezoneOffset() timezoneOffset: number,
  ) {
    await this.autoJobTrackingService.resetToday(user.tenantId, jobName, timezoneOffset);
    return { ok: true };
  }

  /**
   * Check whether a job has already run today.
   */
  @Get('status/:jobName')
  async status(
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
    @Param('jobName') jobName: string,
    @TimezoneOffset() timezoneOffset: number,
  ) {
    const ranToday = await this.autoJobTrackingService.hasRanToday(user.tenantId, jobName, timezoneOffset);
    return { jobName, ranToday };
  }
}
