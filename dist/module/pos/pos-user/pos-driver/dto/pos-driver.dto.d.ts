import { Types } from 'mongoose';
import { PosUserDto } from '../../pos-user-main/dto/pos-user.dto';
export declare class PosDriverDto extends PosUserDto {
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
export declare class PosSearchDriversQuerySortFilter {
    key: string;
    value: string;
}
export declare class PosSearchDriversQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: PosSearchDriversQuerySortFilter;
    filters: PosSearchDriversQuerySortFilter[];
}
export declare class PosSearchDriversRes {
    pageIdx: number;
    userDrivers: PosDriverDto[];
    totalPage: number;
    totalItem: number;
}
