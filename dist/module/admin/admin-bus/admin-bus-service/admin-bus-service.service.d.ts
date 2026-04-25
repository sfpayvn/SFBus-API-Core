import { BusServiceService } from '@/module/core/bus/bus-service/bus-service.service';
import { Types } from 'mongoose';
import { AdminBusServiceDto, AdminSearchBusServicesQuerySortFilter, AdminSearchBusServicesRes } from './dto/admin-bus-service.dto';
import { AdminCreateBusServiceDto } from './dto/admin-create-bus-service.dto';
import { AdminUpdateBusServiceDto } from './dto/admin-update-bus-service.dto';
export declare class AdminBusServiceService {
    private readonly busServiceService;
    ROOT_TENANT_ID: string;
    constructor(busServiceService: BusServiceService);
    create(adminCreateBusServiceDto: AdminCreateBusServiceDto, tenantId: Types.ObjectId): Promise<AdminBusServiceDto>;
    update(adminUpdateBusServiceDto: AdminUpdateBusServiceDto, tenantId: Types.ObjectId): Promise<AdminBusServiceDto>;
    delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean>;
    findAll(tenantIds: Types.ObjectId[]): Promise<AdminBusServiceDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<AdminBusServiceDto>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: AdminSearchBusServicesQuerySortFilter, filters: AdminSearchBusServicesQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<AdminSearchBusServicesRes>;
}
