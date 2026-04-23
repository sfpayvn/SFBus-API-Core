import { Types } from 'mongoose';
import { WidgetBlocksService } from '@/module/core/widget-blocks/widget-blocks.service';
import { AdminUpdateWidgetBlockDto } from './dto/admin-update-widget-block.dto';
import { AdminSearchWidgetBlocksResultDto, AdminWidgetBlockDto } from './dto/admin-widget-block.dto';
export declare class AdminWidgetBlocksService {
    private readonly widgetBlocksService;
    constructor(widgetBlocksService: WidgetBlocksService);
    create(createWidgetBlockDto: any, tenantId: Types.ObjectId): Promise<AdminWidgetBlockDto>;
    update(updateWidgetBlockDto: AdminUpdateWidgetBlockDto, tenantId: Types.ObjectId): Promise<AdminWidgetBlockDto>;
    remove(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean>;
    findAll(tenantIds: Types.ObjectId[]): Promise<AdminWidgetBlockDto[]>;
    findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<AdminWidgetBlockDto>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: any, filters: any[], tenantIds: Types.ObjectId[]): Promise<AdminSearchWidgetBlocksResultDto>;
}
