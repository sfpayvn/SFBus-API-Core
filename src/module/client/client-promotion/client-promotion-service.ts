import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PromotionDocument } from '@/module/core/promotion/schema/promotion.schema';
import { PromotionService } from '@/module/core/promotion/promotion-service';
import { PromotionDto } from '@/module/core/promotion/dto/promotion.dto';
import { ClientRedeemPromotionDto, ClientPromotionDto } from './dto/client-promotion.dto';

@Injectable()
export class ClientPromotionService {
  constructor(
    @InjectModel(PromotionDocument.name) private readonly promotionModel: Model<PromotionDocument>,
    @Inject(forwardRef(() => PromotionService)) private readonly promotionService: PromotionService,
  ) {}

  async redeem(ClientRedeemPromotionDto: ClientRedeemPromotionDto, tenantId: Types.ObjectId): Promise<boolean> {
    return this.promotionService.redeem(ClientRedeemPromotionDto, tenantId);
  }

  async findAll(tenantIds: Types.ObjectId[]): Promise<ClientPromotionDto[]> {
    return this.promotionService.findAll(tenantIds);
  }

  async findOne(id: string, tenantId: Types.ObjectId): Promise<ClientPromotionDto | null> {
    return this.promotionService.findOne(id, tenantId);
  }

  async findAllByRule(
    userId: Types.ObjectId,
    bookingIds: Types.ObjectId[],
    tenantId: Types.ObjectId,
  ): Promise<PromotionDto[]> {
    return this.promotionService.findAllByRule(userId, bookingIds, tenantId);
  }

  async findMassPromotion(tenantId: Types.ObjectId): Promise<ClientPromotionDto[]> {
    return this.promotionService.findMassPromotion(tenantId);
  }
}
