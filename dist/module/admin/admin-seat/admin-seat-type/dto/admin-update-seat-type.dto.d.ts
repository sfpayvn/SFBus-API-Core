import { Types } from 'mongoose';
import { AdminCreateSeatTypeDto } from './admin-create-seat-type.dto';
declare const AdminUpdateSeatTypeDto_base: import("@nestjs/mapped-types").MappedType<Partial<AdminCreateSeatTypeDto>>;
export declare class AdminUpdateSeatTypeDto extends AdminUpdateSeatTypeDto_base {
    _id: Types.ObjectId;
}
export {};
