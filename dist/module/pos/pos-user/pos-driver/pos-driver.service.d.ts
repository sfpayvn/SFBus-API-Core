import { Model, Types } from 'mongoose';
import { PosDriverDto } from './dto/pos-driver.dto';
import { DriverService } from '@/module/core/user/driver/driver.service';
import { DriverDocument } from '@/module/core/user/driver/schema/driver.schema';
export declare class PosDriverService {
    private driverModel;
    private readonly driverService;
    constructor(driverModel: Model<DriverDocument>, driverService: DriverService);
    findAllUserDriver(tenantId: Types.ObjectId): Promise<PosDriverDto[]>;
    findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<PosDriverDto>;
    findUserDriverByIds(ids: Types.ObjectId[], tenantId: Types.ObjectId): Promise<PosDriverDto[]>;
    findOneByUser(userId: Types.ObjectId, tenantId: Types.ObjectId): Promise<PosDriverDto | null>;
}
