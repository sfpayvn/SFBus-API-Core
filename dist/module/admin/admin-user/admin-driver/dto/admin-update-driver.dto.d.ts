import { Types } from 'mongoose';
import { AdminCreateDriverDto } from './admin-create-driver.dto';
declare const AdminUpdateDriverDto_base: import("@nestjs/mapped-types").MappedType<Partial<AdminCreateDriverDto>>;
export declare class AdminUpdateDriverDto extends AdminUpdateDriverDto_base {
    _id: Types.ObjectId;
}
export {};
