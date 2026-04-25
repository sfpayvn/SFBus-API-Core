import { Types } from 'mongoose';
import { CreateBusTypeDto } from './create-bus-type.dto';
declare const UpdateBusTypeDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateBusTypeDto>>;
export declare class UpdateBusTypeDto extends UpdateBusTypeDto_base {
    _id: Types.ObjectId;
}
export {};
