import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { AdminWidgetBlocksService } from './admin-widget-blocks.service';
import { AdminSearchWidgetBlockQuery } from './dto/admin-widget-block.dto';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
import { Types } from 'mongoose';
export declare class AdminWidgetBlocksController {
    private readonly adminWidgetBlocksService;
    constructor(adminWidgetBlocksService: AdminWidgetBlocksService);
    create(createWidgetBlockDto: any, user: UserTokenDto): Promise<import("./dto/admin-widget-block.dto").AdminWidgetBlockDto>;
    update(updateWidgetBlockDto: any, user: UserTokenDto): Promise<import("./dto/admin-widget-block.dto").AdminWidgetBlockDto>;
    remove(id: Types.ObjectId, user: UserTokenDto): Promise<boolean>;
    findAll(tenantScope: TenantScopeResult): Promise<import("./dto/admin-widget-block.dto").AdminWidgetBlockDto[]>;
    findOne(id: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/admin-widget-block.dto").AdminWidgetBlockDto>;
    search(query: AdminSearchWidgetBlockQuery, tenantScope: TenantScopeResult): Promise<import("./dto/admin-widget-block.dto").AdminSearchWidgetBlocksResultDto>;
}
