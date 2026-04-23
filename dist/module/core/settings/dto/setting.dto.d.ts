import { Types } from 'mongoose';
export declare class SettingDto {
    _id: Types.ObjectId;
    name: string;
    groupName?: string;
    value: string;
    description?: string;
    tenantId: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class SettingSortFilter {
    key: string;
    value: string | string[];
}
export declare class SearchSettingsPagingQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: SettingSortFilter;
    filters: SettingSortFilter[];
}
export declare class SearchSettingsRes {
    pageIdx: number;
    settings: SettingDto[];
    totalPage: number;
    totalItem: number;
}
