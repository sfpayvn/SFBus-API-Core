import { Model, Types } from 'mongoose';
import { DriverDocument } from '@/module/core/user/driver/schema/driver.schema';
import { DriverService } from '@/module/core/user/driver/driver.service';
import { AdminCreateDriverDto } from './dto/admin-create-driver.dto';
import { AdminDriverDto, AdminSearchDriversQuerySortFilter, AdminSearchDriversRes } from './dto/admin-driver.dto';
import { AdminUpdateDriverDto } from './dto/admin-update-driver.dto';
export declare class AdminDriverService {
    private driverModel;
    private readonly driverService;
    constructor(driverModel: Model<DriverDocument>, driverService: DriverService);
    create(adminCreateDriverDto: AdminCreateDriverDto, tenantId: Types.ObjectId): Promise<AdminDriverDto>;
    update(adminUpdateDriverDto: AdminUpdateDriverDto, tenantId: Types.ObjectId): Promise<AdminDriverDto>;
    delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean>;
    deleteByUserId(userId: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean>;
    findAllUserDriver(tenantId: Types.ObjectId): Promise<AdminDriverDto[]>;
    findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<AdminDriverDto>;
    findUserDriverByIds(ids: Types.ObjectId[], tenantId: Types.ObjectId): Promise<AdminDriverDto[]>;
    findOneByUser(userId: Types.ObjectId, tenantId: Types.ObjectId): Promise<AdminDriverDto | null>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: AdminSearchDriversQuerySortFilter, filters: AdminSearchDriversQuerySortFilter[], tenantId: Types.ObjectId): Promise<AdminSearchDriversRes>;
}
