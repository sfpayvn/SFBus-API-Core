import { Model, Types } from 'mongoose';
import { ClientDriverDto, ClientSearchDriversQuerySortFilter, ClientSearchDriversRes } from './dto/client-driver.dto';
import { DriverService } from '@/module/core/user/driver/driver.service';
import { DriverDocument } from '@/module/core/user/driver/schema/driver.schema';
export declare class ClientDriverService {
    private driverModel;
    private readonly driverService;
    constructor(driverModel: Model<DriverDocument>, driverService: DriverService);
    findAllUserDriver(tenantId: Types.ObjectId): Promise<ClientDriverDto[]>;
    findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<ClientDriverDto>;
    findUserDriverByIds(ids: Types.ObjectId[], tenantId: Types.ObjectId): Promise<ClientDriverDto[]>;
    findOneByUser(userId: Types.ObjectId, tenantId: Types.ObjectId): Promise<ClientDriverDto | null>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: ClientSearchDriversQuerySortFilter, filters: ClientSearchDriversQuerySortFilter[], tenantId: Types.ObjectId): Promise<ClientSearchDriversRes>;
}
