import { Types } from 'mongoose';
import { DriverPaymentDto, DriverRequestPaymentDto } from './dto/driver-payment.dto';
import { PaymentService } from '@/module/core/payment/payment-service';
import { DriverTrackingService } from '../driver-tracking/driver-tracking.service';
export declare class DriverPaymentService {
    private readonly paymentService;
    private readonly driverTrackingService;
    constructor(paymentService: PaymentService, driverTrackingService: DriverTrackingService);
    processBookingPayment(driverRequestPaymentDto: DriverRequestPaymentDto, tenantId: Types.ObjectId, createdBy: Types.ObjectId): Promise<DriverPaymentDto[]>;
    processGoodsPayment(driverRequestPaymentDto: DriverRequestPaymentDto, tenantId: Types.ObjectId, createdBy: Types.ObjectId): Promise<DriverPaymentDto>;
    findAllByReferrentId(referrentId: Types.ObjectId, tenantId: Types.ObjectId): Promise<DriverPaymentDto[]>;
}
