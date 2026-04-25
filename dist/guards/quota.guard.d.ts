import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TenantSubscriptionUsageService } from '@/module/core/tenant-subscription-usage/tenant-subscription-usage.service';
export declare class QuotaGuard implements CanActivate {
    private reflector;
    private tenantSubscriptionUsageService;
    constructor(reflector: Reflector, tenantSubscriptionUsageService: TenantSubscriptionUsageService);
    canActivate(ctx: ExecutionContext): Promise<boolean>;
}
