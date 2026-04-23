import { Types } from 'mongoose';
export declare class ClientPromotionDto {
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
export declare class ClientRedeemPromotionDto {
    bookingIds: Types.ObjectId[];
    userId: Types.ObjectId;
    promotionId: Types.ObjectId;
}
export declare class ClientSearchPromotionPagingQuerySortFilter {
    key: string;
    value: string;
}
export declare class ClientSearchPromotionPagingQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: ClientSearchPromotionPagingQuerySortFilter;
    filters: ClientSearchPromotionPagingQuerySortFilter[];
}
export declare class ClientSearchPromotionPagingRes {
    pageIdx: number;
    promotions: ClientPromotionDto[];
    totalPage: number;
    totalItem: number;
}
export declare class ClientRequestPromotionByRule {
    userId: Types.ObjectId;
    bookingIds: Types.ObjectId[];
}
export declare class ClientRequestPromotionMass {
}
