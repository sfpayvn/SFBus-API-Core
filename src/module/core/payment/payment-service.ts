import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { GOODS_PAYMENT_STATUS, PAYMENT_STATUS } from '@/common/constants/status.constants';
import { plainToInstance } from 'class-transformer';
import { PaymentDocument } from './schema/payment.schema';
import { PaymentDto, RequestPaymentDto } from './dto/payment.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { RequestUpdatePaymentByRedeemPromotionDto, UpdatePaymentDto } from './dto/update-payment.dto';
import { BookingService } from '../booking/booking-service';
import { UpdateBookingDto } from '../booking/dto/update-booking.dto';
import { RequestUpdateSeatStatusDto } from '../bus/bus-schedule-layout/dto/bus-schedule-layout.dto';
import { BusScheduleLayoutService } from '../bus/bus-schedule-layout/bus-schedule-layout.service';
import { customAlphabet } from 'nanoid';
import { GoodsService } from '../goods/goods/goods-service';
import { RequestUpdatePaymentGoodsStatusDto } from '../goods/goods/dto/update-goods.dto';

@Injectable()
export class PaymentService {
  private alphabet = process.env.ALPHABET || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  private nanoid = customAlphabet(this.alphabet, 6);

  constructor(
    @InjectModel(PaymentDocument.name) private readonly paymentModel: Model<PaymentDocument>,
    @Inject(forwardRef(() => BookingService)) private readonly bookingService: BookingService,
    @Inject(forwardRef(() => GoodsService)) private readonly goodsService: GoodsService,
    @Inject(forwardRef(() => BusScheduleLayoutService))
    private readonly busScheduleLayoutService: BusScheduleLayoutService,
  ) {}

  async create(createPayment: CreatePaymentDto, tenantId: Types.ObjectId): Promise<PaymentDto> {
    const createPaymentModel = new this.paymentModel({ ...createPayment, tenantId });
    createPayment.status = PAYMENT_STATUS.PENDING;

    const savedPayment = await createPaymentModel.save(); // Sau đó mới lưu thông tin thanh toán

    return plainToInstance(PaymentDto, savedPayment);
  }

  async processBookingPayment(requestPaymentDto: RequestPaymentDto, tenantId: Types.ObjectId): Promise<PaymentDto[]> {
    const bookings = await this.bookingService.findAllByBookingGroupNumber(
      requestPaymentDto.referrentGroupNumber,
      tenantId,
    );

    // 1. T�nh t?ng afterDiscountTotalPrice
    const totalAfterDiscount = bookings.reduce((sum, b) => sum + b.afterDiscountTotalPrice, 0);

    const payment2Result: PaymentDto[] = [];

    // 2. L?p qua t?ng booking v� t�nh paymentAmount theo t? l?
    for (const booking of bookings) {
      const ratio = booking.afterDiscountTotalPrice / totalAfterDiscount;
      const paymentAmountForBooking = Math.floor(requestPaymentDto.totalPrice * ratio);

      const bookingOjectId = new Types.ObjectId(booking._id.toString());

      const payment2Create: CreatePaymentDto = {
        tenantId: new Types.ObjectId(booking.tenantId),
        paymentNumber: this.generateNumberAlphabet(),
        referrentGroupNumber: requestPaymentDto.referrentGroupNumber,
        referrentId: bookingOjectId,
        referrentNumber: booking.bookingNumber,
        userId: new Types.ObjectId(booking.userId),
        paymentMethodId: requestPaymentDto.paymentMethodId,
        status: PAYMENT_STATUS.COMPLETED,
        paymentAmount: requestPaymentDto.totalPrice,
        chargedAmount: paymentAmountForBooking,
        transactionReferrentId: requestPaymentDto.transactionId,
      };

      const createPaymentModel = new this.paymentModel(payment2Create);

      const otherPaymentsModel = await this.paymentModel.find({ referrentId: booking._id, tenantId }).lean().exec();

      const totalOtherPaymentByBooking = otherPaymentsModel.reduce((sum, p) => sum + (p.chargedAmount || 0), 0);

      const bookingStatus =
        Math.round((totalOtherPaymentByBooking + paymentAmountForBooking) / 1000) * 1000 >=
        booking.afterDiscountTotalPrice
          ? 'paid'
          : 'deposited';
      const requestUpdateSeatsStatus: RequestUpdateSeatStatusDto[] = [];

      for (const bookingItem of booking.bookingItems) {
        const updateSeatStatus: RequestUpdateSeatStatusDto = {
          _id: new Types.ObjectId(bookingItem.seat._id),
          bookingStatus: bookingStatus,
          bookingId: bookingOjectId,
          bookingNumber: booking.bookingNumber,
        };
        requestUpdateSeatsStatus.push(updateSeatStatus);
      }

      await this.busScheduleLayoutService.updateSeatStatusByBusSchedule(
        new Types.ObjectId(booking.busScheduleId),
        requestUpdateSeatsStatus,
        tenantId,
      );

      if (bookingStatus !== booking.status) {
        await this.bookingService.updateStatusById(bookingOjectId, bookingStatus, tenantId);
      }

      const paymentModel = await createPaymentModel.save();

      payment2Result.push(plainToInstance(PaymentDto, paymentModel.toObject()));
    }

    return payment2Result;
  }

