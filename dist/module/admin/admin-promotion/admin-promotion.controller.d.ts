import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { AdminPromotionService } from './admin-promotion-service';
import { AdminCreatePromotionDto } from './dto/admin-create-promotion.dto';
import { AdminRedeemPromotionDto, AdminRequestPromotionByRule, AdminRequestPromotionMass, AdminSearchPromotionPagingQuery } from './dto/admin-promotion.dto';
import { AdminUpdatePromotionDto } from './dto/admin-update-promotion.dto';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class AdminPromotionController {
    private readonly adminPromotionService;
    constructor(adminPromotionService: AdminPromotionService);
    create(adminCreatePromotionDto: AdminCreatePromotionDto, user: UserTokenDto): Promise<import("./dto/admin-promotion.dto").AdminPromotionDto>;
    update(adminUpdatePromotionDto: AdminUpdatePromotionDto, user: UserTokenDto): Promise<import("./dto/admin-promotion.dto").AdminPromotionDto>;
    updates(adminUpdatePromotionDto: AdminUpdatePromotionDto[], user: UserTokenDto): Promise<import("./dto/admin-promotion.dto").AdminPromotionDto[]>;
    remove(id: string, user: UserTokenDto): Promise<boolean>;
    redeem(adminRedeemPromotionDto: AdminRedeemPromotionDto, user: UserTokenDto): Promise<boolean>;
    findAll(tenantScope: TenantScopeResult): Promise<import("./dto/admin-promotion.dto").AdminPromotionDto[]>;
    findOne(id: string, user: UserTokenDto): Promise<import("./dto/admin-promotion.dto").AdminPromotionDto | null>;
    findAllByRule(query: AdminRequestPromotionByRule, user: UserTokenDto): Promise<import("../../core/promotion/dto/promotion.dto").PromotionDto[]>;
    findMassPromotion(query: AdminRequestPromotionMass, user: UserTokenDto): Promise<import("./dto/admin-promotion.dto").AdminPromotionDto[]>;
    searchPromotionPaging(query: AdminSearchPromotionPagingQuery, tenantScope: TenantScopeResult): Promise<import("./dto/admin-promotion.dto").AdminSearchPromotionPagingRes>;
}
