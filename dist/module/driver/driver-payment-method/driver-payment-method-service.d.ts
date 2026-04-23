import { Types } from 'mongoose';
import { PaymentMethodService } from '@/module/core/payment-method/payment-method-service';
import { PaymentMethodDto } from '@/module/core/payment-method/dto/payment-method.dto';
import { PosPaymentMethodDto } from '@/module/pos/pos-payment-method/dto/pos-payment-method.dto';
export declare class DriverPaymentMethodService {
    private readonly paymentMethodService;
    constructor(paymentMethodService: PaymentMethodService);
    findAll(tenantIds: Types.ObjectId[]): Promise<PaymentMethodDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<PosPaymentMethodDto>;
    findDefault(tenantIds: Types.ObjectId[]): Promise<PaymentMethodDto | null>;
}
