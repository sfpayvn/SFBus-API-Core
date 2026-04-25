import { CreateTrackingDto } from './create-tracking.dto';
import { Types } from 'mongoose';
declare const UpdateTrackingDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateTrackingDto>>;
export declare class UpdateTrackingDto extends UpdateTrackingDto_base {
    _id: Types.ObjectId;
    updatedBy: Types.ObjectId;
}
export {};
