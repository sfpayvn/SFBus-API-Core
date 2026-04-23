import { Types } from 'mongoose';
import { UserDto } from '../../user/dto/user.dto';
export declare class DriverDto extends UserDto {
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
export declare class SearchDriversQuerySortFilter {
    key: string;
    value: string;
}
export declare class SearchDriversQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: SearchDriversQuerySortFilter;
    filters: SearchDriversQuerySortFilter[];
}
export declare class SearchDriversRes {
    pageIdx: number;
    userDrivers: DriverDto[];
    totalPage: number;
    totalItem: number;
}
