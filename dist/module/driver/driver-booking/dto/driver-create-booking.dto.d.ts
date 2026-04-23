import { Types } from 'mongoose';
export declare class DriverCreateBookingItemSeatDto {
    _id: Types.ObjectId;
    seatNumber: string;
    name: string;
    status: string;
}
export declare class DriverCreateBookingItemDto {
    _id: Types.ObjectId;
    bookingItemNumber: string;
    seat: DriverCreateBookingItemSeatDto;
    price: number;
    discountAmount: number;
    afterDiscountPrice: number;
    departure: Types.ObjectId;
    destination: Types.ObjectId;
}
export declare class DriverCreateBookingUserInforDto {
    name: string;
    email: string;
    phoneNumber: string;
}
export declare class DriverCreateBookingDto {
    tenantId: Types.ObjectId;
    userId: Types.ObjectId;
    userInfo: DriverCreateBookingUserInforDto;
    bookingNumber: string;
    busScheduleId: Types.ObjectId;
    busRouteId: Types.ObjectId;
    bookingItems: DriverCreateBookingItemDto[];
    promotionId?: Types.ObjectId;
    totalPrice: number;
    discountTotalAmount: number;
    afterDiscountTotalPrice: number;
    paymentTime?: Date;
    status: string;
    startDate: Date;
    endDate: Date;
}
