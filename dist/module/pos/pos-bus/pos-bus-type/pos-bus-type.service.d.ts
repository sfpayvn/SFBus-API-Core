import { Model, Types } from 'mongoose';
import { BusTypeDocument } from '@/module/core/bus/bus-type/schema/bus-type.schema';
import { BusTypeService } from '@/module/core/bus/bus-type/bus-type.service';
import { PosBusTypeDto, PosSearchBusTypesQuerySortFilter, PosSearchBusTypesRes } from './dto/pos-bus-type.dto';
export declare class PosBusTypeService {
    private readonly busTypeModel;
    private readonly busTypeService;
    ROOT_TENANT_ID: string;
    constructor(busTypeModel: Model<BusTypeDocument>, busTypeService: BusTypeService);
    findAll(tenantIds: Types.ObjectId[]): Promise<PosBusTypeDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<PosBusTypeDto>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: PosSearchBusTypesQuerySortFilter, filters: PosSearchBusTypesQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<PosSearchBusTypesRes>;
}
