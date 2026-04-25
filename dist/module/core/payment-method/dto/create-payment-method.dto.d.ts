import { Types } from 'mongoose';
export declare class CreatePaymentBankingDto {
    providerId: Types.ObjectId;
    token: string;
    bankName: string;
    accountNumber: string;
    accountName: string;
}
export declare class CreatePaymentMethodDto {
    providerId: Types.ObjectId;
    token: string;
    name: string;
    banking?: CreatePaymentBankingDto;
    type: string;
    imageId: Types.ObjectId;
    note?: string;
    status: string;
    isPaymentMethodDefault?: boolean;
}
