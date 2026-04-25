import { BusDocument } from '@/module/core/bus/bus/schema/bus.schema';
import { Model, Types } from 'mongoose';
import { AdminBusDto, AdminSearchBusQuerySortFilter, AdminSearchBusRes } from './dto/admin-bus.dto';
import { AdminCreateBusDto } from './dto/admin-create-bus.dto';
import { AdminUpdateBusDto } from './dto/admin-update-bus.dto';
import { BusService } from '@/module/core/bus/bus/bus.service';
export declare class AdminBusService {
    private readonly busModel;
    private readonly busService;
    constructor(busModel: Model<BusDocument>, busService: BusService);
    create(adminCreateBusDto: AdminCreateBusDto, tenantId: Types.ObjectId): Promise<AdminBusDto>;
    update(adminUpdateBusDto: AdminUpdateBusDto, tenantId: Types.ObjectId): Promise<AdminBusDto>;
    delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean>;
    findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<AdminBusDto | null>;
    findByBusTemplate(busTemplateId: Types.ObjectId, tenantId: Types.ObjectId, rootTenantId: Types.ObjectId): Promise<AdminBusDto[]>;
    findAll(tenantId: Types.ObjectId): Promise<AdminBusDto[]>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: AdminSearchBusQuerySortFilter, filters: AdminSearchBusQuerySortFilter[], tenantId: Types.ObjectId): Promise<AdminSearchBusRes>;
}
