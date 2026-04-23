import { Types } from 'mongoose';
import { AdminCreateBookingDto, AdminCreateBookingItemDto, AdminCreateBookingItemSeatDto } from './admin-create-booking.dto';
declare const AdminUpdateBookingItemSeatDto_base: import("@nestjs/mapped-types").MappedType<Partial<AdminCreateBookingItemSeatDto>>;
export declare class AdminUpdateBookingItemSeatDto extends AdminUpdateBookingItemSeatDto_base {
    _id: Types.ObjectId;
}
declare const AdminUpdateBookingItemDto_base: import("@nestjs/mapped-types").MappedType<Omit<AdminCreateBookingItemDto, "seat">>;
export declare class AdminUpdateBookingItemDto extends AdminUpdateBookingItemDto_base {
    _id: Types.ObjectId;
    seat: AdminUpdateBookingItemSeatDto;
}
declare const AdminUpdateBookingDto_base: import("@nestjs/mapped-types").MappedType<Omit<AdminCreateBookingDto, "status" | "bookingItems">>;
export declare class AdminUpdateBookingDto extends AdminUpdateBookingDto_base {
    _id: Types.ObjectId;
    bookingItems: AdminUpdateBookingItemDto[];
}
export {};
