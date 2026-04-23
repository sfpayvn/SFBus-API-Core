import { BusProvinceService } from '@/module/core/bus/bus-province/bus-province.service';
import { BusProvinceDocument } from '@/module/core/bus/bus-province/schema/bus-schema.schema';
import { Model, Types } from 'mongoose';
import { AdminBusProvinceDto, AdminSearchBusProvincesQuerySortFilter, AdminSearchBusProvincesRes } from './dto/admin-bus-province.dto';
import { AdminCloneBusProvinceDto, AdminCreateBusProvinceDto } from './dto/admin-create-bus-province.dto';
import { AdminUpdateBusProvinceDto } from './dto/admin-update-bus-province.dto';
export declare class AdminBusProvinceService {
    private readonly busProvinceModel;
    private readonly busProvinceService;
    ROOT_TENANT_ID: string;
    constructor(busProvinceModel: Model<BusProvinceDocument>, busProvinceService: BusProvinceService);
    create(adminCreateBusProvinceDto: AdminCreateBusProvinceDto, tenantId: Types.ObjectId): Promise<AdminBusProvinceDto>;
    clone(adminCloneBusProvinceDto: AdminCloneBusProvinceDto, tenantId: Types.ObjectId): Promise<AdminBusProvinceDto>;
    findAll(tenantIds: Types.ObjectId[]): Promise<AdminBusProvinceDto[]>;
    findAvailable(tenantIds: Types.ObjectId[]): Promise<AdminBusProvinceDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<AdminBusProvinceDto>;
    update(updateBusProvinceDto: AdminUpdateBusProvinceDto, tenantId: Types.ObjectId): Promise<AdminBusProvinceDto>;
    delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: AdminSearchBusProvincesQuerySortFilter, filters: AdminSearchBusProvincesQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<AdminSearchBusProvincesRes>;
}
