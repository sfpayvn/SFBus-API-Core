import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { AdminPaymentService } from './admin-payment-service';
import { Types } from 'mongoose';
import { AdminRequestPaymentDto } from './dto/admin-payment.dto';
export declare class AdminPaymentController {
    private readonly adminPaymentService;
    constructor(adminPaymentService: AdminPaymentService);
    processBookingPayment(adminRequestPaymentDto: AdminRequestPaymentDto, user: UserTokenDto): Promise<import("./dto/admin-payment.dto").AdminPaymentDto[]>;
    processGoodsPayment(adminRequestPaymentDto: AdminRequestPaymentDto, user: UserTokenDto): Promise<import("./dto/admin-payment.dto").AdminPaymentDto>;
    findAllByReferrentId(referrentId: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/admin-payment.dto").AdminPaymentDto[]>;
}
