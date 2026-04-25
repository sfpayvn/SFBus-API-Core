import { Types } from 'mongoose';
export declare class PosCreateBookingItemSeatDto {
    _id: Types.ObjectId;
    seatNumber: string;
    name: string;
    status: string;
}
export declare class PosCreateBookingItemDto {
    _id: Types.ObjectId;
    bookingItemNumber: string;
    seat: PosCreateBookingItemSeatDto;
    price: number;
    discountAmount: number;
    afterDiscountPrice: number;
    departure: Types.ObjectId;
    destination: Types.ObjectId;
}
export declare class PosCreateBookingUserInforDto {
    name: string;
    email: string;
    phoneNumber: string;
}
export declare class PosCreateBookingDto {
    tenantId: Types.ObjectId;
    createBy: Types.ObjectId;
    userId: Types.ObjectId;
    userInfo: PosCreateBookingUserInforDto;
    bookingNumber: string;
    busScheduleId: Types.ObjectId;
    busRouteId: Types.ObjectId;
    bookingItems: PosCreateBookingItemDto[];
    promotionId?: Types.ObjectId;
    totalPrice: number;
    discountTotalAmount: number;
    afterDiscountTotalPrice: number;
    paymentTime?: Date;
    status: string;
    createdBy: Types.ObjectId;
}
