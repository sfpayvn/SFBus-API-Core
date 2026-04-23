import { Types } from 'mongoose';
export declare class AdminGoodsCategoryDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    name: string;
    icon: string;
    iconId: Types.ObjectId;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class AdminSearchGoodsCategoryPagingQuerySortFilter {
    key: string;
    value: string;
}
export declare class AdminSearchGoodsCategoryPagingQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: AdminSearchGoodsCategoryPagingQuerySortFilter;
    filters: AdminSearchGoodsCategoryPagingQuerySortFilter[];
}
export declare class AdminSearchGoodsPagingRes {
    pageIdx: number;
    goodsCategories: AdminGoodsCategoryDto[];
    totalPage: number;
    totalItem: number;
}
