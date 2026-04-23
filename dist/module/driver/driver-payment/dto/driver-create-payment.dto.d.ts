import { Types } from 'mongoose';
export declare class DriverCreatePaymentDto {
    tenantId: Types.ObjectId;
    bookingId: Types.ObjectId;
    bookingNumber: string;
    userId: Types.ObjectId;
    promotionId?: Types.ObjectId;
    paymentMethodId: Types.ObjectId;
    paymentNumber: string;
    status: string;
    paymentAmount: number;
    chargedAmount: number;
    transactionReferrentId: string;
}
