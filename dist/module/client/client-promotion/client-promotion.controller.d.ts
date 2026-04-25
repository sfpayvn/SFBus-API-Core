import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { ClientPromotionService } from './client-promotion-service';
import { ClientRedeemPromotionDto, ClientRequestPromotionByRule, ClientRequestPromotionMass } from './dto/client-promotion.dto';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class ClientPromotionController {
    private readonly ClientPromotionService;
    constructor(ClientPromotionService: ClientPromotionService);
    redeem(ClientRedeemPromotionDto: ClientRedeemPromotionDto, user: UserTokenDto): Promise<boolean>;
    findAll(tenantScope: TenantScopeResult): Promise<import("./dto/client-promotion.dto").ClientPromotionDto[]>;
    findOne(id: string, user: UserTokenDto): Promise<import("./dto/client-promotion.dto").ClientPromotionDto | null>;
    findAllByRule(query: ClientRequestPromotionByRule, user: UserTokenDto): Promise<import("../../core/promotion/dto/promotion.dto").PromotionDto[]>;
    findMassPromotion(query: ClientRequestPromotionMass, user: UserTokenDto): Promise<import("./dto/client-promotion.dto").ClientPromotionDto[]>;
}
