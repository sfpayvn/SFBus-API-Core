import { Types } from 'mongoose';
import { AdminUserDto } from '../../admin-user-main/dto/admin-user.dto';
export declare class AdminDriverDto extends AdminUserDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    userId: Types.ObjectId;
    licenseNumber: string;
    licenseExpirationDate: Date;
    licenseType: string;
    licenseImage: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class AdminSearchDriversQuerySortFilter {
    key: string;
    value: string;
}
export declare class AdminSearchDriversQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: AdminSearchDriversQuerySortFilter;
    filters: AdminSearchDriversQuerySortFilter[];
}
export declare class AdminSearchDriversRes {
    pageIdx: number;
    userDrivers: AdminDriverDto[];
    totalPage: number;
    totalItem: number;
}
