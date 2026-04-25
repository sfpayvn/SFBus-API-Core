import { Types } from 'mongoose';
export declare class UserTokenDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    roles?: string[];
    subscriptionId?: string;
    tokenVersion?: number;
    appVersion?: string;
}
