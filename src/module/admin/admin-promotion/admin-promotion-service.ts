import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { customAlphabet } from 'nanoid';
import { PromotionDocument } from '@/module/core/promotion/schema/promotion.schema';
import { PromotionService } from '@/module/core/promotion/promotion-service';
import { PromotionDto } from '@/module/core/promotion/dto/promotion.dto';
import { AdminCreatePromotionDto } from './dto/admin-create-promotion.dto';
import {
  AdminRedeemPromotionDto,
  AdminPromotionDto,
  AdminSearchPromotionPagingQuerySortFilter,
  AdminSearchPromotionPagingRes,
} from './dto/admin-promotion.dto';
import { AdminUpdatePromotionDto } from './dto/admin-update-promotion.dto';

@Injectable()
export class AdminPromotionService {
  private alphabet = process.env.ALPHABET || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  private nanoid = customAlphabet(this.alphabet, 6);

  constructor(
    @InjectModel(PromotionDocument.name) private readonly promotionModel: Model<PromotionDocument>,
    @Inject(forwardRef(() => PromotionService)) private readonly promotionService: PromotionService,
  ) {}

  async create(adminCreatePromotionDto: AdminCreatePromotionDto, tenantId: Types.ObjectId): Promise<AdminPromotionDto> {
    return this.promotionService.create(adminCreatePromotionDto, tenantId);
  }

  async update(adminUpdatePromotionDto: AdminUpdatePromotionDto, tenantId: Types.ObjectId): Promise<AdminPromotionDto> {
    return this.promotionService.update(adminUpdatePromotionDto, tenantId);
  }

  async updates(
    adminUpdatePromotionDto: AdminUpdatePromotionDto[],
    tenantId: Types.ObjectId,
  ): Promise<AdminPromotionDto[]> {
    return this.promotionService.updates(adminUpdatePromotionDto, tenantId);
  }

  async remove(id: string, tenantId: Types.ObjectId): Promise<boolean> {
    return this.promotionService.remove(id, tenantId);
  }

  async redeem(adminRedeemPromotionDto: AdminRedeemPromotionDto, tenantId: Types.ObjectId): Promise<boolean> {
    return this.promotionService.redeem(adminRedeemPromotionDto, tenantId);
  }

  async findAll(tenantIds: Types.ObjectId[]): Promise<AdminPromotionDto[]> {
    return this.promotionService.findAll(tenantIds);
  }

  async findOne(id: string, tenantId: Types.ObjectId): Promise<AdminPromotionDto | null> {
    return this.promotionService.findOne(id, tenantId);
  }

  async findAllByRule(
    userId: Types.ObjectId,
    bookingIds: Types.ObjectId[],
    tenantId: Types.ObjectId,
  ): Promise<PromotionDto[]> {
    return this.promotionService.findAllByRule(userId, bookingIds, tenantId);
  }

  async findMassPromotion(tenantId: Types.ObjectId): Promise<AdminPromotionDto[]> {
    return this.promotionService.findMassPromotion(tenantId);
  }

  async searchPromotionPaging(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: AdminSearchPromotionPagingQuerySortFilter,
    filters: AdminSearchPromotionPagingQuerySortFilter[],
    tenantIds: Types.ObjectId[],
  ): Promise<AdminSearchPromotionPagingRes> {
    return this.promotionService.searchPromotionPaging(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
  }
}
