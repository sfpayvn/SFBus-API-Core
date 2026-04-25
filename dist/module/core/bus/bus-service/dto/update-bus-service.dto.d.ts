import { CreateBusServiceDto } from './create-bus-service.dto';
import { Types } from 'mongoose';
declare const UpdateBusServiceDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateBusServiceDto>>;
export declare class UpdateBusServiceDto extends UpdateBusServiceDto_base {
    _id: Types.ObjectId;
}
export {};
