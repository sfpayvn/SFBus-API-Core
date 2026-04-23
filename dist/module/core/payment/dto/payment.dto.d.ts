import { Types } from 'mongoose';
export declare class SimplePaymentMethodDto {
    name: string;
    image: string;
    note?: string;
    type: string;
}
export declare class PaymentDto {
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
    paymentMethod: SimplePaymentMethodDto;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class RequestPaymentDto {
    paymentMethodId: Types.ObjectId;
    transactionId: string;
    referrentGroupNumber: string;
    totalPrice: number;
}
