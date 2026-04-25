import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { PosBookingService } from './pos-booking-service';
import { Types } from 'mongoose';
import { PosCreateBookingDto } from './dto/pos-create-booking.dto';
import { PosUpdateBookingDto } from './dto/pos-update-booking.dto';
import { PosCancelBookingDto, PosSearchBookingPagingQuery } from './dto/pos-booking.dto';
export declare class PosBookingController {
    private readonly posBookingService;
    constructor(posBookingService: PosBookingService);
    create(idempotencyKey: string, posCreateBookingDto: PosCreateBookingDto[], user: UserTokenDto): Promise<import("./dto/pos-booking.dto").PosBookingDto[]>;
    cancelBookings(body: PosCancelBookingDto, user: UserTokenDto): Promise<boolean>;
    update(posUpdateBookingDto: PosUpdateBookingDto, user: UserTokenDto): Promise<import("./dto/pos-booking.dto").PosBookingDto>;
    updates(posUpdateBookingsDto: PosUpdateBookingDto[], user: UserTokenDto): Promise<import("./dto/pos-booking.dto").PosBookingDto[]>;
    findOne(id: Types.ObjectId, user: UserTokenDto): Promise<import("../../core/booking/dto/booking.dto").BookingDto>;
    findAllByScheduleId(busScheduleId: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/pos-booking.dto").PosBookingDto[]>;
    search(query: PosSearchBookingPagingQuery, user: UserTokenDto): Promise<import("./dto/pos-booking.dto").PosSearchBookingPagingRes>;
}
