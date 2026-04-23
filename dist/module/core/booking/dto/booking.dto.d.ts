import { Types } from 'mongoose';
import { PaymentDto } from '../../payment/dto/payment.dto';
import { BusScheduleDto } from '../../bus/bus-schedule/dto/bus-schedule.dto';
import { PromotionDto } from '../../promotion/dto/promotion.dto';
export declare class UserInforBookingDto {
    name: string;
    email: string;
    phoneNumber: string;
}
export declare class BookingItemSeatDto {
    _id: string;
    seatNumber: string;
    name: string;
    status: string;
}
export declare class BookingItemDto {
    _id: string;
    bookingItemNumber: string;
    seat: BookingItemSeatDto;
    price: number;
    discountAmount: number;
    afterDiscountPrice: number;
    departure: string;
    destination: string;
    createdBy: Types.ObjectId;
    updatedBy: Types.ObjectId;
}
export declare class BookingDto {
    _id: string;
    tenantId: string;
    userId: string;
    quantity: number;
    userInfo: UserInforBookingDto;
    bookingNumber: string;
    busScheduleId: string;
    busRouteId: string;
    busSchedule: BusScheduleDto;
    bookingItems: BookingItemDto[];
    promotion: PromotionDto;
    payments: PaymentDto[];
    totalPrice: number;
    discountTotalAmount: number;
    afterDiscountTotalPrice: number;
    paymentTime?: Date;
    bookingGroupNumber: string;
    idempotencyKey: string;
    expiresAt?: Date;
    source: string;
    status: string;
    createdAt: Date;
    startDate: Date;
    endDate: Date;
    updatedAt: Date;
    __v: number;
    createdBy: Types.ObjectId;
    updatedBy: Types.ObjectId;
}
export declare class BookingSortFilter {
    key: string;
    value: string | string[] | Types.ObjectId | Types.ObjectId[];
}
export declare class SearchBookingPagingQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: BookingSortFilter;
    filters: BookingSortFilter[];
}
export declare class SearchBookingPagingRes {
    pageIdx: number;
    bookings: BookingDto[];
    totalPage: number;
    totalItem: number;
}
export declare class RequestUpdatePaymentMethodByIdsDto {
    bookingIds: Types.ObjectId[];
    paymentMethodId: Types.ObjectId;
    userId: Types.ObjectId;
}
