import { Types } from 'mongoose';
import { AdminBusScheduleDto } from '../../admin-bus/admin-bus-schedule/dto/admin-bus-schedule.dto';
import { AdminPaymentDto } from '../../admin-payment/dto/admin-payment.dto';
import { AdminPromotionDto } from '../../admin-promotion/dto/admin-promotion.dto';
export declare class AdminUserInforBookingDto {
    name: string;
    email: string;
    phoneNumber: string;
}
export declare class AdminBookingItemSeatDto {
    _id: string;
    seatNumber: string;
    name: string;
    status: string;
}
export declare class AdminBookingItemDto {
    _id: string;
    bookingItemNumber: string;
    seat: AdminBookingItemSeatDto;
    price: number;
    discountAmount: number;
    afterDiscountPrice: number;
    departure: string;
    destination: string;
    createdBy: Types.ObjectId;
    updatedBy: Types.ObjectId;
}
export declare class AdminBookingDto {
    _id: string;
    tenantId: string;
    userId: string;
    quantity: number;
    userInfo: AdminUserInforBookingDto;
    bookingNumber: string;
    busScheduleId: string;
    busRouteId: string;
    busSchedule: AdminBusScheduleDto;
    bookingItems: AdminBookingItemDto[];
    promotion: AdminPromotionDto;
    payments: AdminPaymentDto[];
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
export declare class AdminBookingSortFilter {
    key: string;
    value: string | string[];
}
export declare class AdminSearchBookingPagingQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: AdminBookingSortFilter;
    filters: AdminBookingSortFilter[];
}
export declare class AdminSearchBookingPagingRes {
    pageIdx: number;
    bookings: AdminBookingDto[];
    totalPage: number;
    totalItem: number;
}
export declare class AdminRequestUpdatePaymentMethodByIdsDto {
    bookingIds: Types.ObjectId[];
    paymentMethodId: Types.ObjectId;
    userId: Types.ObjectId;
}
