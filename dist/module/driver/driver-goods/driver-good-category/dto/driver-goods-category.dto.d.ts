import { Types } from 'mongoose';
export declare class DriverGoodsCategoryDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    name: string;
    icon: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class DriverSearchGoodsCategoryPagingQuerySortFilter {
    key: string;
    value: string;
}
export declare class DriverSearchGoodsCategoryPagingQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: DriverSearchGoodsCategoryPagingQuerySortFilter;
    filters: DriverSearchGoodsCategoryPagingQuerySortFilter[];
}
export declare class DriverSearchGoodsPagingRes {
    pageIdx: number;
    goodsCategories: DriverGoodsCategoryDto[];
    totalPage: number;
    totalItem: number;
}
