import { Model, Types } from 'mongoose';
import { BusStationDocument } from '@/module/core/bus/bus-station/schema/bus-station.schema';
import { BusStationService } from '@/module/core/bus/bus-station/bus-station.service';
import { AdminBusStationDto, AdminSearchBusStationsQuerySortFilter, AdminSearchBusStationsRes } from './dto/admin-bus-station.dto';
import { AdminCreateBusStationDto } from './dto/admin-create-bus-station.dto';
import { AdminUpdateBusStationDto } from './dto/admin-update-bus-station.dto';
export declare class AdminBusStationService {
    private readonly busStationModel;
    private readonly busStationService;
    ROOT_TENANT_ID: string;
    constructor(busStationModel: Model<BusStationDocument>, busStationService: BusStationService);
    create(adminCreateBusStationDto: AdminCreateBusStationDto, tenantId: Types.ObjectId): Promise<AdminBusStationDto>;
    update(adminUpdateBusStationDto: AdminUpdateBusStationDto, tenantId: Types.ObjectId): Promise<AdminBusStationDto>;
    updates(adminUpdateBusStationDto: AdminUpdateBusStationDto[], tenantIds: Types.ObjectId[]): Promise<AdminBusStationDto[]>;
    delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean>;
    findAll(tenantIds: Types.ObjectId[]): Promise<AdminBusStationDto[]>;
    findAllAvailable(tenantIds: Types.ObjectId[]): Promise<AdminBusStationDto[]>;
    findAllUnAssignedAvailable(tenantId: Types.ObjectId): Promise<AdminBusStationDto[]>;
    findOffices(tenantIds: Types.ObjectId[]): Promise<AdminBusStationDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<AdminBusStationDto>;
    findOneByProvinceId(provinceId: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<AdminBusStationDto>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: AdminSearchBusStationsQuerySortFilter, filters: AdminSearchBusStationsQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<AdminSearchBusStationsRes>;
}
