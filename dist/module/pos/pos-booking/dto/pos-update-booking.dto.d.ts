import { Types } from 'mongoose';
import { PosCreateBookingDto, PosCreateBookingItemDto, PosCreateBookingItemSeatDto } from './pos-create-booking.dto';
declare const PosUpdateBookingItemSeatDto_base: import("@nestjs/mapped-types").MappedType<Partial<PosCreateBookingItemSeatDto>>;
export declare class PosUpdateBookingItemSeatDto extends PosUpdateBookingItemSeatDto_base {
    _id: Types.ObjectId;
}
declare const PosUpdateBookingItemDto_base: import("@nestjs/mapped-types").MappedType<Omit<PosCreateBookingItemDto, "seat">>;
export declare class PosUpdateBookingItemDto extends PosUpdateBookingItemDto_base {
    _id: Types.ObjectId;
    seat: PosUpdateBookingItemSeatDto;
}
declare const PosUpdateBookingDto_base: import("@nestjs/mapped-types").MappedType<Omit<PosCreateBookingDto, "status" | "bookingItems">>;
export declare class PosUpdateBookingDto extends PosUpdateBookingDto_base {
    _id: Types.ObjectId;
    bookingItems: PosUpdateBookingItemDto[];
}
export {};
