import { Types } from 'mongoose';
import { PosPaymentDto, PosRequestPaymentDto } from './dto/pos-payment.dto';
import { PaymentService } from '@/module/core/payment/payment-service';
import { PosTrackingService } from '../pos-tracking/pos-tracking.service';
export declare class PosPaymentService {
    private readonly paymentService;
    private readonly posTrackingService;
    constructor(paymentService: PaymentService, posTrackingService: PosTrackingService);
    processBookingPayment(posRequestPaymentDto: PosRequestPaymentDto, tenantId: Types.ObjectId, createdBy: Types.ObjectId): Promise<PosPaymentDto[]>;
    processGoodsPayment(posRequestPaymentDto: PosRequestPaymentDto, tenantId: Types.ObjectId, createdBy: Types.ObjectId): Promise<PosPaymentDto>;
    findAllByReferrentId(referrentId: Types.ObjectId, tenantId: Types.ObjectId): Promise<PosPaymentDto[]>;
}
