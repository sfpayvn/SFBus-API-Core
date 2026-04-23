import { BusTemplateService } from '@/module/core/bus/bus-template/bus-template.service';
import { BusTemplateDocument } from '@/module/core/bus/bus-template/schema/bus-template.schema';
import { Model, Types } from 'mongoose';
import { AdminBusTemplateDto, AdminSearchBusTemplateQuerySortFilter, AdminSearchBusTemplateRes } from './dto/admin-bus-template.dto';
import { AdminCreateBusTemplateDto } from './dto/admin-create-bus-template.dto';
import { AdminUpdateBusTemplateDto } from './dto/admin-update-bus-template.dto';
export declare class AdminBusTemplateService {
    private readonly busTemplateModel;
    private readonly busTemplateService;
    ROOT_TENANT_ID: string;
    constructor(busTemplateModel: Model<BusTemplateDocument>, busTemplateService: BusTemplateService);
    create(adminCreateBusTemplateDto: AdminCreateBusTemplateDto, tenantId: Types.ObjectId): Promise<AdminBusTemplateDto>;
    update(adminUpdateBusTemplateDto: AdminUpdateBusTemplateDto, tenantId: Types.ObjectId): Promise<AdminBusTemplateDto>;
    delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean>;
    findAll(tenantIds: Types.ObjectId[]): Promise<AdminBusTemplateDto[]>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: AdminSearchBusTemplateQuerySortFilter, filters: AdminSearchBusTemplateQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<AdminSearchBusTemplateRes>;
}
