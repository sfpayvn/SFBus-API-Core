import { Types } from 'mongoose';
import { DriverBusScheduleDto } from '../../driver-bus/driver-bus-schedule/dto/driver-bus-schedule.dto';
import { DriverPaymentDto } from '../../driver-payment/dto/driver-payment.dto';
import { DriverPromotionDto } from '../../driver-promotion/dto/driver-promotion.dto';
export declare class DriverUserInforBookingDto {
    name: string;
    email: string;
    phoneNumber: string;
}
export declare class DriverBookingItemSeatDto {
    _id: string;
    seatNumber: string;
    name: string;
    status: string;
}
export declare class DriverBookingItemDto {
    _id: string;
    bookingItemNumber: string;
    seat: DriverBookingItemSeatDto;
    price: number;
    discountAmount: number;
    afterDiscountPrice: number;
    departure: string;
    destination: string;
    createdBy: Types.ObjectId;
    updatedBy: Types.ObjectId;
}
export declare class DriverBookingDto {
    _id: string;
    tenantId: string;
    userId: string;
    quantity: number;
    userInfo: DriverUserInforBookingDto;
    bookingNumber: string;
    busScheduleId: string;
    busRouteId: string;
    busSchedule: DriverBusScheduleDto;
    bookingItems: DriverBookingItemDto[];
    promotion: DriverPromotionDto;
    payments: DriverPaymentDto[];
    totalPrice: number;
    discountTotalAmount: number;
    afterDiscountTotalPrice: number;
    paymentTime?: Date;
    bookingGroupNumber: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    createdBy: Types.ObjectId;
    updatedBy: Types.ObjectId;
}
export declare class DriverBookingSortFilter {
    key: string;
    value: string | string[];
}
export declare class DriverSearchBookingPagingQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: DriverBookingSortFilter;
    filters: DriverBookingSortFilter[];
}
export declare class DriverSearchBookingPagingRes {
    pageIdx: number;
    bookings: DriverBookingDto[];
    totalPage: number;
    totalItem: number;
}
export declare class DriverRequestUpdatePaymentMethodByIdsDto {
    bookingIds: Types.ObjectId[];
    paymentMethodId: Types.ObjectId;
    userId: Types.ObjectId;
}
