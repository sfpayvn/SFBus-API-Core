import { Types } from 'mongoose';
import { AdminCreateBusServiceDto } from './admin-create-bus-service.dto';
declare const AdminUpdateBusServiceDto_base: import("@nestjs/mapped-types").MappedType<Partial<AdminCreateBusServiceDto>>;
export declare class AdminUpdateBusServiceDto extends AdminUpdateBusServiceDto_base {
    _id: Types.ObjectId;
}
export {};
