import { Types } from 'mongoose';
export declare class AdminCreatePromotionDto {
    tenantId: Types.ObjectId;
    imageId: Types.ObjectId;
    name: string;
    code: string;
    description?: string;
    discountType: 'percentage' | 'fixed';
    discountValue: number;
    expireDate: Date;
    status: string;
}
