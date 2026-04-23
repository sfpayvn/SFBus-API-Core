import { Types } from 'mongoose';
export declare class PromotionDto {
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
export declare class RedeemPromotionDto {
    bookingIds: Types.ObjectId[];
    userId: Types.ObjectId;
    promotionId: Types.ObjectId;
}
export declare class SearchPromotionPagingQuerySortFilter {
    key: string;
    value: string;
}
export declare class SearchPromotionPagingQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: SearchPromotionPagingQuerySortFilter;
    filters: SearchPromotionPagingQuerySortFilter[];
}
export declare class SearchPromotionPagingRes {
    pageIdx: number;
    promotions: PromotionDto[];
    totalPage: number;
    totalItem: number;
}
export declare class RequestPromotionByRule {
    userId: Types.ObjectId;
    bookingIds: Types.ObjectId[];
}
export declare class RequestPromotionMass {
}
