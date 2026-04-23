export { CreateFeeTaxDto, UpdateFeeTaxDto, FeeTaxDto, FeeTaxConditionsDto, } from '@/module/core/fee-tax/dto/fee-tax.dto';
import { FeeTaxDto } from '@/module/core/fee-tax/dto/fee-tax.dto';
export declare class FeeTaxSortFilter {
    key: string;
    value: 'ascend' | 'desc';
}
export declare class AdminSearchFeeTaxPagingQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: FeeTaxSortFilter;
    filters: FeeTaxSortFilter[];
}
export declare class AdminSearchFeeTaxPagingRes {
    pageIdx: number;
    feeTaxes: FeeTaxDto[];
    totalPage: number;
    totalItem: number;
}
