import { Model, Types } from 'mongoose';
import { ContentLayoutDocument } from './schemas/content-layout.schema';
import { ContentLayoutDto, SearchContentLayoutQuerySortFilter, SearchContentLayoutsResultDto } from './dto/content-layout.dto';
import { CreateContentLayoutDto } from './dto/create-content-layout.dto';
import { UpdateContentLayoutDto } from './dto/update-content-layout.dto';
export declare class ContentLayoutService {
    private contentLayoutModel;
    constructor(contentLayoutModel: Model<ContentLayoutDocument>);
    create(createContentLayoutDto: CreateContentLayoutDto, tenantId: Types.ObjectId): Promise<ContentLayoutDto>;
    update(updateContentLayoutDto: UpdateContentLayoutDto, tenantId: Types.ObjectId): Promise<ContentLayoutDto>;
    delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean>;
    findAll(tenantIds: Types.ObjectId[]): Promise<ContentLayoutDto[]>;
    findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<ContentLayoutDto | null>;
    findByCode(code: string, tenantId: Types.ObjectId): Promise<ContentLayoutDto>;
    findAvailableSlug(appSource: string, platform: string, tenantId: Types.ObjectId): Promise<string[]>;
    findAvailableBySlug(appSource: string, platform: string, slug: string, tenantId: Types.ObjectId): Promise<ContentLayoutDto>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: SearchContentLayoutQuerySortFilter, filters: SearchContentLayoutQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<SearchContentLayoutsResultDto>;
    buildQuerySearchContentLayouts(pageIdx: number, pageSize: number, tenantIds: Types.ObjectId[], keyword: string, sortBy: SearchContentLayoutQuerySortFilter, filters: SearchContentLayoutQuerySortFilter[]): Promise<any>;
    validateContentLayout(code: string, tenantId: Types.ObjectId): Promise<any | null>;
    mapImageUrl(contentLayouts: ContentLayoutDto[]): Promise<ContentLayoutDto[]>;
    handleImageUpdates(oldImageId: Types.ObjectId, newImageId: Types.ObjectId, slug: string, tenantId: Types.ObjectId): Promise<void>;
    private deleteImage;
}
