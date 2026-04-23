import { PaymentDocument } from '@/module/core/payment/schema/payment.schema';
import { Model, Types } from 'mongoose';
import { AdminPaymentDto, AdminRequestPaymentDto } from './dto/admin-payment.dto';
import { PaymentService } from '@/module/core/payment/payment-service';
import { AdminTrackingService } from '../admin-tracking/admin-tracking.service';
export declare class AdminPaymentService {
    private readonly paymentModel;
    private readonly paymentService;
    private readonly adminTrackingService;
    constructor(paymentModel: Model<PaymentDocument>, paymentService: PaymentService, adminTrackingService: AdminTrackingService);
    processBookingPayment(AdminRequestPaymentDto: AdminRequestPaymentDto, tenantId: Types.ObjectId, createdBy: Types.ObjectId): Promise<AdminPaymentDto[]>;
    processGoodsPayment(AdminRequestPaymentDto: AdminRequestPaymentDto, tenantId: Types.ObjectId, createdBy: Types.ObjectId): Promise<AdminPaymentDto>;
    findAllByReferrentId(referrentId: Types.ObjectId, tenantId: Types.ObjectId): Promise<AdminPaymentDto[]>;
}
