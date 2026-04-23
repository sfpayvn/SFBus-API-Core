import { GoodsCategoryService } from '@/module/core/goods/good-category/goods-category-service';
import { GoodsCategoryDocument } from '@/module/core/goods/good-category/schema/goods.-categoryschema';
import { Model, Types } from 'mongoose';
import { AdminGoodsCategoryDto, AdminSearchGoodsCategoryPagingQuerySortFilter, AdminSearchGoodsPagingRes } from './dto/admin-goods-category.dto';
import { AdminCreateGoodsCategoryDto } from './dto/admin-create-goods-category.dto';
import { AdminUpdateGoodsCategoryDto } from './dto/admin-update-goods-category.dto';
export declare class AdminGoodsCategoryService {
    private readonly goodsCategoryModel;
    private readonly goodsCategoryService;
    private alphabet;
    private nanoid;
    constructor(goodsCategoryModel: Model<GoodsCategoryDocument>, goodsCategoryService: GoodsCategoryService);
    create(adminCreateGoodsCategoryDto: AdminCreateGoodsCategoryDto, tenantId: Types.ObjectId): Promise<AdminGoodsCategoryDto>;
    update(adminUpdateGoodsCategoryDto: AdminUpdateGoodsCategoryDto, tenantId: Types.ObjectId): Promise<AdminGoodsCategoryDto>;
    remove(id: string, tenantId: Types.ObjectId): Promise<boolean>;
    findByIds(ids: Types.ObjectId[], tenantId: Types.ObjectId, rootTenantId: Types.ObjectId): Promise<AdminGoodsCategoryDto[]>;
    findAll(tenantId: Types.ObjectId): Promise<AdminGoodsCategoryDto[]>;
    findOne(id: string, tenantId: Types.ObjectId): Promise<AdminGoodsCategoryDto>;
    searchGoodsCategoryPaging(pageIdx: number, pageSize: number, keyword: string, sortBy: AdminSearchGoodsCategoryPagingQuerySortFilter, filters: AdminSearchGoodsCategoryPagingQuerySortFilter[], tenantId: Types.ObjectId): Promise<AdminSearchGoodsPagingRes>;
}
