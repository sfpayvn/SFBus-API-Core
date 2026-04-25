import { Types } from 'mongoose';
export declare class ClientPaymentDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    referrentId: Types.ObjectId;
    referrentNumber: string;
    userId: Types.ObjectId;
    promotionId?: Types.ObjectId;
    paymentMethodId: Types.ObjectId;
    paymentNumber: string;
    status: string;
    paymentAmount: number;
    chargedAmount: number;
    transactionReferrentId: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
