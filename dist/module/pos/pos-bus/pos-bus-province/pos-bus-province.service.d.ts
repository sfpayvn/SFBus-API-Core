import { BusProvinceService } from '@/module/core/bus/bus-province/bus-province.service';
import { BusProvinceDocument } from '@/module/core/bus/bus-province/schema/bus-schema.schema';
import { Model, Types } from 'mongoose';
import { PosBusProvinceDto, PosSearchBusProvincesQuerySortFilter, PosSearchBusProvincesRes } from './dto/pos-bus-province.dto';
export declare class PosBusProvinceService {
    private readonly busProvinceModel;
    private readonly busProvinceService;
    ROOT_TENANT_ID: string;
    constructor(busProvinceModel: Model<BusProvinceDocument>, busProvinceService: BusProvinceService);
    findAll(tenantIds: Types.ObjectId[]): Promise<PosBusProvinceDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<PosBusProvinceDto>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: PosSearchBusProvincesQuerySortFilter, filters: PosSearchBusProvincesQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<PosSearchBusProvincesRes>;
}
