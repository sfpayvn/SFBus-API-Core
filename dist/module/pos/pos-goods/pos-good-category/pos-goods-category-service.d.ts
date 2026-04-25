import { GoodsCategoryService } from '@/module/core/goods/good-category/goods-category-service';
import { GoodsCategoryDocument } from '@/module/core/goods/good-category/schema/goods.-categoryschema';
import { Model, Types } from 'mongoose';
import { PosGoodsCategoryDto, PosSearchGoodsCategoryPagingQuerySortFilter, PosSearchGoodsPagingRes } from './dto/pos-goods-category.dto';
import { PosCreateGoodsCategoryDto } from './dto/pos-create-goods-category.dto';
import { PosUpdateGoodsCategoryDto } from './dto/pos-update-goods-category.dto';
export declare class PosGoodsCategoryService {
    private readonly goodsCategoryModel;
    private readonly goodsCategoryService;
    private alphabet;
    private nanoid;
    constructor(goodsCategoryModel: Model<GoodsCategoryDocument>, goodsCategoryService: GoodsCategoryService);
    create(PosCreateGoodsCategoryDto: PosCreateGoodsCategoryDto, tenantId: Types.ObjectId): Promise<PosGoodsCategoryDto>;
    update(PosUpdateGoodsCategoryDto: PosUpdateGoodsCategoryDto, tenantId: Types.ObjectId): Promise<PosGoodsCategoryDto>;
    remove(id: string, tenantId: Types.ObjectId): Promise<boolean>;
    findByIds(ids: Types.ObjectId[], tenantId: Types.ObjectId, rootTenantId: Types.ObjectId): Promise<PosGoodsCategoryDto[]>;
    findAll(tenantId: Types.ObjectId): Promise<PosGoodsCategoryDto[]>;
    findOne(id: string, tenantId: Types.ObjectId): Promise<PosGoodsCategoryDto>;
    searchGoodsCategoryPaging(pageIdx: number, pageSize: number, keyword: string, sortBy: PosSearchGoodsCategoryPagingQuerySortFilter, filters: PosSearchGoodsCategoryPagingQuerySortFilter[], tenantId: Types.ObjectId): Promise<PosSearchGoodsPagingRes>;
}
