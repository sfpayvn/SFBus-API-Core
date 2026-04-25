import { BusProvinceService } from '@/module/core/bus/bus-province/bus-province.service';
import { BusProvinceDocument } from '@/module/core/bus/bus-province/schema/bus-schema.schema';
import { Model, Types } from 'mongoose';
import { DriverBusProvinceDto, DriverSearchBusProvincesQuerySortFilter, DriverSearchBusProvincesRes } from './dto/driver-bus-province.dto';
export declare class DriverBusProvinceService {
    private readonly busProvinceModel;
    private readonly busProvinceService;
    ROOT_TENANT_ID: string;
    constructor(busProvinceModel: Model<BusProvinceDocument>, busProvinceService: BusProvinceService);
    findAll(tenantIds: Types.ObjectId[]): Promise<DriverBusProvinceDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<DriverBusProvinceDto>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: DriverSearchBusProvincesQuerySortFilter, filters: DriverSearchBusProvincesQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<DriverSearchBusProvincesRes>;
}
