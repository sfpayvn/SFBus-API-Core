import { GoodsService } from './goods-service';
import { CreateGoodsDto } from './dto/create-goods.dto';
import { UpdateGoodsDto } from './dto/update-goods.dto';
import { SearchGoodsPagingQuery } from './dto/goods.dto';
import { Types } from 'mongoose';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
export declare class GoodsController {
    private readonly goodsService;
    constructor(goodsService: GoodsService);
    create(createGoodsDto: CreateGoodsDto, user: UserTokenDto): Promise<import("./dto/goods.dto").GoodsDto>;
    findAll(user: UserTokenDto): Promise<import("./dto/goods.dto").GoodsDto[]>;
    countByStatus(user: UserTokenDto): Promise<Record<string, number>>;
    findOne(id: string, user: UserTokenDto): Promise<import("./dto/goods.dto").GoodsDto>;
    findAllGoodsForBusSchedule(busScheduleId: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/goods.dto").GoodsDto[]>;
    findAllGoodsAvailable(busRouteId: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/goods.dto").GoodsDto[]>;
    update(updateGoodsDto: UpdateGoodsDto, user: UserTokenDto): Promise<import("./dto/goods.dto").GoodsDto & {
        _oldData?: any;
    }>;
    updates(updateGoodsDto: UpdateGoodsDto[], user: UserTokenDto): Promise<(import("./dto/goods.dto").GoodsDto & {
        _oldData?: any;
    })[]>;
    remove(id: string, user: UserTokenDto): Promise<boolean>;
    searchGoodsPaging(query: SearchGoodsPagingQuery, user: UserTokenDto): Promise<import("./dto/goods.dto").SearchGoodsPagingRes>;
}
