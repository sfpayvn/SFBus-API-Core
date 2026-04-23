import { BusTemplateService } from '@/module/core/bus/bus-template/bus-template.service';
import { BusTemplateDocument } from '@/module/core/bus/bus-template/schema/bus-template.schema';
import { Model, Types } from 'mongoose';
import { DriverBusTemplateDto, DriverSearchBusTemplateQuerySortFilter, DriverSearchBusTemplateRes } from './dto/driver-bus-template.dto';
export declare class DriverBusTemplateService {
    private readonly busTemplateModel;
    private readonly busTemplateService;
    ROOT_TENANT_ID: string;
    constructor(busTemplateModel: Model<BusTemplateDocument>, busTemplateService: BusTemplateService);
    findAll(tenantIds: Types.ObjectId[]): Promise<DriverBusTemplateDto[]>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: DriverSearchBusTemplateQuerySortFilter, filters: DriverSearchBusTemplateQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<DriverSearchBusTemplateRes>;
}
