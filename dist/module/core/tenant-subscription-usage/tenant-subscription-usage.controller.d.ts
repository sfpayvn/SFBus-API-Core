import { TenantSubscriptionUsageService } from './tenant-subscription-usage.service';
export declare class TenantSubscriptionUsageController {
    private readonly tenantSubscriptionUsageService;
    constructor(tenantSubscriptionUsageService: TenantSubscriptionUsageService);
    getCapabilities(req: any): any;
}
