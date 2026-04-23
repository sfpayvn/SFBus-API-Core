import { Types } from 'mongoose';
export declare class AdminPromotionDto {
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
export declare class AdminRedeemPromotionDto {
    bookingIds: Types.ObjectId[];
    userId: Types.ObjectId;
    promotionId: Types.ObjectId;
}
export declare class AdminSearchPromotionPagingQuerySortFilter {
    key: string;
    value: string;
}
export declare class AdminSearchPromotionPagingQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: AdminSearchPromotionPagingQuerySortFilter;
    filters: AdminSearchPromotionPagingQuerySortFilter[];
}
export declare class AdminSearchPromotionPagingRes {
    pageIdx: number;
    promotions: AdminPromotionDto[];
    totalPage: number;
    totalItem: number;
}
export declare class AdminRequestPromotionByRule {
    userId: Types.ObjectId;
    bookingIds: Types.ObjectId[];
}
export declare class AdminRequestPromotionMass {
}
