import { ClientSession, Model, Types } from 'mongoose';
import { CreateBusStationDto } from './dto/create-bus-station.dto';
import { UpdateBusStationDto } from './dto/update-bus-station.dto';
import { BusStationDto, SearchBusStationsQuerySortFilter, SearchBusStationsRes } from './dto/bus-station.dto';
import { BusStationDocument } from './schema/bus-station.schema';
export declare class BusStationService {
    private readonly busStationModel;
    constructor(busStationModel: Model<BusStationDocument>);
    create(createBusStationDto: CreateBusStationDto, tenantId: Types.ObjectId): Promise<BusStationDto>;
    createMany(createBusStationDtos: CreateBusStationDto[], tenantId: Types.ObjectId, provinceId: Types.ObjectId, session?: ClientSession): Promise<BusStationDto[]>;
    update(updateBusStationDto: UpdateBusStationDto, tenantId: Types.ObjectId): Promise<BusStationDto>;
    updates(updateBusStationDtos: UpdateBusStationDto[], tenantIds: Types.ObjectId[]): Promise<BusStationDto[]>;
    delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean>;
    findAll(tenantIds: Types.ObjectId[]): Promise<BusStationDto[]>;
    findAllAvailable(tenantIds: Types.ObjectId[]): Promise<BusStationDto[]>;
    findAllUnAssignedAvailable(tenantId: Types.ObjectId): Promise<BusStationDto[]>;
    findOffices(tenantIds: Types.ObjectId[]): Promise<BusStationDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<BusStationDto>;
    findByIds(ids: Types.ObjectId[], tenantIds: Types.ObjectId[]): Promise<BusStationDto[]>;
    findOneByProvinceId(provinceId: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<BusStationDto>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: SearchBusStationsQuerySortFilter, filters: SearchBusStationsQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<SearchBusStationsRes>;
    mapImageUrl(busStations: BusStationDto[]): Promise<BusStationDto[]>;
    buildQuerySearchBusStation(pageIdx: number, pageSize: number, keyword: string, sortBy: SearchBusStationsQuerySortFilter, filters: SearchBusStationsQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<any>;
}
