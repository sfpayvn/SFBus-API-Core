import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { DriverPromotionService } from './driver-promotion-service';
import { DriverRedeemPromotionDto, DriverRequestPromotionByRule, DriverRequestPromotionMass } from './dto/driver-promotion.dto';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class DriverPromotionController {
    private readonly DriverPromotionService;
    constructor(DriverPromotionService: DriverPromotionService);
    redeem(DriverRedeemPromotionDto: DriverRedeemPromotionDto, user: UserTokenDto): Promise<boolean>;
    findAll(tenantScope: TenantScopeResult): Promise<import("./dto/driver-promotion.dto").DriverPromotionDto[]>;
    findOne(id: string, user: UserTokenDto): Promise<import("./dto/driver-promotion.dto").DriverPromotionDto | null>;
    findAllByRule(query: DriverRequestPromotionByRule, user: UserTokenDto): Promise<import("../../core/promotion/dto/promotion.dto").PromotionDto[]>;
    findMassPromotion(query: DriverRequestPromotionMass, user: UserTokenDto): Promise<import("./dto/driver-promotion.dto").DriverPromotionDto[]>;
}
