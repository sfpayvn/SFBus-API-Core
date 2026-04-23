import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { DriverPaymentService } from './driver-payment-service';
import { Types } from 'mongoose';
import { DriverRequestPaymentDto } from './dto/driver-payment.dto';
export declare class DriverPaymentController {
    private readonly driverPaymentService;
    constructor(driverPaymentService: DriverPaymentService);
    processBookingPayment(driverRequestPaymentDto: DriverRequestPaymentDto, user: UserTokenDto): Promise<import("./dto/driver-payment.dto").DriverPaymentDto[]>;
    processGoodsPayment(driverRequestPaymentDto: DriverRequestPaymentDto, user: UserTokenDto): Promise<import("./dto/driver-payment.dto").DriverPaymentDto>;
    findAllByReferrentId(referrentId: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/driver-payment.dto").DriverPaymentDto[]>;
}
