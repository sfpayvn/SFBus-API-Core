import { Types } from 'mongoose';
export declare class DriverPromotionDto {
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
export declare class DriverRedeemPromotionDto {
    bookingIds: Types.ObjectId[];
    userId: Types.ObjectId;
    promotionId: Types.ObjectId;
}
export declare class DriverSearchPromotionPagingQuerySortFilter {
    key: string;
    value: string;
}
export declare class DriverSearchPromotionPagingQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: DriverSearchPromotionPagingQuerySortFilter;
    filters: DriverSearchPromotionPagingQuerySortFilter[];
}
export declare class DriverSearchPromotionPagingRes {
    pageIdx: number;
    promotions: DriverPromotionDto[];
    totalPage: number;
    totalItem: number;
}
export declare class DriverRequestPromotionByRule {
    userId: Types.ObjectId;
    bookingIds: Types.ObjectId[];
}
export declare class DriverRequestPromotionMass {
}
