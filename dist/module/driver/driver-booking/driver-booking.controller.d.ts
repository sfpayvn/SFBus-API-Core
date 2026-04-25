import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { DriverBookingService } from './driver-booking-service';
import { Types } from 'mongoose';
import { DriverRequestUpdateBookingItemBoardingDto, DriverUpdateBookingItemDto } from './dto/driver-update-booking.dto';
import { DriverSearchBookingPagingQuery } from './dto/driver-booking.dto';
export declare class DriverBookingController {
    private readonly driverBookingService;
    constructor(driverBookingService: DriverBookingService);
    updateBookingItems(driverUpdateBookingItemDto: DriverUpdateBookingItemDto[], busScheduleId: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/driver-booking.dto").DriverBookingItemDto>;
    updateBookingItemBoarding(dto: DriverRequestUpdateBookingItemBoardingDto, user: UserTokenDto): Promise<(import("../../core/booking/dto/booking.dto").BookingItemDto & {
        _oldData?: any;
    })[]>;
    findOne(id: Types.ObjectId, user: UserTokenDto): Promise<import("../../core/booking/dto/booking.dto").BookingDto>;
    findAllByScheduleId(busScheduleId: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/driver-booking.dto").DriverBookingDto[]>;
    findOneBookingsByBookingItemId(bookingItemId: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/driver-booking.dto").DriverBookingDto>;
    search(query: DriverSearchBookingPagingQuery, user: UserTokenDto): Promise<import("./dto/driver-booking.dto").DriverSearchBookingPagingRes>;
}
