import { Types } from 'mongoose';
export declare class CreateContentLayoutDto {
    tenantId: Types.ObjectId;
    name: string;
    slug: string;
    imageId: Types.ObjectId;
    zones: string;
    description?: string;
    projectData: string;
    platform: string;
    appSource: string;
    isPublish: boolean;
    startDate: Date;
    endDate?: Date;
}
