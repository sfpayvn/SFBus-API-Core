import { Types } from 'mongoose';
export declare class AdminCreateWidgetBlockDto {
    tenantId: Types.ObjectId;
    name: string;
    imageId: Types.ObjectId;
    html: string;
    css?: string;
    projectData?: string;
}
