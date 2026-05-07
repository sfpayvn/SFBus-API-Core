import { AutoJobTrackingService } from '../auto-job-tracking/auto-job-tracking.service';
import { TenantSubscriptionService } from '../tenant-subscription/tenant-subscription.service';
import { BusScheduleAutogeneratorService } from '../bus/bus-schedule-autogenerator/bus-schedule-autogenerator.service';
export declare class AutoJobService {
    private readonly autoJobTrackingService;
    private readonly tenantSubscriptionService;
    private readonly busScheduleAutogeneratorService;
    private readonly logger;
    constructor(autoJobTrackingService: AutoJobTrackingService, tenantSubscriptionService: TenantSubscriptionService, busScheduleAutogeneratorService: BusScheduleAutogeneratorService);
    tryRunTodayForEligibleTenants(moduleKey: string, jobName?: string, timezoneOffset?: number): Promise<void>;
}
