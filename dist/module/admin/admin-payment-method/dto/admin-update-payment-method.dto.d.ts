import { Types } from 'mongoose';
import { AdminCreatePaymentMethodDto } from './admin-create-payment-method.dto';
declare const AdminUpdatePaymentMethodDto_base: import("@nestjs/mapped-types").MappedType<Partial<AdminCreatePaymentMethodDto>>;
export declare class AdminUpdatePaymentMethodDto extends AdminUpdatePaymentMethodDto_base {
    _id: Types.ObjectId;
}
export {};
