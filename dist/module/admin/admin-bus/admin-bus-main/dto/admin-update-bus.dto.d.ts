import { Types } from 'mongoose';
import { AdminCreateBusDto } from './admin-create-bus.dto';
declare const AdminUpdateBusDto_base: import("@nestjs/mapped-types").MappedType<Partial<AdminCreateBusDto>>;
export declare class AdminUpdateBusDto extends AdminUpdateBusDto_base {
    _id: Types.ObjectId;
}
export {};
