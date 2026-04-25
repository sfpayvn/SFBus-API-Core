import { Types } from 'mongoose';
export declare class DriverPaymentDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    referrentId: Types.ObjectId;
    referrentNumber: string;
    userId: Types.ObjectId;
    promotionId?: Types.ObjectId;
    paymentMethodId: Types.ObjectId;
    paymentNumber: string;
    referrentGroupNumber: string;
    status: string;
    paymentAmount: number;
    chargedAmount: number;
    transactionReferrentId: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class DriverRequestPaymentDto {
    paymentMethodId: Types.ObjectId;
    transactionId: string;
    referrentGroupNumber: string;
    totalPrice: number;
}
