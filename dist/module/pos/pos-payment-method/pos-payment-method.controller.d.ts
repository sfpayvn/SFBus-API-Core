import { PosPaymentMethodService } from './pos-payment-method-service';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
import { Types } from 'mongoose';
export declare class PosPaymentMethodController {
    private readonly posPaymentMethodService;
    constructor(posPaymentMethodService: PosPaymentMethodService);
    findOne(id: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("./dto/pos-payment-method.dto").PosPaymentMethodDto>;
    findAll(tenantScope: TenantScopeResult): Promise<import("./dto/pos-payment-method.dto").PosPaymentMethodDto[]>;
    findDefault(tenantScope: TenantScopeResult): Promise<import("./dto/pos-payment-method.dto").PosPaymentMethodDto | null>;
}
