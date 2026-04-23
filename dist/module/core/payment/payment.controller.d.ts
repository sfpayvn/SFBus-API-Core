import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { PaymentService } from './payment-service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { RequestPaymentDto } from './dto/payment.dto';
import { Types } from 'mongoose';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    creates(createPaymentDto: CreatePaymentDto, user: UserTokenDto): Promise<import("./dto/payment.dto").PaymentDto>;
    payment(requestPaymentDto: RequestPaymentDto, user: UserTokenDto): Promise<import("./dto/payment.dto").PaymentDto[]>;
    findAll(user: UserTokenDto): Promise<import("./dto/payment.dto").PaymentDto[]>;
    findAllByReferrentId(referrentId: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/payment.dto").PaymentDto[]>;
}
