import { Model, Types } from 'mongoose';
import { GoodsCategoryDocument } from './schema/goods.-categoryschema';
import { CreateGoodsCategoryDto } from './dto/create-goods-category.dto';
import { UpdateGoodsCategoryDto } from './dto/update-goods-category.dto';
import { SearchGoodsCategoryPagingQuerySortFilter, SearchGoodsPagingRes } from './dto/goods-category.dto';
import { GoodsCategoryDto } from './dto/goods-category.dto';
export declare class GoodsCategoryService {
    private readonly goodsCategoryModel;
    private alphabet;
    private nanoid;
    constructor(goodsCategoryModel: Model<GoodsCategoryDocument>);
    create(createGoodsCategoryDto: CreateGoodsCategoryDto, tenantId: Types.ObjectId): Promise<GoodsCategoryDto>;
    update(updateGoodsCategoryDto: UpdateGoodsCategoryDto, tenantId: Types.ObjectId): Promise<GoodsCategoryDto>;
    remove(id: string, tenantId: Types.ObjectId): Promise<boolean>;
    findByIds(ids: Types.ObjectId[], tenantIds: Types.ObjectId[]): Promise<GoodsCategoryDto[]>;
    findAll(tenantId: Types.ObjectId): Promise<GoodsCategoryDto[]>;
    findOne(id: string, tenantId: Types.ObjectId): Promise<GoodsCategoryDto>;
    searchGoodsCategoryPaging(pageIdx: number, pageSize: number, keyword: string, sortBy: SearchGoodsCategoryPagingQuerySortFilter, filters: SearchGoodsCategoryPagingQuerySortFilter[], tenantId: Types.ObjectId): Promise<SearchGoodsPagingRes>;
    buildQuerySearchGoodsCategoryPaging(pageIdx: number, pageSize: number, keyword: string, sortBy: SearchGoodsCategoryPagingQuerySortFilter, filters: SearchGoodsCategoryPagingQuerySortFilter[], tenantId: Types.ObjectId): Promise<any>;
    generateGoodsNumber(): string;
    mapImageUrl(goodsCategories: GoodsCategoryDto[]): Promise<GoodsCategoryDto[]>;
}
