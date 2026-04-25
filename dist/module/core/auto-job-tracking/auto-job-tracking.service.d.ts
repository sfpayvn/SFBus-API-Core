import { Model, Types } from 'mongoose';
import { AutoJobTrackingDocument } from './schema/auto-job-tracking.schema';
export declare class AutoJobTrackingService {
    private readonly trackingModel;
    ROOT_TENANT_ID: string;
    private readonly logger;
    constructor(trackingModel: Model<AutoJobTrackingDocument>);
    tryRunToday(tenantId: Types.ObjectId, jobName?: string, timezoneOffset?: number): Promise<boolean>;
}
