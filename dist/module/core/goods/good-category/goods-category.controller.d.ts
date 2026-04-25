import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { CreateGoodsCategoryDto } from './dto/create-goods-category.dto';
import { UpdateGoodsCategoryDto } from './dto/update-goods-category.dto';
import { SearchGoodsCategoryPagingQuery } from './dto/goods-category.dto';
import { GoodsCategoryService } from './goods-category-service';
import { Types } from 'mongoose';
export declare class GoodsCategoryController {
    private readonly goodsCategoryService;
    constructor(goodsCategoryService: GoodsCategoryService);
    create(createGoodsCategoryDto: CreateGoodsCategoryDto, user: UserTokenDto): Promise<import("./dto/goods-category.dto").GoodsCategoryDto>;
    update(updateGoodsCategoryDto: UpdateGoodsCategoryDto, user: UserTokenDto): Promise<import("./dto/goods-category.dto").GoodsCategoryDto>;
    remove(id: string, user: UserTokenDto): Promise<boolean>;
    findByIds(ids: Types.ObjectId[], user: UserTokenDto): Promise<import("./dto/goods-category.dto").GoodsCategoryDto[]>;
    findAll(user: UserTokenDto): Promise<import("./dto/goods-category.dto").GoodsCategoryDto[]>;
    findOne(id: string, user: UserTokenDto): Promise<import("./dto/goods-category.dto").GoodsCategoryDto>;
    searchGoodsCategoryPaging(query: SearchGoodsCategoryPagingQuery, user: UserTokenDto): Promise<import("./dto/goods-category.dto").SearchGoodsPagingRes>;
}
