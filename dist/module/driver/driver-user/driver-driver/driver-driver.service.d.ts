import { Model, Types } from 'mongoose';
import { DriverDriverDto } from './dto/driver-driver.dto';
import { DriverUpdateDriverDto } from './dto/driver-update-driver.dto';
import { DriverService } from '@/module/core/user/driver/driver.service';
import { DriverDocument } from '@/module/core/user/driver/schema/driver.schema';
export declare class DriverDriverService {
    private driverModel;
    private readonly driverService;
    constructor(driverModel: Model<DriverDocument>, driverService: DriverService);
    update(DriverUpdateDriverDto: DriverUpdateDriverDto, tenantId: Types.ObjectId): Promise<DriverDriverDto>;
    findAllUserDriver(tenantId: Types.ObjectId): Promise<DriverDriverDto[]>;
    findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<DriverDriverDto>;
    findUserDriverByIds(ids: Types.ObjectId[], tenantId: Types.ObjectId): Promise<DriverDriverDto[]>;
    findOneByUser(userId: Types.ObjectId, tenantId: Types.ObjectId): Promise<DriverDriverDto | null>;
}
