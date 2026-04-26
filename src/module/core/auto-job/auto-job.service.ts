import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { Types } from 'mongoose';
import { AutoJobTrackingService } from '../auto-job-tracking/auto-job-tracking.service';
import { TenantSubscriptionService } from '../tenant-subscription/tenant-subscription.service';
import { BusScheduleAutogeneratorService } from '../bus/bus-schedule-autogenerator/bus-schedule-autogenerator.service';

@Injectable()
export class AutoJobService {
  private readonly logger = new Logger(AutoJobService.name);

  constructor(
    @Inject(forwardRef(() => AutoJobTrackingService))
    private readonly autoJobTrackingService: AutoJobTrackingService,
    @Inject(forwardRef(() => TenantSubscriptionService))
    private readonly tenantSubscriptionService: TenantSubscriptionService,
    @Inject(forwardRef(() => BusScheduleAutogeneratorService))
    private readonly busScheduleAutogeneratorService: BusScheduleAutogeneratorService,
  ) {}

  /**
   * Lấy danh sách tenantId đang active subscription và không bị block module theo moduleKey,
   * sau đó gọi tryRunToday cho từng tenant.
   * Nếu tenant được phép chạy hôm nay, gọi generateSchedulesForToday.
   * @param moduleKey - Key của module cần kiểm tra (VD: 'bus-schedule-autogenerators')
   * @param jobName - Tên job tracking
   * @param timezoneOffset - Timezone offset tính bằng milliseconds (VD: 25200000 cho UTC+7)
   */
  async tryRunTodayForEligibleTenants(
    moduleKey: string,
    jobName: string = 'auto_schedule',
    timezoneOffset: number = 25200000,
  ): Promise<void> {
    const now = new Date();
    const subs = await this.tenantSubscriptionService.findAllRawActiveSubscriptions(now);

    const eligibleTenantIds = subs
      .filter((sub) => {
        const modules: any[] = sub.limitationSnapshot?.modules ?? [];
        const mod = modules.find((m: any) => m.key === moduleKey);
        if (!mod) return true; // không có rule → cho phép
        const rule = mod.moduleRule;
        if (!rule) return true; // không có moduleRule → cho phép
        // bị block khi type === 'block' && quota === 0
        return !(rule.type === 'block' && (rule.quota ?? 0) === 0);
      })
      .map((sub) => sub.tenantId as Types.ObjectId);

    for (const tenantId of eligibleTenantIds) {
      const shouldRun = await this.autoJobTrackingService.tryRunToday(tenantId, jobName, timezoneOffset);
      if (shouldRun) {
        this.busScheduleAutogeneratorService.generateSchedulesForToday(tenantId, timezoneOffset).catch((err) => {
          this.logger.error(`generateSchedulesForToday failed for tenant ${tenantId}:`, err);
        });
      }
    }
  }
}
