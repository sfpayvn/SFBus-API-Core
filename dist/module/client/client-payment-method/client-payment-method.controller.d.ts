import { Types } from 'mongoose';
import { ClientPaymentMethodService } from './client-payment-method-service';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class ClientPaymentMethodController {
    private readonly clientPaymentMethodService;
    constructor(clientPaymentMethodService: ClientPaymentMethodService);
    findOne(id: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("./dto/client-payment-method.dto").ClientPaymentMethodDto>;
    findAll(tenantScope: TenantScopeResult): Promise<import("./dto/client-payment-method.dto").ClientPaymentMethodDto[]>;
    findDefault(tenantScope: TenantScopeResult): Promise<import("./dto/client-payment-method.dto").ClientPaymentMethodDto | null>;
}
