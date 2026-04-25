import { CreateBookingDto, CreateBookingItemDto, CreateBookingItemSeatDto } from './create-booking.dto';
import { Types } from 'mongoose';
declare const UpdateBookingItemSeatDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateBookingItemSeatDto>>;
export declare class UpdateBookingItemSeatDto extends UpdateBookingItemSeatDto_base {
    _id: Types.ObjectId;
}
declare const UpdateBookingItemDto_base: import("@nestjs/mapped-types").MappedType<Omit<CreateBookingItemDto, "seat">>;
export declare class UpdateBookingItemDto extends UpdateBookingItemDto_base {
    _id: Types.ObjectId;
    seat: UpdateBookingItemSeatDto;
}
declare const UpdateBookingDto_base: import("@nestjs/mapped-types").MappedType<Omit<CreateBookingDto, "status" | "bookingItems">>;
export declare class UpdateBookingDto extends UpdateBookingDto_base {
    _id: Types.ObjectId;
    bookingItems: UpdateBookingItemDto[];
}
export {};
