import { AdminCreateGoodsDto } from './admin-create-goods.dto';
import { Types } from 'mongoose';
declare const AdminUpdateGoodsDto_base: import("@nestjs/mapped-types").MappedType<Partial<AdminCreateGoodsDto>>;
export declare class AdminUpdateGoodsDto extends AdminUpdateGoodsDto_base {
    _id: Types.ObjectId;
    status: string;
}
export {};
