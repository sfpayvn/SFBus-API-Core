import { Types } from 'mongoose';
import { CreateBusScheduleAutogeneratorDto } from './create-bus-schedule-autogenerator.dto';
declare const UpdateBusScheduleAutogeneratorDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateBusScheduleAutogeneratorDto>>;
export declare class UpdateBusScheduleAutogeneratorDto extends UpdateBusScheduleAutogeneratorDto_base {
    _id: Types.ObjectId;
}
export {};
