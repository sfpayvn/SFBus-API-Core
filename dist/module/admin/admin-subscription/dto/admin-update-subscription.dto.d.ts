import { Types } from 'mongoose';
import { AdminCreateSubscriptionDto } from './admin-create-subscription.dto';
declare const UpdateAdminSubscriptionDto_base: import("@nestjs/mapped-types").MappedType<Partial<AdminCreateSubscriptionDto>>;
export declare class UpdateAdminSubscriptionDto extends UpdateAdminSubscriptionDto_base {
    _id: Types.ObjectId;
}
export {};
