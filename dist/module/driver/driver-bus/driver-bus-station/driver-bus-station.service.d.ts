import { Model, Types } from 'mongoose';
import { BusStationDocument } from '@/module/core/bus/bus-station/schema/bus-station.schema';
import { BusStationService } from '@/module/core/bus/bus-station/bus-station.service';
import { DriverBusStationDto, DriverSearchBusStationsQuerySortFilter, DriverSearchBusStationsRes } from './dto/driver-bus-station.dto';
export declare class DriverBusStationService {
    private readonly busStationModel;
    private readonly busStationService;
    ROOT_TENANT_ID: string;
    constructor(busStationModel: Model<BusStationDocument>, busStationService: BusStationService);
    findAll(tenantIds: Types.ObjectId[]): Promise<DriverBusStationDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<DriverBusStationDto>;
    findOneByProvinceId(provinceId: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<DriverBusStationDto>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: DriverSearchBusStationsQuerySortFilter, filters: DriverSearchBusStationsQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<DriverSearchBusStationsRes>;
}
