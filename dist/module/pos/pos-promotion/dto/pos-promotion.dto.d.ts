import { Types } from 'mongoose';
export declare class PosPromotionDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    imageId: Types.ObjectId;
    image: string;
    name: string;
    code: string;
    description: string;
    discountType: 'percentage' | 'fixed';
    discountValue: number;
    expireDate: Date;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class PosRedeemPromotionDto {
    bookingIds: Types.ObjectId[];
    userId: Types.ObjectId;
    promotionId: Types.ObjectId;
}
export declare class PosSearchPromotionPagingQuerySortFilter {
    key: string;
    value: string;
}
export declare class PosSearchPromotionPagingQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: PosSearchPromotionPagingQuerySortFilter;
    filters: PosSearchPromotionPagingQuerySortFilter[];
}
export declare class PosSearchPromotionPagingRes {
    pageIdx: number;
    promotions: PosPromotionDto[];
    totalPage: number;
    totalItem: number;
}
export declare class PosRequestPromotionByRule {
    userId: Types.ObjectId;
    bookingIds: Types.ObjectId[];
}
export declare class PosRequestPromotionMass {
}
