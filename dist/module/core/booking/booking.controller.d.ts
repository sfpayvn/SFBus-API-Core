import { Types } from 'mongoose';
import { BookingService } from './booking-service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto, UpdateBookingItemDto } from './dto/update-booking.dto';
import { SearchBookingPagingQuery } from './dto/booking.dto';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    create(idempotencyKey: string, createBookings: CreateBookingDto[], user: UserTokenDto): Promise<import("./dto/booking.dto").BookingDto[]>;
    cancelBookings(bookingIdsString: string, user: UserTokenDto): Promise<boolean>;
    findOneBookingsByBookingItemId(bookingItemId: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/booking.dto").BookingDto>;
    findOneByBookingNumber(bookingNumber: string, user: UserTokenDto): Promise<import("./dto/booking.dto").BookingDto>;
    findAll(user: UserTokenDto): Promise<import("./dto/booking.dto").BookingDto[]>;
    findAllByPaymentNumber(bookingGroupNumber: string, user: UserTokenDto): Promise<import("./dto/booking.dto").BookingDto[]>;
    findByIds(bookingIdsString: string, user: UserTokenDto): Promise<import("./dto/booking.dto").BookingDto[] | null>;
    findAllByScheduleId(busScheduleId: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/booking.dto").BookingDto[]>;
    findAllByUser(user: UserTokenDto): Promise<import("./dto/booking.dto").BookingDto[]>;
    findOneByIdAndUser(bookingId: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/booking.dto").BookingDto | null>;
    findOneByIdsAndUser(bookingIdsString: string, user: UserTokenDto): Promise<import("./dto/booking.dto").BookingDto[] | null>;
    findBookings2Payment(bookingIdsString: string, user: UserTokenDto): Promise<import("./dto/booking.dto").BookingDto[] | null>;
    findBookingSeats(seatIds: Types.ObjectId[], user: UserTokenDto): Promise<Types.ObjectId[] | null>;
    updateBookingItem(updateBookingItemDto: UpdateBookingItemDto | UpdateBookingItemDto[], busScheduleId: Types.ObjectId, user: UserTokenDto): Promise<(import("./dto/booking.dto").BookingItemDto & {
        _oldData?: any;
    })[]>;
    update(updateBusScheduleDto: UpdateBookingDto, user: UserTokenDto): Promise<import("./dto/booking.dto").BookingDto & {
        _oldData?: any;
    }>;
    search(query: SearchBookingPagingQuery, user: UserTokenDto): Promise<import("./dto/booking.dto").SearchBookingPagingRes>;
}
