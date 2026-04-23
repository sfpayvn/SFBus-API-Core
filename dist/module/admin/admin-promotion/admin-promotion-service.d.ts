import { Model, Types } from 'mongoose';
import { PromotionDocument } from '@/module/core/promotion/schema/promotion.schema';
import { PromotionService } from '@/module/core/promotion/promotion-service';
import { PromotionDto } from '@/module/core/promotion/dto/promotion.dto';
import { AdminCreatePromotionDto } from './dto/admin-create-promotion.dto';
import { AdminRedeemPromotionDto, AdminPromotionDto, AdminSearchPromotionPagingQuerySortFilter, AdminSearchPromotionPagingRes } from './dto/admin-promotion.dto';
import { AdminUpdatePromotionDto } from './dto/admin-update-promotion.dto';
export declare class AdminPromotionService {
    private readonly promotionModel;
    private readonly promotionService;
    private alphabet;
    private nanoid;
    constructor(promotionModel: Model<PromotionDocument>, promotionService: PromotionService);
    create(adminCreatePromotionDto: AdminCreatePromotionDto, tenantId: Types.ObjectId): Promise<AdminPromotionDto>;
    update(adminUpdatePromotionDto: AdminUpdatePromotionDto, tenantId: Types.ObjectId): Promise<AdminPromotionDto>;
    updates(adminUpdatePromotionDto: AdminUpdatePromotionDto[], tenantId: Types.ObjectId): Promise<AdminPromotionDto[]>;
    remove(id: string, tenantId: Types.ObjectId): Promise<boolean>;
    redeem(adminRedeemPromotionDto: AdminRedeemPromotionDto, tenantId: Types.ObjectId): Promise<boolean>;
    findAll(tenantIds: Types.ObjectId[]): Promise<AdminPromotionDto[]>;
    findOne(id: string, tenantId: Types.ObjectId): Promise<AdminPromotionDto | null>;
    findAllByRule(userId: Types.ObjectId, bookingIds: Types.ObjectId[], tenantId: Types.ObjectId): Promise<PromotionDto[]>;
    findMassPromotion(tenantId: Types.ObjectId): Promise<AdminPromotionDto[]>;
    searchPromotionPaging(pageIdx: number, pageSize: number, keyword: string, sortBy: AdminSearchPromotionPagingQuerySortFilter, filters: AdminSearchPromotionPagingQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<AdminSearchPromotionPagingRes>;
}
