import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { AdminGoodsService } from './admin-goods-service';
import { Types } from 'mongoose';
import { AdminUpdateGoodsDto } from './dto/admin-update-goods.dto';
import { AdminCreateGoodsDto } from './dto/admin-create-goods.dto';
import { AdminSearchGoodsPagingQuery } from './dto/admin-goods.dto';
export declare class AdminGoodsController {
    private readonly adminGoodsService;
    constructor(adminGoodsService: AdminGoodsService);
    create(adminCreateGoodsDto: AdminCreateGoodsDto, user: UserTokenDto): Promise<import("./dto/admin-goods.dto").AdminGoodsDto>;
    update(adminUpdateGoodsDto: AdminUpdateGoodsDto, user: UserTokenDto): Promise<import("./dto/admin-goods.dto").AdminGoodsDto>;
    updates(adminUpdateGoodsDto: AdminUpdateGoodsDto[], user: UserTokenDto): Promise<import("./dto/admin-goods.dto").AdminGoodsDto[]>;
    remove(id: string, user: UserTokenDto): Promise<boolean>;
    findAll(user: UserTokenDto): Promise<import("./dto/admin-goods.dto").AdminGoodsDto[]>;
    findOne(id: string, user: UserTokenDto): Promise<import("../../../core/goods/goods/dto/goods.dto").GoodsDto>;
    findAllGoodsForBusSchedule(busScheduleId: Types.ObjectId, user: UserTokenDto): Promise<import("../../../core/goods/goods/dto/goods.dto").GoodsDto[]>;
    findAllGoodsAvailable(busRouteId: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/admin-goods.dto").AdminGoodsDto[]>;
    searchGoodsPaging(query: AdminSearchGoodsPagingQuery, user: UserTokenDto): Promise<import("./dto/admin-goods.dto").AdminSearchGoodsPagingRes>;
}
