import { BusProvinceService } from '@/module/core/bus/bus-province/bus-province.service';
import { BusProvinceDocument } from '@/module/core/bus/bus-province/schema/bus-schema.schema';
import { Model, Types } from 'mongoose';
import { ClientBusProvinceDto, ClientSearchBusProvincesQuerySortFilter, ClientSearchBusProvincesRes } from './dto/client-bus-province.dto';
export declare class ClientBusProvinceService {
    private readonly busProvinceModel;
    private readonly busProvinceService;
    ROOT_TENANT_ID: string;
    constructor(busProvinceModel: Model<BusProvinceDocument>, busProvinceService: BusProvinceService);
    findAll(tenantIds: Types.ObjectId[]): Promise<ClientBusProvinceDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<ClientBusProvinceDto>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: ClientSearchBusProvincesQuerySortFilter, filters: ClientSearchBusProvincesQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<ClientSearchBusProvincesRes>;
}
