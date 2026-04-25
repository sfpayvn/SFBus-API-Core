import { BusRouteService } from '@/module/core/bus/bus-route/bus-route.service';
import { BusRouteDocument } from '@/module/core/bus/bus-route/schema/bus-route.schema';
import { Model, Types } from 'mongoose';
import { AdminBusRouteDto, AdminSearchBusRouteQuerySortFilter, AdminSearchBusRouteRes } from './dto/admin-admin-bus-route.dto';
import { AdminCreateBusRouteDto } from './dto/admin-create-bus-route.dto';
import { AdminUpdateBusRouteDto } from './dto/admin-update-bus-route.dto';
export declare class AdminBusRouteService {
    private readonly busRouteModel;
    private readonly busRouteService;
    ROOT_TENANT_ID: string;
    constructor(busRouteModel: Model<BusRouteDocument>, busRouteService: BusRouteService);
    create(adminCreateBusRouteDto: AdminCreateBusRouteDto, tenantId: Types.ObjectId): Promise<AdminBusRouteDto>;
    findAll(tenantIds: Types.ObjectId[]): Promise<AdminBusRouteDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<AdminBusRouteDto | null>;
    update(adminUpdateBusRouteDto: AdminUpdateBusRouteDto, tenantId: Types.ObjectId): Promise<AdminBusRouteDto>;
    delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: AdminSearchBusRouteQuerySortFilter, filters: AdminSearchBusRouteQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<AdminSearchBusRouteRes>;
    findByStationId(stationId: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<AdminBusRouteDto[]>;
}
