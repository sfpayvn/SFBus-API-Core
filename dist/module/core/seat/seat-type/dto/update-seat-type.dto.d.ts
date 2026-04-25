import { Types } from 'mongoose';
import { CreateSeatTypeDto } from './create-seat-type.dto';
declare const UpdateSeatTypeDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateSeatTypeDto>>;
export declare class UpdateSeatTypeDto extends UpdateSeatTypeDto_base {
    _id: Types.ObjectId;
}
export {};
