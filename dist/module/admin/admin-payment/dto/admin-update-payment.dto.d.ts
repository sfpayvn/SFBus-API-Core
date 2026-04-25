import { Types } from 'mongoose';
import { AdminCreatePaymentDto } from './admin-create-payment.dto';
declare const AdminUpdatePaymentDto_base: import("@nestjs/mapped-types").MappedType<Partial<AdminCreatePaymentDto>>;
export declare class AdminUpdatePaymentDto extends AdminUpdatePaymentDto_base {
    _id: Types.ObjectId;
}
export declare class AdminRequestUpdatePaymentByRedeemPromotionDto {
    referrentId: Types.ObjectId;
    bookingItemId: Types.ObjectId;
    promotionId?: Types.ObjectId;
    discountAmount: number;
}
export {};
