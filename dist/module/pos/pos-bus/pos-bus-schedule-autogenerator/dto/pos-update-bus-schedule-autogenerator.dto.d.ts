import { Types } from 'mongoose';
import { PosCreateBusScheduleAutogeneratorDto } from './pos-create-bus-schedule-autogenerator.dto';
declare const PosUpdateBusScheduleAutogeneratorDto_base: import("@nestjs/mapped-types").MappedType<Partial<PosCreateBusScheduleAutogeneratorDto>>;
export declare class PosUpdateBusScheduleAutogeneratorDto extends PosUpdateBusScheduleAutogeneratorDto_base {
    _id: Types.ObjectId;
    status?: 'un_published' | 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
}
export {};
