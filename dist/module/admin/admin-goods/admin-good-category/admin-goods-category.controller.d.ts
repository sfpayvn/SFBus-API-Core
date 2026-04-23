import { AdminGoodsCategoryService } from './admin-goods-category-service';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { Types } from 'mongoose';
import { AdminCreateGoodsCategoryDto } from './dto/admin-create-goods-category.dto';
import { AdminSearchGoodsCategoryPagingQuery } from './dto/admin-goods-category.dto';
import { AdminUpdateGoodsCategoryDto } from './dto/admin-update-goods-category.dto';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class AdminGoodsCategoryController {
    private readonly adminGoodsCategoryService;
    constructor(adminGoodsCategoryService: AdminGoodsCategoryService);
    create(adminCreateGoodsCategoryDto: AdminCreateGoodsCategoryDto, user: UserTokenDto): Promise<import("./dto/admin-goods-category.dto").AdminGoodsCategoryDto>;
    update(adminUpdateGoodsCategoryDto: AdminUpdateGoodsCategoryDto, user: UserTokenDto): Promise<import("./dto/admin-goods-category.dto").AdminGoodsCategoryDto>;
    remove(id: string, user: UserTokenDto): Promise<boolean>;
    findByIds(ids: Types.ObjectId[], tenantScope: TenantScopeResult): Promise<import("./dto/admin-goods-category.dto").AdminGoodsCategoryDto[]>;
    findAll(user: UserTokenDto): Promise<import("./dto/admin-goods-category.dto").AdminGoodsCategoryDto[]>;
    findOne(id: string, user: UserTokenDto): Promise<import("./dto/admin-goods-category.dto").AdminGoodsCategoryDto>;
    searchGoodsCategoryPaging(query: AdminSearchGoodsCategoryPagingQuery, user: UserTokenDto): Promise<import("./dto/admin-goods-category.dto").AdminSearchGoodsPagingRes>;
}
