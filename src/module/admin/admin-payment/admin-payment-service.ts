import { PaymentDocument } from '@/module/core/payment/schema/payment.schema';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AdminPaymentDto, AdminRequestPaymentDto } from './dto/admin-payment.dto';
import { plainToInstance } from 'class-transformer';
import { AdminCreatePaymentDto } from './dto/admin-create-payment.dto';
import { AdminBookingService } from '../admin-booking/admin-booking-service';
import { BookingService } from '@/module/core/booking/booking-service';
import { AdminUpdateBookingDto } from '../admin-booking/dto/admin-update-booking.dto';
import { UpdateBookingDto } from '@/module/core/booking/dto/update-booking.dto';
import { PaymentService } from '@/module/core/payment/payment-service';
import { AdminTrackingService } from '../admin-tracking/admin-tracking.service';
import { TRACKING_TYPES } from '@/module/core/tracking/constants/tracking-types';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Injectable()
export class AdminPaymentService {
  constructor(
    @InjectModel(PaymentDocument.name) private readonly paymentModel: Model<PaymentDocument>,
    @Inject(forwardRef(() => PaymentService)) private readonly paymentService: PaymentService,
    @Inject(forwardRef(() => AdminTrackingService)) private readonly adminTrackingService: AdminTrackingService,
  ) {}

  async processBookingPayment(
    AdminRequestPaymentDto: AdminRequestPaymentDto,
    tenantId: Types.ObjectId,
    createdBy: Types.ObjectId,
  ): Promise<AdminPaymentDto[]> {
    const payments = await this.paymentService.processBookingPayment(AdminRequestPaymentDto, tenantId);

    for (const payment of payments) {
      // Cập nhật trạng thái booking tương ứng

      await this.adminTrackingService.create(
        {
          type: TRACKING_TYPES.PAYMENT_BOOKING_PROCESSED,
          platform: ROLE_CONSTANTS.ADMIN,
          metadata: {
            bookingId: payment.referrentId,
            paymentId: payment._id,
            paymentStatus: payment.status,
            paymentMethodId: payment.paymentMethodId,
            chargedAmount: payment.chargedAmount,
            paymentAmount: payment.paymentAmount,
          },
          createdBy,
        },
        tenantId,
      );
    }

    return payments;
  }

  async processGoodsPayment(
    AdminRequestPaymentDto: AdminRequestPaymentDto,
    tenantId: Types.ObjectId,
    createdBy: Types.ObjectId,
  ): Promise<AdminPaymentDto> {
    const payment = await this.paymentService.processGoodsPayment(AdminRequestPaymentDto, tenantId, createdBy);

    await this.adminTrackingService.create(
      {
        type: TRACKING_TYPES.PAYMENT_GOODS_PROCESSED,
        platform: ROLE_CONSTANTS.ADMIN,
        metadata: {
          goodsId: payment.referrentId,
          paymentId: payment._id,
          paymentStatus: payment.status,
          paymentMethodId: payment.paymentMethodId,
          chargedAmount: payment.chargedAmount,
          paymentAmount: payment.paymentAmount,
        },
        createdBy,
      },
      tenantId,
    );

    return payment;
  }

  async findAllByReferrentId(referrentId: Types.ObjectId, tenantId: Types.ObjectId): Promise<AdminPaymentDto[]> {
    return this.paymentService.findAllByReferrentId(referrentId, tenantId);
  }
}
