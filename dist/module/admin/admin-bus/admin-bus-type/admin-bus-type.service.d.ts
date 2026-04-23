import { Model, Types } from 'mongoose';
import { BusTypeDocument } from '@/module/core/bus/bus-type/schema/bus-type.schema';
import { BusTypeService } from '@/module/core/bus/bus-type/bus-type.service';
import { AdminBusTypeDto, AdminSearchBusTypesQuerySortFilter, AdminSearchBusTypesRes } from './dto/admin-bus-type.dto';
import { AdminCreateBusTypeDto } from './dto/admin-create-bus-type.dto';
import { AdminUpdateBusTypeDto } from './dto/admin-update-bus-type.dto';
export declare class AdminBusTypeService {
    private readonly busTypeModel;
    private readonly busTypeService;
    ROOT_TENANT_ID: string;
    constructor(busTypeModel: Model<BusTypeDocument>, busTypeService: BusTypeService);
    create(adminCreateBusTypeDto: AdminCreateBusTypeDto, tenantId: Types.ObjectId): Promise<AdminBusTypeDto>;
    update(adminUpdateBusTypeDto: AdminUpdateBusTypeDto, tenantId: Types.ObjectId): Promise<AdminBusTypeDto>;
    delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean>;
    findAll(tenantIds: Types.ObjectId[]): Promise<AdminBusTypeDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<AdminBusTypeDto>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: AdminSearchBusTypesQuerySortFilter, filters: AdminSearchBusTypesQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<AdminSearchBusTypesRes>;
}
