import { Types } from 'mongoose';
import { AdminCreateBusStationDto } from './admin-create-bus-station.dto';
declare const AdminUpdateBusStationDto_base: import("@nestjs/mapped-types").MappedType<Partial<AdminCreateBusStationDto>>;
export declare class AdminUpdateBusStationDto extends AdminUpdateBusStationDto_base {
    _id: Types.ObjectId;
}
export {};
