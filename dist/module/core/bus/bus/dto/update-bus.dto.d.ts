import { CreateBusDto } from './create-bus.dto';
import { Types } from 'mongoose';
declare const UpdateBusDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateBusDto>>;
export declare class UpdateBusDto extends UpdateBusDto_base {
    _id: Types.ObjectId;
}
export {};
