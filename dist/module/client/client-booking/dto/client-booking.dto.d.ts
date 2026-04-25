import { Types } from 'mongoose';
import { ClientBusScheduleDto } from '../../client-bus/client-bus-schedule/dto/client-bus-schedule.dto';
import { ClientPaymentDto } from '../../client-payment/dto/client-payment.dto';
import { ClientPromotionDto } from '../../client-promotion/dto/client-promotion.dto';
export declare class ClientUserInforBookingDto {
    name: string;
    email: string;
    phoneNumber: string;
}
export declare class ClientBookingItemSeatDto {
    _id: string;
    seatNumber: string;
    name: string;
    status: string;
}
export declare class ClientBookingItemDto {
    _id: string;
    bookingItemNumber: string;
    seat: ClientBookingItemSeatDto;
    price: number;
    discountAmount: number;
    afterDiscountPrice: number;
    departure: string;
    destination: string;
    createdBy: Types.ObjectId;
    updatedBy: Types.ObjectId;
}
export declare class ClientBookingDto {
    _id: string;
    tenantId: string;
    userId: string;
    quantity: number;
    userInfo: ClientUserInforBookingDto;
    bookingNumber: string;
    busScheduleId: string;
    busRouteId: string;
    busSchedule: ClientBusScheduleDto;
    bookingItems: ClientBookingItemDto[];
    promotion: ClientPromotionDto;
    payments: ClientPaymentDto[];
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
export declare class ClientBookingSortFilter {
    key: string;
    value: string | string[] | Types.ObjectId | Types.ObjectId[];
}
export declare class ClientSearchBookingPagingQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: ClientBookingSortFilter;
    filters: ClientBookingSortFilter[];
}
export declare class ClientSearchBookingPagingRes {
    pageIdx: number;
    bookings: ClientBookingDto[];
    totalPage: number;
    totalItem: number;
}
export declare class ClientRequestUpdatePaymentMethodByIdsDto {
    bookingIds: Types.ObjectId[];
    paymentMethodId: Types.ObjectId;
    userId: Types.ObjectId;
}
