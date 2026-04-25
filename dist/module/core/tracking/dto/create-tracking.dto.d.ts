import { Types } from 'mongoose';
import { TrackingType } from '../constants/tracking-types';
export declare class CreateTrackingDto {
    type: TrackingType;
    platform: string;
    metadata: Record<string, any>;
    createdBy: Types.ObjectId;
}
