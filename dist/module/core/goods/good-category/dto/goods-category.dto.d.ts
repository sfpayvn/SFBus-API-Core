import { Types } from 'mongoose';
export declare class GoodsCategoryDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    name: string;
    iconId: Types.ObjectId;
    icon: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class SearchGoodsCategoryPagingQuerySortFilter {
    key: string;
    value: string;
}
export declare class SearchGoodsCategoryPagingQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: SearchGoodsCategoryPagingQuerySortFilter;
    filters: SearchGoodsCategoryPagingQuerySortFilter[];
}
export declare class SearchGoodsPagingRes {
    pageIdx: number;
    goodsCategories: GoodsCategoryDto[];
    totalPage: number;
    totalItem: number;
}
