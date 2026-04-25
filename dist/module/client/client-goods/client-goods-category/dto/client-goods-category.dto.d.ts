import { Types } from 'mongoose';
export declare class ClientGoodsCategoryDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    name: string;
    icon: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class ClientSearchGoodsCategoryPagingQuerySortFilter {
    key: string;
    value: string;
}
export declare class ClientSearchGoodsCategoryPagingQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: ClientSearchGoodsCategoryPagingQuerySortFilter;
    filters: ClientSearchGoodsCategoryPagingQuerySortFilter[];
}
export declare class ClientSearchGoodsPagingRes {
    pageIdx: number;
    goodsCategories: ClientGoodsCategoryDto[];
    totalPage: number;
    totalItem: number;
}
