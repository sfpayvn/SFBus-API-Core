import { Model, Types } from 'mongoose';
import { TenantSubscriptionUsageDocument } from './schema/tenant-subscription-usage.schema';
import { TenantSubscriptionService } from '../tenant-subscription/tenant-subscription.service';
type ConsumeParams = {
    subscriptionId: Types.ObjectId;
    subjectId: Types.ObjectId;
    moduleKey: string;
    functionKey?: string | null;
};
export declare class TenantSubscriptionUsageService {
    private readonly usageModel;
    private readonly tenantSubscriptionService;
    constructor(usageModel: Model<TenantSubscriptionUsageDocument>, tenantSubscriptionService: TenantSubscriptionService);
    private getWindow;
    private resolveRule;
    checkAndConsume(params: ConsumeParams): any;
    buildCapabilities(subjectIdRaw: any): any;
    releaseQuota(params: ConsumeParams): Promise<{
        success: boolean;
        remaining?: number;
        resetAt?: Date;
    }>;
}
export {};
