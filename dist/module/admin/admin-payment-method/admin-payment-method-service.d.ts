import { Types } from 'mongoose';
import { PaymentMethodService } from '@/module/core/payment-method/payment-method-service';
import { PaymentMethodDto } from '@/module/core/payment-method/dto/payment-method.dto';
import { AdminPaymentMethodDto, AdminSearchPaymentMethodPagingQuerySortFilter, AdminSearchPaymentMethodPagingRes } from './dto/admin-payment-method.dto';
import { AdminCreatePaymentMethodDto } from './dto/admin-create-payment-method.dto';
import { AdminUpdatePaymentMethodDto } from './dto/admin-update-payment-method.dto';
export declare class AdminPaymentMethodService {
    private readonly paymentMethodService;
    constructor(paymentMethodService: PaymentMethodService);
    create(adminCreatePaymentMethodDto: AdminCreatePaymentMethodDto, tenantId: Types.ObjectId): Promise<AdminPaymentMethodDto>;
    update(adminUpdatePaymentMethodDto: AdminUpdatePaymentMethodDto, tenantId: Types.ObjectId): Promise<AdminPaymentMethodDto>;
    remove(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean>;
    findAll(tenantIds: Types.ObjectId[]): Promise<PaymentMethodDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<AdminPaymentMethodDto>;
    findDefault(tenantIds: Types.ObjectId[]): Promise<PaymentMethodDto | null>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: AdminSearchPaymentMethodPagingQuerySortFilter, filters: AdminSearchPaymentMethodPagingQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<AdminSearchPaymentMethodPagingRes>;
}
