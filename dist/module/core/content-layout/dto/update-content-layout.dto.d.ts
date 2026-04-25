import { Types } from 'mongoose';
export declare class UpdateContentLayoutDto {
    _id: Types.ObjectId;
    name: string;
    slug: string;
    imageId: Types.ObjectId;
    zones: string;
    description?: string;
    projectData: string;
    appSource: string;
    platform: string;
    isPublish: boolean;
    startDate: Date;
    endDate?: Date;
}
