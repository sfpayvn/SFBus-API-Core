import { Types } from 'mongoose';
export declare class DriverNotificationDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    title: string;
    desc: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
