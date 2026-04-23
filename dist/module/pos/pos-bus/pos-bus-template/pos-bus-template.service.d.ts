import { BusTemplateService } from '@/module/core/bus/bus-template/bus-template.service';
import { BusTemplateDocument } from '@/module/core/bus/bus-template/schema/bus-template.schema';
import { Model, Types } from 'mongoose';
import { PosBusTemplateDto, PosSearchBusTemplateQuerySortFilter, PosSearchBusTemplateRes } from './dto/pos-bus-template.dto';
export declare class PosBusTemplateService {
    private readonly busTemplateModel;
    private readonly busTemplateService;
    ROOT_TENANT_ID: string;
    constructor(busTemplateModel: Model<BusTemplateDocument>, busTemplateService: BusTemplateService);
    findAll(tenantIds: Types.ObjectId[]): Promise<PosBusTemplateDto[]>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: PosSearchBusTemplateQuerySortFilter, filters: PosSearchBusTemplateQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<PosSearchBusTemplateRes>;
}
