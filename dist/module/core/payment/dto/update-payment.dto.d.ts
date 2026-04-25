import { Types } from 'mongoose';
import { CreatePaymentDto } from './create-payment.dto';
declare const UpdatePaymentDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreatePaymentDto>>;
export declare class UpdatePaymentDto extends UpdatePaymentDto_base {
    _id: Types.ObjectId;
}
export declare class RequestUpdatePaymentByRedeemPromotionDto {
    referrentId: Types.ObjectId;
    bookingItemId: Types.ObjectId;
    promotionId?: Types.ObjectId;
    discountAmount: number;
}
export {};
