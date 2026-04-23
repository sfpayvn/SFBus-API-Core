import { AdminCreateBusProvinceDto } from './admin-create-bus-province.dto';
import { Types } from 'mongoose';
declare const AdminUpdateBusProvinceDto_base: import("@nestjs/mapped-types").MappedType<Partial<AdminCreateBusProvinceDto>>;
export declare class AdminUpdateBusProvinceDto extends AdminUpdateBusProvinceDto_base {
    _id: Types.ObjectId;
}
export {};
