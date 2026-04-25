import { CreateBusStationDto } from './create-bus-station.dto';
import { Types } from 'mongoose';
declare const UpdateBusStationDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateBusStationDto>>;
export declare class UpdateBusStationDto extends UpdateBusStationDto_base {
    _id: Types.ObjectId;
}
export {};
