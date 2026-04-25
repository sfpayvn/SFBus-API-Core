import { Types } from 'mongoose';
import { ClientUserDto } from '../../client-user-main/dto/client-user.dto';
export declare class ClientDriverDto extends ClientUserDto {
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
export declare class ClientSearchDriversQuerySortFilter {
    key: string;
    value: string;
}
export declare class ClientSearchDriversQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: ClientSearchDriversQuerySortFilter;
    filters: ClientSearchDriversQuerySortFilter[];
}
export declare class ClientSearchDriversRes {
    pageIdx: number;
    userDrivers: ClientDriverDto[];
    totalPage: number;
    totalItem: number;
}
