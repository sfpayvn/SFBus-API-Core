import { Types } from 'mongoose';
import { PosBusScheduleDto } from '../../pos-bus/pos-bus-schedule/dto/pos-bus-schedule.dto';
import { PosPaymentDto } from '../../pos-payment/dto/pos-payment.dto';
import { PosPromotionDto } from '../../pos-promotion/dto/pos-promotion.dto';
export declare class PosUserInforBookingDto {
    name: string;
    email: string;
    phoneNumber: string;
}
export declare class PosBookingItemSeatDto {
    _id: string;
    seatNumber: string;
    name: string;
    status: string;
}
export declare class PosBookingItemDto {
    _id: string;
    bookingItemNumber: string;
    seat: PosBookingItemSeatDto;
    price: number;
    discountAmount: number;
    afterDiscountPrice: number;
    departure: string;
    destination: string;
    createdBy: Types.ObjectId;
    updatedBy: Types.ObjectId;
}
export declare class PosBookingDto {
    _id: string;
    tenantId: string;
    userId: string;
    quantity: number;
    userInfo: PosUserInforBookingDto;
    bookingNumber: string;
    busScheduleId: string;
    busRouteId: string;
    busSchedule: PosBusScheduleDto;
    bookingItems: PosBookingItemDto[];
    promotion: PosPromotionDto;
    payments: PosPaymentDto[];
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
export declare class PosBookingSortFilter {
    key: string;
    value: string | string[];
}
export declare class PosSearchBookingPagingQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: PosBookingSortFilter;
    filters: PosBookingSortFilter[];
}
export declare class PosSearchBookingPagingRes {
    pageIdx: number;
    bookings: PosBookingDto[];
    totalPage: number;
    totalItem: number;
}
export declare class PosRequestUpdatePaymentMethodByIdsDto {
    bookingIds: Types.ObjectId[];
    paymentMethodId: Types.ObjectId;
    userId: Types.ObjectId;
}
export declare class PosCancelBookingDto {
    busScheduleId: Types.ObjectId;
    bookingIds: Types.ObjectId[];
}
