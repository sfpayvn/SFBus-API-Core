import { Model, Types } from 'mongoose';
import { PromotionDocument } from '@/module/core/promotion/schema/promotion.schema';
import { PromotionService } from '@/module/core/promotion/promotion-service';
import { PromotionDto } from '@/module/core/promotion/dto/promotion.dto';
import { PosRedeemPromotionDto, PosPromotionDto } from './dto/pos-promotion.dto';
export declare class PosPromotionService {
    private readonly promotionModel;
    private readonly promotionService;
    constructor(promotionModel: Model<PromotionDocument>, promotionService: PromotionService);
    redeem(PosRedeemPromotionDto: PosRedeemPromotionDto, tenantId: Types.ObjectId): Promise<boolean>;
    findAll(tenantIds: Types.ObjectId[]): Promise<PosPromotionDto[]>;
    findOne(id: string, tenantId: Types.ObjectId): Promise<PosPromotionDto | null>;
    findAllByRule(userId: Types.ObjectId, bookingIds: Types.ObjectId[], tenantId: Types.ObjectId): Promise<PromotionDto[]>;
    findMassPromotion(tenantId: Types.ObjectId): Promise<PosPromotionDto[]>;
}
