import { Types } from 'mongoose';
import { DriverUserDto } from '../../driver-user-main/dto/driver-user.dto';
export declare class DriverDriverDto extends DriverUserDto {
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
export declare class DriverSearchDriversQuerySortFilter {
    key: string;
    value: string;
}
export declare class DriverSearchDriversQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: DriverSearchDriversQuerySortFilter;
    filters: DriverSearchDriversQuerySortFilter[];
}
export declare class DriverSearchDriversRes {
    pageIdx: number;
    userDrivers: DriverDriverDto[];
    totalPage: number;
    totalItem: number;
}
