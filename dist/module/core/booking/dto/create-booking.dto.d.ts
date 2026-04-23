import { Types } from 'mongoose';
export declare class CreateBookingItemSeatDto {
    _id: Types.ObjectId;
    seatNumber: string;
    name: string;
    status: string;
}
export declare class CreateBookingItemDto {
    _id: Types.ObjectId;
    bookingItemNumber: string;
    seat: CreateBookingItemSeatDto;
    price: number;
    discountAmount: number;
    afterDiscountPrice: number;
    departure: Types.ObjectId;
    destination: Types.ObjectId;
}
export declare class CreateBookingUserInforDto {
    name: string;
    email: string;
    phoneNumber: string;
}
export declare class CreateBookingDto {
    tenantId: Types.ObjectId;
    userId: Types.ObjectId;
    userInfo: CreateBookingUserInforDto;
    bookingNumber: string;
    busScheduleId: Types.ObjectId;
    busRouteId: Types.ObjectId;
    bookingItems: CreateBookingItemDto[];
    promotionId?: Types.ObjectId;
    totalPrice: number;
    discountTotalAmount: number;
    afterDiscountTotalPrice: number;
    paymentTime?: Date;
    status: string;
    source?: string;
    createdBy: Types.ObjectId;
}
