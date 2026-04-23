import { Model, Types } from 'mongoose';
import { PromotionDocument } from './schema/promotion.schema';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { PromotionDto, RedeemPromotionDto, SearchPromotionPagingQuerySortFilter, SearchPromotionPagingRes } from './dto/promotion.dto';
import { BookingService } from '../booking/booking-service';
import { PaymentService } from '../payment/payment-service';
export declare class PromotionService {
    private readonly promotionModel;
    private readonly paymentService;
    private readonly bookingService;
    private alphabet;
    private nanoid;
    constructor(promotionModel: Model<PromotionDocument>, paymentService: PaymentService, bookingService: BookingService);
    create(createPromotionDto: CreatePromotionDto, tenantId: Types.ObjectId): Promise<PromotionDto>;
    findAll(tenantIds: Types.ObjectId[]): Promise<PromotionDto[]>;
    findOne(id: string, tenantId: Types.ObjectId): Promise<PromotionDto>;
    findAllByRule(userId: Types.ObjectId, bookingIds: Types.ObjectId[], tenantId: Types.ObjectId): Promise<PromotionDto[]>;
    findMassPromotion(tenantId: Types.ObjectId): Promise<PromotionDto[]>;
    update(updatePromotionDto: UpdatePromotionDto, tenantId: Types.ObjectId): Promise<PromotionDto>;
    updates(updatePromotionDto: UpdatePromotionDto[], tenantId: Types.ObjectId): Promise<PromotionDto[]>;
    remove(id: string, tenantId: Types.ObjectId): Promise<boolean>;
    redeem(redeemPromotionDto: RedeemPromotionDto, tenantId: Types.ObjectId): Promise<boolean>;
    checkRedeemRules(redeemPromotionDto: RedeemPromotionDto, tenantId: Types.ObjectId): Promise<PromotionDto | null>;
    searchPromotionPaging(pageIdx: number, pageSize: number, keyword: string, sortBy: SearchPromotionPagingQuerySortFilter, filters: SearchPromotionPagingQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<SearchPromotionPagingRes>;
    buildQuerySearchPromotionPaging(pageIdx: number, pageSize: number, keyword: string, sortBy: SearchPromotionPagingQuerySortFilter, filters: SearchPromotionPagingQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<any>;
    generatePromotionNumber(): string;
    private mapImageUrl;
}
