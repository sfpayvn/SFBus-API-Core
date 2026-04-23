import { PaymentDocument } from '@/module/core/payment/schema/payment.schema';
import { Model, Types } from 'mongoose';
import { ClientPaymentDto } from './dto/client-payment.dto';
import { ClientBookingService } from '../client-booking/client-booking-service';
import { BookingService } from '@/module/core/booking/booking-service';
import { PaymentService } from '@/module/core/payment/payment-service';
export declare class ClientPaymentService {
    private readonly paymentModel;
    private readonly ClientBookingService;
    private readonly bookingService;
    private readonly paymentService;
    constructor(paymentModel: Model<PaymentDocument>, ClientBookingService: ClientBookingService, bookingService: BookingService, paymentService: PaymentService);
    findPaymentByBookingId(bookingId: Types.ObjectId, tenantId: Types.ObjectId): Promise<ClientPaymentDto[]>;
    findAllByBookingId(bookingId: Types.ObjectId, tenantId: Types.ObjectId): Promise<ClientPaymentDto[]>;
}
