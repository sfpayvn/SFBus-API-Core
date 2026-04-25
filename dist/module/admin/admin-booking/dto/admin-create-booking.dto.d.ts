import { Types } from 'mongoose';
export declare class AdminCreateBookingItemSeatDto {
    _id: Types.ObjectId;
    seatNumber: string;
    name: string;
    status: string;
}
export declare class AdminCreateBookingItemDto {
    _id: Types.ObjectId;
    bookingItemNumber: string;
    seat: AdminCreateBookingItemSeatDto;
    price: number;
    discountAmount: number;
    afterDiscountPrice: number;
    departure: Types.ObjectId;
    destination: Types.ObjectId;
    createdBy: Types.ObjectId;
    updatedBy: Types.ObjectId;
}
export declare class AdminCreateBookingUserInforDto {
    name: string;
    email: string;
    phoneNumber: string;
}
export declare class AdminCreateBookingDto {
    tenantId: Types.ObjectId;
    userId: Types.ObjectId;
    userInfo: AdminCreateBookingUserInforDto;
    bookingNumber: string;
    busScheduleId: Types.ObjectId;
    busRouteId: Types.ObjectId;
    bookingItems: AdminCreateBookingItemDto[];
    promotionId?: Types.ObjectId;
    totalPrice: number;
    discountTotalAmount: number;
    afterDiscountTotalPrice: number;
    paymentTime?: Date;
    status: string;
    createdBy: Types.ObjectId;
}