  async processGoodsPayment(
    requestPaymentDto: RequestPaymentDto,
    tenantId: Types.ObjectId,
    createdBy: Types.ObjectId,
  ): Promise<PaymentDto> {
    const goods = await this.goodsService.findAllByBookingGroupNumber(requestPaymentDto.referrentGroupNumber, tenantId);

    const totalPrice = goods.shippingCost + goods.cod;

    const isCOD = goods.cod > 0;

    const paymentAmountForBooking = Math.floor(requestPaymentDto.totalPrice);

    const payment2Create: CreatePaymentDto = {
      tenantId: goods.tenantId,
      paymentNumber: this.generateNumberAlphabet(),
      referrentGroupNumber: requestPaymentDto.referrentGroupNumber,
      referrentId: goods._id,
      referrentNumber: goods.goodsNumber,
      userId: createdBy,
      paymentMethodId: requestPaymentDto.paymentMethodId,
      status: requestPaymentDto.totalPrice > 0 ? PAYMENT_STATUS.COMPLETED : PAYMENT_STATUS.REFUNDED,
      paymentAmount: requestPaymentDto.totalPrice,
      chargedAmount: paymentAmountForBooking,
      transactionReferrentId: requestPaymentDto.transactionId,
    };

    const createPaymentModel = new this.paymentModel(payment2Create);

    let goodsPaymentStatus: string;

    if (requestPaymentDto.totalPrice > 0) {
      const otherPaymentsModel = await this.paymentModel
        .find({ referrentId: goods._id, tenantId, status: PAYMENT_STATUS.COMPLETED })
        .lean()
        .exec();

      const totalOtherPaymentByBooking = otherPaymentsModel.reduce((sum, p) => sum + (p.chargedAmount || 0), 0);

      const cumulativePayment = totalOtherPaymentByBooking + requestPaymentDto.totalPrice;
      if (cumulativePayment >= totalPrice) {
        goodsPaymentStatus = isCOD ? GOODS_PAYMENT_STATUS.READY_REFUND : GOODS_PAYMENT_STATUS.PAID;
      } else {
        goodsPaymentStatus = GOODS_PAYMENT_STATUS.DEPOSITED;
      }
    } else {
      goodsPaymentStatus = GOODS_PAYMENT_STATUS.REFUNDED;
    }

    const requestRequestUpdate: RequestUpdatePaymentGoodsStatusDto = {
      _id: goods._id,
      paymentStatus: goodsPaymentStatus,
    };
    await this.goodsService.updatePaymentGoodsStatus(requestRequestUpdate, tenantId);

    const paymentModel = await createPaymentModel.save();

    const payment = plainToInstance(PaymentDto, paymentModel.toObject());

    return payment;
  }

  async findAll(tenantId: Types.ObjectId): Promise<PaymentDto[]> {
    const paymentsModel = await this.paymentModel.find({ tenantId }).lean().exec();
    return paymentsModel.map((payment) => plainToInstance(PaymentDto, payment));
  }

  async findAllByReferrentId(referrentId: Types.ObjectId, tenantId: Types.ObjectId): Promise<PaymentDto[]> {
    const conditions = {
      referrentId: referrentId,
      tenantId,
    };

    const paymentsModel = await this.paymentModel.find(conditions).lean().exec();

    return paymentsModel.map((payment) => plainToInstance(PaymentDto, payment));
  }

  async findAllByPaymentGroupNumber(paymentGroupNumber: string, tenantId: Types.ObjectId): Promise<PaymentDto[]> {
    const paymentsModel = await this.paymentModel.find({ paymentGroupNumber, tenantId }).lean().exec();
    return paymentsModel.map((payment) => plainToInstance(PaymentDto, payment));
  }

  async findOne(id: string, tenantId: Types.ObjectId): Promise<PaymentDto> {
    const paymentsModel = await this.paymentModel.findOne({ _id: id, tenantId }).lean().exec();
    if (!paymentsModel) {
      throw new NotFoundException(`payment with ID "${id}" not found.`);
    }
    return plainToInstance(PaymentDto, paymentsModel);
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto, tenantId: Types.ObjectId): Promise<PaymentDto> {
    const updatedPayment = await this.paymentModel
      .findOneAndUpdate({ _id: id, tenantId }, updatePaymentDto, { new: true })
      .lean()
      .exec();
    if (!updatedPayment) {
      throw new NotFoundException(`payment with ID "${id}" not found.`);
    }
    return plainToInstance(PaymentDto, updatedPayment);
  }

  async cleanPaymentPromotion(referrentId: Types.ObjectId, tenantId: Types.ObjectId): Promise<void> {
    await this.paymentModel.updateMany(
      { referrentId, status: PAYMENT_STATUS.PENDING, tenantId },
      { $unset: { promotionId: '', discountAmount: 0 } },
    );
  }

  async remove(id: string, tenantId: Types.ObjectId): Promise<void> {
    const result = await this.paymentModel.findOneAndDelete({ _id: id, tenantId }).lean().exec();
    if (!result) {
      throw new NotFoundException(`payment with ID "${id}" not found.`);
    }
  }

  async removePaymentsByReferrentIds(referrentIds: Types.ObjectId[], tenantId: Types.ObjectId): Promise<void> {
    const result = await this.paymentModel
      .deleteMany({ referrentId: { $in: referrentIds }, tenantId })
      .lean()
      .exec();
    if (!result) {
      throw new NotFoundException(`payment with ID "${JSON.stringify(referrentIds)}" not found.`);
    }
  }

  async updatePaymentByRedeemPromotion(
    dto: RequestUpdatePaymentByRedeemPromotionDto,
    tenantId: Types.ObjectId,
  ): Promise<PaymentDto> {
    const updatedPayment = await this.paymentModel
      .findOneAndUpdate(
        { referrentId: dto.referrentId, bookingItemId: dto.bookingItemId, status: PAYMENT_STATUS.PENDING, tenantId },
        { promotionId: dto.promotionId, discountAmount: dto.discountAmount },
      )
      .exec();

    if (!updatedPayment) {
      throw new NotFoundException(`payment not found.`);
    }

    return plainToInstance(PaymentDto, updatedPayment);
  }

  generateNumberAlphabet(): string {
    return this.nanoid();
  }
}
