import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PromotionDocument } from './schema/promotion.schema';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { customAlphabet } from 'nanoid';
import {
  PromotionDto,
  RedeemPromotionDto,
  RequestPromotionByRule,
  SearchPromotionPagingQuerySortFilter,
  SearchPromotionPagingRes,
} from './dto/promotion.dto';
import { plainToInstance } from 'class-transformer';
import { BookingService } from '../booking/booking-service';
import { BookingDto } from '../booking/dto/booking.dto';
import { UpdateBookingDto } from '../booking/dto/update-booking.dto';
import { PaymentService } from '../payment/payment-service';

@Injectable()
export class PromotionService {
  private alphabet = process.env.ALPHABET || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  private nanoid = customAlphabet(this.alphabet, 6);

  constructor(
    @InjectModel(PromotionDocument.name) private readonly promotionModel: Model<PromotionDocument>,
    private readonly paymentService: PaymentService,
    private readonly bookingService: BookingService,
  ) {}

  async create(createPromotionDto: CreatePromotionDto, tenantId: Types.ObjectId): Promise<PromotionDto> {
    const promotionModel = await this.promotionModel.create({ ...createPromotionDto, tenantId });

    const promotion = plainToInstance(PromotionDto, promotionModel);
    const [result] = this.mapImageUrl([promotion]);

    return result || null;
  }

  async findAll(tenantIds: Types.ObjectId[]): Promise<PromotionDto[]> {
    const promotionModel = await this.promotionModel
      .find({ tenantId: { $in: tenantIds } })
      .lean()
      .exec();

    const promotions = plainToInstance(PromotionDto, promotionModel);
    return this.mapImageUrl(promotions);
  }

  async findOne(id: string, tenantId: Types.ObjectId) {
    const promotionModel = await this.promotionModel.findOne({ _id: id, tenantId }).lean().exec();
    if (!promotionModel) {
      throw new NotFoundException('promotion not found.');
    }

    const promotion = plainToInstance(PromotionDto, promotionModel);
    const [result] = this.mapImageUrl([promotion]);

    return result || null;
  }

  async findAllByRule(
    userId: Types.ObjectId,
    bookingIds: Types.ObjectId[],
    tenantId: Types.ObjectId,
  ): Promise<PromotionDto[]> {
    //handle logic by rule
    const promotionModel = await this.promotionModel.find({ tenantId }).lean().exec();

    const promotions = plainToInstance(PromotionDto, promotionModel);
    return this.mapImageUrl(promotions);
  }

  async findMassPromotion(tenantId: Types.ObjectId): Promise<PromotionDto[]> {
    //handle logic by rule
    const promotionModel = await this.promotionModel
      .find({ tenantId, expireDate: { $gte: new Date() } })
      .lean()
      .exec();

    const promotions = plainToInstance(PromotionDto, promotionModel);
    return this.mapImageUrl(promotions);
  }

  async update(updatePromotionDto: UpdatePromotionDto, tenantId: Types.ObjectId): Promise<PromotionDto> {
    const promotion = await this.promotionModel.findOneAndUpdate(
      { _id: updatePromotionDto._id, tenantId },
      updatePromotionDto,
      { new: true },
    );
    if (!promotion) {
      throw new NotFoundException('promotion not found.');
    }
    const dto = plainToInstance(PromotionDto, promotion);
    const [result] = this.mapImageUrl([dto]);
    return result || null;
  }

  async updates(updatePromotionDto: UpdatePromotionDto[], tenantId: Types.ObjectId): Promise<PromotionDto[]> {
    const updatePromises = await Promise.all(
      updatePromotionDto.map(async (dto) => {
        const updatedPromotion = await this.promotionModel
          .findOneAndUpdate({ _id: dto._id, tenantId }, dto, { new: true })
          .exec();
        if (!updatedPromotion) {
          throw new NotFoundException('Promotion not found');
        }
        return plainToInstance(PromotionDto, updatedPromotion);
      }),
    );
    return this.mapImageUrl(updatePromises);
  }

  async remove(id: string, tenantId: Types.ObjectId): Promise<boolean> {
    const promotion = await this.promotionModel.findOneAndDelete({ _id: id, tenantId });
    if (!promotion) {
      throw new NotFoundException('promotion not found.');
    }
    return promotion !== null;
  }

  async redeem(redeemPromotionDto: RedeemPromotionDto, tenantId: Types.ObjectId): Promise<boolean> {
    //Check rule nếu sai thì không cho return
    const promotion: PromotionDto | null = await this.checkRedeemRules(redeemPromotionDto, tenantId);
    if (!promotion) {
      return false;
    }

    const bookings: BookingDto[] | null = await this.bookingService.findByIds(redeemPromotionDto.bookingIds, tenantId);

    if (!bookings || bookings.length === 0) {
      throw new NotFoundException('bookings not found.');
    }

    const totalPrice = bookings.reduce((sum, bk) => sum + bk.totalPrice, 0);
    const totalItems = bookings.reduce((sum, bk) => sum + bk.bookingItems.length, 0);

    for (const booking of bookings) {
      let totalDisacount = 0;

      for (const item of booking.bookingItems) {
        let discount = 0;

        if (promotion.discountType === 'percentage') {
          // Áp dụng % trên tổng giá
          discount = Math.round((totalPrice * promotion.discountValue) / 100);
        } else if (promotion.discountType === 'fixed') {
          discount = promotion.discountValue;
        }

        item.discountAmount = Math.floor(discount / totalItems);
        item.afterDiscountPrice = item.price - item.discountAmount;
        totalDisacount += item.discountAmount;
      }

      booking.discountTotalAmount = totalDisacount;
      booking.afterDiscountTotalPrice = booking.totalPrice - totalDisacount;

      const booking2Update: UpdateBookingDto = {
        ...booking,
        _id: new Types.ObjectId(booking._id),
        tenantId: new Types.ObjectId(booking.tenantId),
        userId: new Types.ObjectId(booking.userId),
        busScheduleId: new Types.ObjectId(booking.busScheduleId),
        busRouteId: new Types.ObjectId(booking.busRouteId),
        bookingItems: booking.bookingItems.map((item) => ({
          ...item,
          _id: new Types.ObjectId(item._id),
          departure: new Types.ObjectId(item.departure),
          destination: new Types.ObjectId(item.destination),
          seat: {
            ...item.seat,
            _id: new Types.ObjectId(item.seat._id),
          },
        })),
      };
      await this.bookingService.update(booking2Update, tenantId);
    }

    // Implement your redeem logic here
    return true;
  }

