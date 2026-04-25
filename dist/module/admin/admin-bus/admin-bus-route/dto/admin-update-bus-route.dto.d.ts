import { AdminCreateBusRouteDto } from './admin-create-bus-route.dto';
import { Types } from 'mongoose';
declare const AdminUpdateBusRouteDto_base: import("@nestjs/mapped-types").MappedType<Partial<AdminCreateBusRouteDto>>;
export declare class AdminUpdateBusRouteDto extends AdminUpdateBusRouteDto_base {
    _id: Types.ObjectId;
}
export {};
