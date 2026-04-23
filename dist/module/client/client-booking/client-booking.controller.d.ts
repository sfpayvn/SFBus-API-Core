import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { ClientBookingService } from './client-booking-service';
import { Types } from 'mongoose';
import { ClientCreateBookingDto } from './dto/client-create-booking.dto';
import { ClientSearchBookingPagingQuery } from './dto/client-booking.dto';
import { PosCancelBookingDto } from '@/module/pos/pos-booking/dto/pos-booking.dto';
export declare class ClientBookingController {
    private readonly clientBookingService;
    constructor(clientBookingService: ClientBookingService);
    create(idempotencyKey: string, ClientCreateBookingDto: ClientCreateBookingDto[], user: UserTokenDto): Promise<import("./dto/client-booking.dto").ClientBookingDto[]>;
    cancelBookingsByUser(body: PosCancelBookingDto, user: UserTokenDto): Promise<boolean>;
    findIncommingBookingByUser(user: UserTokenDto): Promise<import("./dto/client-booking.dto").ClientBookingDto[]>;
    findHistoryByUser(query: ClientSearchBookingPagingQuery, user: UserTokenDto): Promise<import("./dto/client-booking.dto").ClientSearchBookingPagingRes>;
    findOne(id: Types.ObjectId, user: UserTokenDto): Promise<import("../../core/booking/dto/booking.dto").BookingDto>;
    findBookings2Payment(bookingIdsString: string, user: UserTokenDto): Promise<import("../../core/booking/dto/booking.dto").BookingDto[] | null>;
    findAllByScheduleId(busScheduleId: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/client-booking.dto").ClientBookingDto[]>;
}
