import { Types } from 'mongoose';
export declare class PosGoodsCategoryDto {
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
export declare class PosSearchGoodsCategoryPagingQuerySortFilter {
    key: string;
    value: string;
}
export declare class PosSearchGoodsCategoryPagingQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: PosSearchGoodsCategoryPagingQuerySortFilter;
    filters: PosSearchGoodsCategoryPagingQuerySortFilter[];
}
export declare class PosSearchGoodsPagingRes {
    pageIdx: number;
    goodsCategories: PosGoodsCategoryDto[];
    totalPage: number;
    totalItem: number;
}
