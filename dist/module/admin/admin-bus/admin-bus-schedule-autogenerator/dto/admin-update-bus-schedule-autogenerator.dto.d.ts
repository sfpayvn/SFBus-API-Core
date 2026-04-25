import { Types } from 'mongoose';
import { AdminCreateBusScheduleAutogeneratorDto } from './admin-create-bus-schedule-autogenerator.dto';
declare const AdminUpdateBusScheduleAutogeneratorDto_base: import("@nestjs/mapped-types").MappedType<Partial<AdminCreateBusScheduleAutogeneratorDto>>;
export declare class AdminUpdateBusScheduleAutogeneratorDto extends AdminUpdateBusScheduleAutogeneratorDto_base {
    _id: Types.ObjectId;
    status?: string;
}
export {};
