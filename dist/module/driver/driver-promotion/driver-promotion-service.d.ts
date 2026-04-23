import { Model, Types } from 'mongoose';
import { PromotionDocument } from '@/module/core/promotion/schema/promotion.schema';
import { PromotionService } from '@/module/core/promotion/promotion-service';
import { PromotionDto } from '@/module/core/promotion/dto/promotion.dto';
import { DriverRedeemPromotionDto, DriverPromotionDto } from './dto/driver-promotion.dto';
export declare class DriverPromotionService {
    private readonly promotionModel;
    private readonly promotionService;
    constructor(promotionModel: Model<PromotionDocument>, promotionService: PromotionService);
    redeem(DriverRedeemPromotionDto: DriverRedeemPromotionDto, tenantId: Types.ObjectId): Promise<boolean>;
    findAll(tenantIds: Types.ObjectId[]): Promise<DriverPromotionDto[]>;
    findOne(id: string, tenantId: Types.ObjectId): Promise<DriverPromotionDto | null>;
    findAllByRule(userId: Types.ObjectId, bookingIds: Types.ObjectId[], tenantId: Types.ObjectId): Promise<PromotionDto[]>;
    findMassPromotion(tenantId: Types.ObjectId): Promise<DriverPromotionDto[]>;
}
