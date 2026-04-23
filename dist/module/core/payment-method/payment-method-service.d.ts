import { Model, Types } from 'mongoose';
import { PaymentMethodDocument } from './schema/payment-method.schema';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { PaymentMethodDto, PaymentMethodSortFilter, SearchPaymentMethodPagingRes } from './dto/payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
export declare class PaymentMethodService {
    private readonly paymentMethodModel;
    constructor(paymentMethodModel: Model<PaymentMethodDocument>);
    create(createPaymentMethodDto: CreatePaymentMethodDto, tenantId: Types.ObjectId): Promise<PaymentMethodDto>;
    update(updatePaymentMethodDto: UpdatePaymentMethodDto, tenantId: Types.ObjectId): Promise<PaymentMethodDto>;
    remove(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean>;
    makePaymentMethodSelectDefault(paymentMethodId: Types.ObjectId, tenantId: Types.ObjectId): Promise<PaymentMethodDto>;
    findAll(tenantIds: Types.ObjectId[], filters?: PaymentMethodSortFilter[]): Promise<PaymentMethodDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[], filters?: PaymentMethodSortFilter[]): Promise<PaymentMethodDto>;
    findDefault(tenantIds: Types.ObjectId[], filters?: PaymentMethodSortFilter[]): Promise<PaymentMethodDto | null>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: PaymentMethodSortFilter, filters: PaymentMethodSortFilter[], tenantIds: Types.ObjectId[]): Promise<SearchPaymentMethodPagingRes>;
    buildQuerySearchPaymentMethodPaging(pageIdx: number, pageSize: number, keyword: string, sortBy: PaymentMethodSortFilter, filters: PaymentMethodSortFilter[], tenantIds: Types.ObjectId[]): Promise<{
        pipeline: any[];
        matchForCount: any;
    }>;
    mapImageUrl(paymentMethods: PaymentMethodDto[]): Promise<PaymentMethodDto[]>;
}
