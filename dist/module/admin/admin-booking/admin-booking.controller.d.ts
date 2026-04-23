import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { AdminBookingService } from './admin-booking-service';
import { Types } from 'mongoose';
import { AdminCreateBookingDto } from './dto/admin-create-booking.dto';
import { AdminUpdateBookingDto } from './dto/admin-update-booking.dto';
import { AdminSearchBookingPagingQuery } from './dto/admin-booking.dto';
export declare class AdminBookingController {
    private readonly adminBookingService;
    constructor(adminBookingService: AdminBookingService);
    create(idempotencyKey: string, AdminCreateBookingDto: AdminCreateBookingDto[], user: UserTokenDto): Promise<import("./dto/admin-booking.dto").AdminBookingDto[]>;
    update(AdminUpdateBusScheduleDto: AdminUpdateBookingDto, user: UserTokenDto): Promise<import("./dto/admin-booking.dto").AdminBookingDto>;
    findOne(id: Types.ObjectId, user: UserTokenDto): Promise<import("../../core/booking/dto/booking.dto").BookingDto>;
    findAllByScheduleId(busScheduleId: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/admin-booking.dto").AdminBookingDto[]>;
    search(query: AdminSearchBookingPagingQuery, user: UserTokenDto): Promise<import("./dto/admin-booking.dto").AdminSearchBookingPagingRes>;
}
