import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { PosPromotionService } from './pos-promotion-service';
import { PosRedeemPromotionDto, PosRequestPromotionByRule, PosRequestPromotionMass } from './dto/pos-promotion.dto';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class PosPromotionController {
    private readonly PosPromotionService;
    constructor(PosPromotionService: PosPromotionService);
    redeem(PosRedeemPromotionDto: PosRedeemPromotionDto, user: UserTokenDto): Promise<boolean>;
    findAll(tenantScope: TenantScopeResult): Promise<import("./dto/pos-promotion.dto").PosPromotionDto[]>;
    findOne(id: string, user: UserTokenDto): Promise<import("./dto/pos-promotion.dto").PosPromotionDto | null>;
    findAllByRule(query: PosRequestPromotionByRule, user: UserTokenDto): Promise<import("../../core/promotion/dto/promotion.dto").PromotionDto[]>;
    findMassPromotion(query: PosRequestPromotionMass, user: UserTokenDto): Promise<import("./dto/pos-promotion.dto").PosPromotionDto[]>;
}
