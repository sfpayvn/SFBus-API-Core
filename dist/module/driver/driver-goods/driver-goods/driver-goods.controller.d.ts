import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { DriverGoodsService } from './driver-goods-service';
import { Types } from 'mongoose';
import { DriverRequestUpdateGoodsBoardingDto } from './dto/driver-update-goods.dto';
export declare class DriverGoodsController {
    private readonly driverGoodsService;
    constructor(driverGoodsService: DriverGoodsService);
    findAllGoodsForBusSchedule(busScheduleId: Types.ObjectId, user: UserTokenDto): Promise<import("../../../core/goods/goods/dto/goods.dto").GoodsDto[]>;
    findOne(id: string, user: UserTokenDto): Promise<import("../../../core/goods/goods/dto/goods.dto").GoodsDto>;
    updates(driverRequestUpdateGoodsBoardingDto: DriverRequestUpdateGoodsBoardingDto, user: UserTokenDto): Promise<import("../../../core/goods/goods/dto/goods.dto").GoodsDto[]>;
}
