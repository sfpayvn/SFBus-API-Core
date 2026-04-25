import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { PosPaymentService } from './pos-payment-service';
import { Types } from 'mongoose';
import { PosRequestPaymentDto } from './dto/pos-payment.dto';
export declare class PosPaymentController {
    private readonly posPaymentService;
    constructor(posPaymentService: PosPaymentService);
    processBookingPayment(posRequestPaymentDto: PosRequestPaymentDto, user: UserTokenDto): Promise<import("./dto/pos-payment.dto").PosPaymentDto[]>;
    processGoodsPayment(posRequestPaymentDto: PosRequestPaymentDto, user: UserTokenDto): Promise<import("./dto/pos-payment.dto").PosPaymentDto>;
    findAllByReferrentId(referrentId: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/pos-payment.dto").PosPaymentDto[]>;
}
