import { Types } from 'mongoose';
import { PaymentMethodService } from '@/module/core/payment-method/payment-method-service';
import { PosPaymentMethodDto } from './dto/pos-payment-method.dto';
export declare class PosPaymentMethodService {
    private readonly paymentMethodService;
    constructor(paymentMethodService: PaymentMethodService);
    findAll(tenantIds: Types.ObjectId[]): Promise<PosPaymentMethodDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<PosPaymentMethodDto>;
    findDefault(tenantIds: Types.ObjectId[]): Promise<PosPaymentMethodDto | null>;
}
