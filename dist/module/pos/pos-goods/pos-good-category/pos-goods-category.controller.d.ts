import { PosGoodsCategoryService } from './pos-goods-category-service';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { Types } from 'mongoose';
import { PosCreateGoodsCategoryDto } from './dto/pos-create-goods-category.dto';
import { PosSearchGoodsCategoryPagingQuery } from './dto/pos-goods-category.dto';
import { PosUpdateGoodsCategoryDto } from './dto/pos-update-goods-category.dto';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class PosGoodsCategoryController {
    private readonly PosGoodsCategoryService;
    constructor(PosGoodsCategoryService: PosGoodsCategoryService);
    create(PosCreateGoodsCategoryDto: PosCreateGoodsCategoryDto, user: UserTokenDto): Promise<import("./dto/pos-goods-category.dto").PosGoodsCategoryDto>;
    update(PosUpdateGoodsCategoryDto: PosUpdateGoodsCategoryDto, user: UserTokenDto): Promise<import("./dto/pos-goods-category.dto").PosGoodsCategoryDto>;
    remove(id: string, user: UserTokenDto): Promise<boolean>;
    findByIds(ids: Types.ObjectId[], tenantScope: TenantScopeResult): Promise<import("./dto/pos-goods-category.dto").PosGoodsCategoryDto[]>;
    findAll(user: UserTokenDto): Promise<import("./dto/pos-goods-category.dto").PosGoodsCategoryDto[]>;
    findOne(id: string, user: UserTokenDto): Promise<import("./dto/pos-goods-category.dto").PosGoodsCategoryDto>;
    searchGoodsCategoryPaging(query: PosSearchGoodsCategoryPagingQuery, user: UserTokenDto): Promise<import("./dto/pos-goods-category.dto").PosSearchGoodsPagingRes>;
}
