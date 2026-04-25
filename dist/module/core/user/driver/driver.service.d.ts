import { Model, Types } from 'mongoose';
import { CreateDriverDto } from './dto/create-driver.dto';
import { DriverDocument } from './schema/driver.schema';
import { SearchDriversRes, DriverDto, SearchDriversQuerySortFilter } from './dto/driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { UserService } from '../user/user.service';
export declare class DriverService {
    private driverModel;
    private readonly userService;
    constructor(driverModel: Model<DriverDocument>, userService: UserService);
    create(createDriverDto: CreateDriverDto, tenantId: Types.ObjectId): Promise<DriverDto>;
    update(updateDriverDto: UpdateDriverDto, tenantId: Types.ObjectId): Promise<DriverDto>;
    delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean>;
    deleteByUserId(userId: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean>;
    findAllUserDriver(tenantId: Types.ObjectId): Promise<DriverDto[]>;
    findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<DriverDto>;
    findUserDriverByIds(ids: Types.ObjectId[], tenantId: Types.ObjectId): Promise<DriverDto[]>;
    findOneByUser(userId: Types.ObjectId, tenantId: Types.ObjectId): Promise<DriverDto | null>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: SearchDriversQuerySortFilter, filters: SearchDriversQuerySortFilter[], tenantId: Types.ObjectId): Promise<SearchDriversRes>;
    buildQuerySearchBusTypes(userIds: Types.ObjectId[], pageIdx: number, pageSize: number, keyword: string, sortBy: SearchDriversQuerySortFilter, filters: SearchDriversQuerySortFilter[], tenantId: Types.ObjectId): Promise<any>;
}
