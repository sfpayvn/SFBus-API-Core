import { Types } from 'mongoose';
export declare class UpdateWidgetBlockDto {
    _id: Types.ObjectId;
    name?: string;
    imageId?: Types.ObjectId;
    html?: string;
    css?: string;
    projectData?: string;
    isActive?: boolean;
}
