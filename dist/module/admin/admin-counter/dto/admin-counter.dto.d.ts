import { Types } from 'mongoose';
export declare class PaymentDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    seatCounter: number;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
