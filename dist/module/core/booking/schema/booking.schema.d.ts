import { Document, Types } from 'mongoose';
import { PromotionDocument } from '../../promotion/schema/promotion.schema';
export declare class UserInforBookingDocument {
    name: string;
    email: string;
    phoneNumber: string;
}
export declare class UserPaymentInforBookingDocument {
    name: string;
    email: string;
    phoneNumber: string;
}
export declare class BookingItemSeatDocument extends Document {
    _id: Types.ObjectId;
    seatNumber: number;
    name: string;
    typeId: Types.ObjectId;
    status: string;
    createdBy: Types.ObjectId;
    updatedBy: Types.ObjectId;
}
export declare class BookingItemDocument extends Document {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    bookingItemNumber: string;
    seat: BookingItemSeatDocument;
    price: number;
    discountAmount: number;
    afterDiscountPrice: number;
    departure: Types.ObjectId;
    destination: Types.ObjectId;
    createdBy: Types.ObjectId;
    updatedBy: Types.ObjectId;
}
export declare class BookingDocument extends Document {
    tenantId: Types.ObjectId;
    quantity: number;
    bookingNumber: string;
    userId: Types.ObjectId;
    userInfo: UserInforBookingDocument;
    busScheduleId: Types.ObjectId;
    busRouteId: Types.ObjectId;
    bookingItems: BookingItemDocument[];
    promotion: PromotionDocument;
    totalPrice: number;
    discountTotalAmount: number;
    afterDiscountTotalPrice: number;
    appliedFees: Array<{
        name: string;
        amount: number;
        feeType: string;
    }>;
    appliedTaxes: Array<{
        name: string;
        amount: number;
        feeType: string;
    }>;
    totalFeeAmount: number;
    totalTaxAmount: number;
    paymentTime?: Date;
    bookingGroupNumber: string;
    status: string;
    startDate: Date;
    endDate: Date;
    idempotencyKey: string;
    source: string;
    expiresAt: Date;
    createdBy: Types.ObjectId;
    updatedBy: Types.ObjectId;
}
export declare const BookingSchema: import("mongoose").Schema<BookingDocument, import("mongoose").Model<BookingDocument, any, any, any, Document<unknown, any, BookingDocument> & BookingDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BookingDocument, Document<unknown, {}, import("mongoose").FlatRecord<BookingDocument>> & import("mongoose").FlatRecord<BookingDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