  async checkRedeemRules(
    redeemPromotionDto: RedeemPromotionDto,
    tenantId: Types.ObjectId,
  ): Promise<PromotionDto | null> {
    const promotionModel = await this.promotionModel
      .findOne({ _id: redeemPromotionDto.promotionId, tenantId })
      .lean()
      .exec();

    if (!promotionModel) {
      return null;
    }
    // Implement your rule checking logic here
    return plainToInstance(PromotionDto, promotionModel);
  }

  async searchPromotionPaging(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchPromotionPagingQuerySortFilter,
    filters: SearchPromotionPagingQuerySortFilter[],
    tenantIds: Types.ObjectId[],
  ): Promise<SearchPromotionPagingRes> {
    {
      const pipeline = await this.buildQuerySearchPromotionPaging(
        pageIdx,
        pageSize,
        keyword,
        sortBy,
        filters,
        tenantIds,
      );
      // Thực hiện tìm kiếm
      const promotionData = await this.promotionModel.aggregate(pipeline).exec();

      // Đếm tổng số mục
      const totalItem = await this.promotionModel.countDocuments({ tenantId: { $in: tenantIds } });

      const promotions = plainToInstance(PromotionDto, promotionData);
      const filteredPromotion = this.mapImageUrl(promotions);

      // Trả về kết quả
      return {
        pageIdx,
        promotions: filteredPromotion,
        totalPage: Math.ceil(totalItem / pageSize),
        totalItem,
      };
    }
  }

  async buildQuerySearchPromotionPaging(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchPromotionPagingQuerySortFilter,
    filters: SearchPromotionPagingQuerySortFilter[],
    tenantIds: Types.ObjectId[],
  ) {
    const skip = pageIdx ? (pageIdx - 1) * pageSize : 0;

    const pipeline: any = [
      {
        $match: { tenantId: { $in: tenantIds } },
      },
    ];
    const matchConditions: any[] = [];

    // 1. Tìm theo keyword
    if (keyword) {
      matchConditions.push({
        $or: [
          { name: { $regex: keyword, $options: 'i' } },
          { promotionNumber: { $regex: keyword, $options: 'i' } },
          { customerName: { $regex: keyword, $options: 'i' } },

          { customerPhoneNumber: { $regex: keyword, $options: 'i' } },
          { customerAddress: { $regex: keyword, $options: 'i' } },

          { senderName: { $regex: keyword, $options: 'i' } },
          { senderPhoneNumber: { $regex: keyword, $options: 'i' } },
        ],
      });
    }

    // 2. Xác định start/end date và các filter còn lại
    let startDateValue: Date | null = null;
    let endDateValue: Date | null = null;

    if (Array.isArray(filters)) {
      await Promise.all(
        filters.map(async ({ key, value }) => {
          if (!key || value == null) return;

          if (key === 'startDate') {
            startDateValue = new Date(value);
          } else if (key === 'endDate') {
            endDateValue = new Date(value);
          } else if (key === 'phoneNumber') {
            matchConditions.push({ customerPhoneNumber: { $regex: value, $options: 'i' } });
          } else {
            matchConditions.push({ [key]: value });
          }
        }),
      );
    }

    // 3. Tạo điều kiện range cho createdAt nếu có startDate và/hoặc endDate
    if (startDateValue || endDateValue) {
      const rangeCond: any = {};
      if (startDateValue) rangeCond.$gte = startDateValue;
      if (endDateValue) rangeCond.$lte = endDateValue;

      matchConditions.push({ createdAt: rangeCond });
    }

    // 4. Đẩy $match nếu có bất kỳ điều kiện nào
    if (matchConditions.length) {
      pipeline.push({
        $match: { $and: matchConditions },
      });
    }

    // 4. $sort
    if (sortBy?.key) {
      pipeline.push({
        $sort: { [sortBy.key]: sortBy.value === 'ascend' ? 1 : -1 },
      });
    }

    // 5. paging: $skip + $limit
    pipeline.push({ $skip: skip }, { $limit: pageSize });
    return pipeline;
  }

  generatePromotionNumber(): string {
    return this.nanoid();
  }

  private mapImageUrl(promotions: PromotionDto[]): PromotionDto[] {
    const port = process.env.PUBLIC_PORT ? `:${process.env.PUBLIC_PORT}` : '';

    return promotions.map((promotion) => ({
      ...promotion,
      image: `${process.env.DOMAIN}${port}/file/view/${promotion.imageId.toString()}`,
    }));
  }
}
