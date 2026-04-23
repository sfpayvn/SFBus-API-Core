import { BusLayoutTemplateDto, SearchBusLayoutTemplateQuerySortFilter } from '@/module/core/bus/bus-layout-template/dto/bus-layout-template.dto';
import { BusLayoutTemplateDocument } from '@/module/core/bus/bus-layout-template/schema/bus-layout-template.schema';
import { Model, Types } from 'mongoose';
import { AdminBusLayoutTemplateDto, AdminSearchBusTemplateRes } from './dto/admin-bus-layout-template.dto';
import { AdminCreateBusLayoutTemplateDto } from './dto/admin-create-bus-layout-template.dto';
import { AdminUpdateBusLayoutTemplateDto } from './dto/admin-update-bus-layout-template.dto';
import { BusLayoutTemplateService } from '@/module/core/bus/bus-layout-template/bus-layout-template.service';
export declare class AdminBusLayoutTemplateService {
    private busLayoutTemplateModel;
    private readonly busLayoutTemplateService;
    ROOT_TENANT_ID: string;
    constructor(busLayoutTemplateModel: Model<BusLayoutTemplateDocument>, busLayoutTemplateService: BusLayoutTemplateService);
    create(adminCreateBusLayoutTemplateDto: AdminCreateBusLayoutTemplateDto, tenantId: Types.ObjectId): Promise<AdminBusLayoutTemplateDto>;
    findAll(tenantIds: Types.ObjectId[]): Promise<BusLayoutTemplateDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<AdminBusLayoutTemplateDto>;
    update(adminUpdateBusLayoutTemplateDto: AdminUpdateBusLayoutTemplateDto, tenantId: Types.ObjectId): Promise<AdminBusLayoutTemplateDto>;
    delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: SearchBusLayoutTemplateQuerySortFilter, filters: SearchBusLayoutTemplateQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<AdminSearchBusTemplateRes>;
}
