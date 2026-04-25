import { Types } from 'mongoose';
import { ContentLayoutService } from '@/module/core/content-layout/content-layout.service';
import { AdminUpdateContentLayoutDto } from './dto/admin-update-content-layout.dto';
import { AdminSearchContentLayoutsResultDto, AdminContentLayoutDto } from './dto/admin-content-layout.dto';
import { AdminCreateContentLayoutDto } from './dto/admin-create-content-layout.dto';
export declare class AdminContentLayoutService {
    private readonly contentLayoutService;
    constructor(contentLayoutService: ContentLayoutService);
    create(createContentLayoutDto: AdminCreateContentLayoutDto, tenantId: Types.ObjectId): Promise<AdminContentLayoutDto>;
    update(updateContentLayoutDto: AdminUpdateContentLayoutDto, tenantId: Types.ObjectId): Promise<AdminContentLayoutDto>;
    remove(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean>;
    findAll(tenantIds: Types.ObjectId[]): Promise<AdminContentLayoutDto[]>;
    findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<AdminContentLayoutDto | null>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: any, filters: any[], tenantIds: Types.ObjectId[]): Promise<AdminSearchContentLayoutsResultDto>;
}
