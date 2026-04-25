import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { Types } from 'mongoose';
import { AdminPaymentMethodService } from './admin-payment-method-service';
import { AdminCreatePaymentMethodDto } from './dto/admin-create-payment-method.dto';
import { AdminUpdatePaymentMethodDto } from './dto/admin-update-payment-method.dto';
import { AdminSearchPaymentMethodPagingQuery } from './dto/admin-payment-method.dto';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class AdminPaymentMethodController {
    private readonly adminPaymentMethodService;
    constructor(adminPaymentMethodService: AdminPaymentMethodService);
    create(adminCreatePaymentMethodDto: AdminCreatePaymentMethodDto, user: UserTokenDto): Promise<import("./dto/admin-payment-method.dto").AdminPaymentMethodDto>;
    update(adminUpdatePaymentMethodDto: AdminUpdatePaymentMethodDto, user: UserTokenDto): Promise<import("./dto/admin-payment-method.dto").AdminPaymentMethodDto>;
    remove(id: Types.ObjectId, user: UserTokenDto): Promise<boolean>;
    findOne(id: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("./dto/admin-payment-method.dto").AdminPaymentMethodDto>;
    findAll(tenantScope: TenantScopeResult): Promise<import("../../core/payment-method/dto/payment-method.dto").PaymentMethodDto[]>;
    findDefault(tenantScope: TenantScopeResult): Promise<import("../../core/payment-method/dto/payment-method.dto").PaymentMethodDto | null>;
    search(query: AdminSearchPaymentMethodPagingQuery, tenantScope: TenantScopeResult): Promise<import("./dto/admin-payment-method.dto").AdminSearchPaymentMethodPagingRes>;
}
