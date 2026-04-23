import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { PromotionService } from './promotion-service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { RedeemPromotionDto, RequestPromotionByRule, RequestPromotionMass, SearchPromotionPagingQuery } from './dto/promotion.dto';
export declare class PromotionController {
    private readonly promotionService;
    constructor(promotionService: PromotionService);
    create(createPromotionDto: CreatePromotionDto, user: UserTokenDto): Promise<import("./dto/promotion.dto").PromotionDto>;
    findAll(user: UserTokenDto): Promise<import("./dto/promotion.dto").PromotionDto[]>;
    findOne(id: string, user: UserTokenDto): Promise<import("./dto/promotion.dto").PromotionDto>;
    findAllByRule(query: RequestPromotionByRule, user: UserTokenDto): Promise<import("./dto/promotion.dto").PromotionDto[]>;
    findMassPromotion(query: RequestPromotionMass, user: UserTokenDto): Promise<import("./dto/promotion.dto").PromotionDto[]>;
    update(updatePromotionDto: UpdatePromotionDto, user: UserTokenDto): Promise<import("./dto/promotion.dto").PromotionDto>;
    updates(updatePromotionDto: UpdatePromotionDto[], user: UserTokenDto): Promise<import("./dto/promotion.dto").PromotionDto[]>;
    remove(id: string, user: UserTokenDto): Promise<boolean>;
    redeem(redeemPromotionDto: RedeemPromotionDto, user: UserTokenDto): Promise<boolean>;
    searchPromotionPaging(query: SearchPromotionPagingQuery, user: UserTokenDto): Promise<import("./dto/promotion.dto").SearchPromotionPagingRes>;
}
