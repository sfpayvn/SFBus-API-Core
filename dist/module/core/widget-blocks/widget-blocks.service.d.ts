import { Model, Types } from 'mongoose';
import { CreateWidgetBlockDto } from './dto/create-widget-block.dto';
import { UpdateWidgetBlockDto } from './dto/update-widget-block.dto';
import { WidgetBlockDocument } from './schemas/widget-block.schema';
import { SearchWidgetBlockQuerySortFilter, SearchWidgetBlocksResultDto, WidgetBlockDto } from './dto/widget-block.dto';
export declare class WidgetBlocksService {
    private readonly widgetBlockModel;
    constructor(widgetBlockModel: Model<WidgetBlockDocument>);
    create(createWidgetBlockDto: CreateWidgetBlockDto, tenantId: Types.ObjectId): Promise<any>;
    update(updateWidgetBlockDto: UpdateWidgetBlockDto, tenantId: Types.ObjectId): Promise<any>;
    delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean>;
    findAll(tenantIds: Types.ObjectId[]): Promise<any[]>;
    findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<any | null>;
    findByCode(code: string, tenantId: Types.ObjectId): Promise<any>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: SearchWidgetBlockQuerySortFilter, filters: SearchWidgetBlockQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<SearchWidgetBlocksResultDto>;
    buildQuerySearchWidgetBlocks(pageIdx: number, pageSize: number, tenantIds: Types.ObjectId[], keyword: string, sortBy: SearchWidgetBlockQuerySortFilter, filters: SearchWidgetBlockQuerySortFilter[]): Promise<any>;
    validateWidgetBlock(code: string, tenantId: Types.ObjectId): Promise<any | null>;
    mapImageUrl(widgetBlocks: WidgetBlockDto[]): Promise<WidgetBlockDto[]>;
}
