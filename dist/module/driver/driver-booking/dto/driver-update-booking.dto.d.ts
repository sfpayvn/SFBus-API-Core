import { Types } from 'mongoose';
import { DriverCreateBookingDto, DriverCreateBookingItemDto, DriverCreateBookingItemSeatDto } from './driver-create-booking.dto';
declare const DriverUpdateBookingItemSeatDto_base: import("@nestjs/mapped-types").MappedType<Partial<DriverCreateBookingItemSeatDto>>;
export declare class DriverUpdateBookingItemSeatDto extends DriverUpdateBookingItemSeatDto_base {
    _id: Types.ObjectId;
}
declare const DriverUpdateBookingItemDto_base: import("@nestjs/mapped-types").MappedType<Omit<DriverCreateBookingItemDto, "seat">>;
export declare class DriverUpdateBookingItemDto extends DriverUpdateBookingItemDto_base {
    _id: Types.ObjectId;
    seat: DriverUpdateBookingItemSeatDto;
}
declare const DriverUpdateBookingDto_base: import("@nestjs/mapped-types").MappedType<Omit<DriverCreateBookingDto, "status" | "bookingItems">>;
export declare class DriverUpdateBookingDto extends DriverUpdateBookingDto_base {
    _id: Types.ObjectId;
    bookingItems: DriverUpdateBookingItemDto[];
}
export declare class DriverRequestUpdateBookingItemBoardingDto {
    status: string;
    bookingItemIds: Types.ObjectId[];
    busScheduleId: Types.ObjectId;
}
export {};
