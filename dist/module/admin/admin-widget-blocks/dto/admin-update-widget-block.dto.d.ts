import { Types } from 'mongoose';
export declare class AdminUpdateWidgetBlockDto {
    _id: Types.ObjectId;
    name?: string;
    imageId?: Types.ObjectId;
    html?: string;
    css?: string;
    projectData?: string;
    isActive?: boolean;
}
