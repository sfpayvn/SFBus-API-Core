import { Types } from 'mongoose';
export declare class CreatePaymentDto {
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
}
