import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { PosGoodsService } from './pos-goods-service';
import { Types } from 'mongoose';
import { PosUpdateGoodsDto, PosRequestUpdateGoodsScheduleAssignmentDto } from './dto/pos-update-goods.dto';
import { PosCreateGoodsDto } from './dto/pos-create-goods.dto';
import { PosSearchGoodsPagingQuery } from './dto/pos-goods.dto';
export declare class PosGoodsController {
    private readonly posGoodsService;
    constructor(posGoodsService: PosGoodsService);
    create(PosCreateGoodsDto: PosCreateGoodsDto, user: UserTokenDto): Promise<import("./dto/pos-goods.dto").PosGoodsDto>;
    update(PosUpdateGoodsDto: PosUpdateGoodsDto, user: UserTokenDto): Promise<import("./dto/pos-goods.dto").PosGoodsDto>;
    updates(PosUpdateGoodsDto: PosUpdateGoodsDto[], user: UserTokenDto): Promise<import("./dto/pos-goods.dto").PosGoodsDto[]>;
    remove(id: string, user: UserTokenDto): Promise<boolean>;
    findAll(user: UserTokenDto): Promise<import("./dto/pos-goods.dto").PosGoodsDto[]>;
    findOne(id: string, user: UserTokenDto): Promise<import("../../../core/goods/goods/dto/goods.dto").GoodsDto>;
    findAllGoodsForBusSchedule(busScheduleId: Types.ObjectId, user: UserTokenDto): Promise<import("../../../core/goods/goods/dto/goods.dto").GoodsDto[]>;
    findAllGoodsAvailable(busRouteId: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/pos-goods.dto").PosGoodsDto[]>;
    searchGoodsPaging(query: PosSearchGoodsPagingQuery, user: UserTokenDto): Promise<import("./dto/pos-goods.dto").PosSearchGoodsPagingRes>;
    updatesGoodsScheduleAssignment(posRequestUpdateGoodsScheduleAssignmentDto: PosRequestUpdateGoodsScheduleAssignmentDto[], user: UserTokenDto): Promise<import("./dto/pos-goods.dto").PosGoodsDto[]>;
}
