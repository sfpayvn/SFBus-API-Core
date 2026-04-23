import { CloneBusProvinceDto, CreateBusProvinceDto } from './dto/create-bus-province.dto';
import { Model, Types, ClientSession } from 'mongoose';
import { BusProvinceDto, SearchBusProvincesQuerySortFilter, SearchBusProvincesRes } from './dto/bus-province.dto';
import { UpdateBusProvinceDto } from './dto/update-bus-province.dto';
import { BusProvinceDocument } from './schema/bus-schema.schema';
import { BusStationService } from '../bus-station/bus-station.service';
export declare class BusProvinceService {
    private readonly busProvinceModel;
    private readonly busStationService;
    constructor(busProvinceModel: Model<BusProvinceDocument>, busStationService: BusStationService);
    create(createBusProvinceDto: CreateBusProvinceDto, tenantId: Types.ObjectId, session?: ClientSession): Promise<BusProvinceDto>;
    clone(cloneBusProvinceDto: CloneBusProvinceDto, tenantId: Types.ObjectId, session?: ClientSession): Promise<BusProvinceDto>;
    findAll(tenantIds: Types.ObjectId[]): Promise<BusProvinceDto[]>;
    findAvailable(tenantIds: Types.ObjectId[]): Promise<BusProvinceDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<BusProvinceDto>;
    update(updateBusProvinceDto: UpdateBusProvinceDto, tenantId: Types.ObjectId): Promise<BusProvinceDto>;
    delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: SearchBusProvincesQuerySortFilter, filters: SearchBusProvincesQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<SearchBusProvincesRes>;
    buildQuerySearchBusProvince(pageIdx: number, pageSize: number, keyword: string, sortBy: SearchBusProvincesQuerySortFilter, filters: SearchBusProvincesQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<any>;
}
