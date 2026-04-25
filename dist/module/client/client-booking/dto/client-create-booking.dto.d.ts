import { Types } from 'mongoose';
export declare class ClientCreateBookingItemSeatDto {
    _id: Types.ObjectId;
    seatNumber: string;
    name: string;
    status: string;
}
export declare class ClientCreateBookingItemDto {
    _id: Types.ObjectId;
    bookingItemNumber: string;
    seat: ClientCreateBookingItemSeatDto;
    price: number;
    discountAmount: number;
    afterDiscountPrice: number;
    departure: Types.ObjectId;
    destination: Types.ObjectId;
    createdBy: Types.ObjectId;
    updatedBy: Types.ObjectId;
}
export declare class ClientCreateBookingUserInforDto {
    name: string;
    email: string;
    phoneNumber: string;
}
export declare class ClientCreateBookingDto {
    tenantId: Types.ObjectId;
    userId: Types.ObjectId;
    userInfo: ClientCreateBookingUserInforDto;
    bookingNumber: string;
    busScheduleId: Types.ObjectId;
    busRouteId: Types.ObjectId;
    bookingItems: ClientCreateBookingItemDto[];
    promotionId?: Types.ObjectId;
    totalPrice: number;
    discountTotalAmount: number;
    afterDiscountTotalPrice: number;
    paymentTime?: Date;
    status: string;
    createdBy: Types.ObjectId;
}
