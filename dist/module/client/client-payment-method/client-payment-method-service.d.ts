import { Types } from 'mongoose';
import { PaymentMethodService } from '@/module/core/payment-method/payment-method-service';
import { ClientPaymentMethodDto } from './dto/client-payment-method.dto';
export declare class ClientPaymentMethodService {
    private readonly paymentMethodService;
    constructor(paymentMethodService: PaymentMethodService);
    findAll(tenantIds: Types.ObjectId[]): Promise<ClientPaymentMethodDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<ClientPaymentMethodDto>;
    findDefault(tenantIds: Types.ObjectId[]): Promise<ClientPaymentMethodDto | null>;
}
