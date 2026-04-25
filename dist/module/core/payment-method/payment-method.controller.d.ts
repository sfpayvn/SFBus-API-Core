import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { PaymentMethodService } from './payment-method-service';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { Types } from 'mongoose';
import { SearchPaymentMethodPagingQuery } from './dto/payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
export declare class PaymentMethodController {
    private readonly paymentMethodService;
    constructor(paymentMethodService: PaymentMethodService);
    create(createPaymentMethodDto: CreatePaymentMethodDto, user: UserTokenDto): Promise<import("./dto/payment-method.dto").PaymentMethodDto>;
    update(updatePaymentMethodDto: UpdatePaymentMethodDto, user: UserTokenDto): Promise<import("./dto/payment-method.dto").PaymentMethodDto>;
    remove(id: Types.ObjectId, user: UserTokenDto): Promise<boolean>;
    findOne(id: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/payment-method.dto").PaymentMethodDto>;
    findAll(user: UserTokenDto): Promise<import("./dto/payment-method.dto").PaymentMethodDto[]>;
    findDefault(user: UserTokenDto): Promise<import("./dto/payment-method.dto").PaymentMethodDto | null>;
    search(query: SearchPaymentMethodPagingQuery, user: UserTokenDto): Promise<import("./dto/payment-method.dto").SearchPaymentMethodPagingRes>;
}
