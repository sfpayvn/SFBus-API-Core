import { Types } from 'mongoose';
export declare class CreateWidgetBlockDto {
    tenantId: Types.ObjectId;
    name: string;
    imageUrl: Types.ObjectId;
    html: string;
    css?: string;
    projectData?: string;
}
