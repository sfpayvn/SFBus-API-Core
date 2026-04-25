import { Types } from 'mongoose';
import { AdminCreateBusTypeDto } from './admin-create-bus-type.dto';
declare const AdminUpdateBusTypeDto_base: import("@nestjs/mapped-types").MappedType<Partial<AdminCreateBusTypeDto>>;
export declare class AdminUpdateBusTypeDto extends AdminUpdateBusTypeDto_base {
    _id: Types.ObjectId;
}
export {};
