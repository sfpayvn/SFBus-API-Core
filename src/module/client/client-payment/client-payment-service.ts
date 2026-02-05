import { PaymentDocument } from '@/module/core/payment/schema/payment.schema';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ClientPaymentDto } from './dto/client-payment.dto';
import { plainToInstance } from 'class-transformer';
import { ClientBookingService } from '../client-booking/client-booking-service';
import { BookingService } from '@/module/core/booking/booking-service';
import { PaymentService } from '@/module/core/payment/payment-service';

@Injectable()
export class ClientPaymentService {
  constructor(
    @InjectModel(PaymentDocument.name) private readonly paymentModel: Model<PaymentDocument>,
    @Inject(forwardRef(() => ClientBookingService)) private readonly ClientBookingService: ClientBookingService,
    @Inject(forwardRef(() => BookingService)) private readonly bookingService: BookingService,
    @Inject(forwardRef(() => PaymentService)) private readonly paymentService: PaymentService,
  ) {}

  async findPaymentByBookingId(bookingId: Types.ObjectId, tenantId: Types.ObjectId): Promise<ClientPaymentDto[]> {
    const conditions = {
      referrentId: bookingId,
      tenantId,
    };

    const paymentsModel = await this.paymentModel.find(conditions).lean().exec();

    return paymentsModel.map((payment) => plainToInstance(ClientPaymentDto, payment));
  }

  async findAllByBookingId(bookingId: Types.ObjectId, tenantId: Types.ObjectId): Promise<ClientPaymentDto[]> {
    const conditions = {
      referrentId: bookingId,
      tenantId,
    };

    const paymentsModel = await this.paymentModel.find(conditions).lean().exec();

    return paymentsModel.map((payment) => plainToInstance(ClientPaymentDto, payment));
  }
}
