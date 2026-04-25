import { Types } from 'mongoose';
export declare class AdminCreatePaymentBankingDto {
    providerId: Types.ObjectId;
    token: string;
    bankName: string;
    accountNumber: string;
    accountName: string;
}
export declare class AdminCreatePaymentMethodDto {
    tenantId: Types.ObjectId;
    providerId: Types.ObjectId;
    token: string;
    name: string;
    banking?: AdminCreatePaymentBankingDto;
    type: string;
    imageId: Types.ObjectId;
    note?: string;
    status: string;
    isDefault?: boolean;
    isPaymentMethodDefault?: boolean;
}
