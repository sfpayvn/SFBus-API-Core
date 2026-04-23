import { GoodsDocument } from '@/module/core/goods/goods/schema/goods.schema';
import { Model, Types } from 'mongoose';
import { GoodsDto } from '@/module/core/goods/goods/dto/goods.dto';
import { GoodsService } from '@/module/core/goods/goods/goods-service';
import { DriverRequestUpdateGoodsBoardingDto } from './dto/driver-update-goods.dto';
import { DriverTrackingService } from '../../driver-tracking/driver-tracking.service';
export declare class DriverGoodsService {
    private readonly goodsModel;
    private readonly goodsService;
    private readonly driverTrackingService;
    private alphabet;
    private nanoid;
    constructor(goodsModel: Model<GoodsDocument>, goodsService: GoodsService, driverTrackingService: DriverTrackingService);
    findAllGoodsForBusSchedule(busScheduleId: Types.ObjectId, tenantId: Types.ObjectId): Promise<GoodsDto[]>;
    findOne(id: string, tenantId: Types.ObjectId): Promise<GoodsDto>;
    updateGoodsScheduleBoarding(driverRequestUpdateGoodsBoardingDto: DriverRequestUpdateGoodsBoardingDto, tenantId: Types.ObjectId, updatedBy: Types.ObjectId): Promise<GoodsDto[]>;
}
