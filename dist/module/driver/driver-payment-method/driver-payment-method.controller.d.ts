import { DriverPaymentMethodService } from './driver-payment-method-service';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
import { Types } from 'mongoose';
export declare class DriverPaymentMethodController {
    private readonly driverPaymentMethodService;
    constructor(driverPaymentMethodService: DriverPaymentMethodService);
    findOne(id: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("../../pos/pos-payment-method/dto/pos-payment-method.dto").PosPaymentMethodDto>;
    findAll(tenantScope: TenantScopeResult): Promise<import("../../core/payment-method/dto/payment-method.dto").PaymentMethodDto[]>;
    findDefault(tenantScope: TenantScopeResult): Promise<import("../../core/payment-method/dto/payment-method.dto").PaymentMethodDto | null>;
}
