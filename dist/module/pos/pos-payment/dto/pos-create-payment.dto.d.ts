import { Types } from 'mongoose';
export declare class PosCreatePaymentDto {
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
}
