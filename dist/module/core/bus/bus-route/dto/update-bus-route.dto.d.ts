import { CreateBusRouteDto } from './create-bus-route.dto';
import { Types } from 'mongoose';
declare const UpdateBusRouteDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateBusRouteDto>>;
export declare class UpdateBusRouteDto extends UpdateBusRouteDto_base {
    _id: Types.ObjectId;
}
export {};
