import { Types } from 'mongoose';
import { AdminCreateBusScheduleLayoutDto } from './admin-create-bus-schedule-layout.dto';
declare const AdminUpdateBusScheduleLayoutDto_base: import("@nestjs/mapped-types").MappedType<Partial<AdminCreateBusScheduleLayoutDto>>;
export declare class AdminUpdateBusScheduleLayoutDto extends AdminUpdateBusScheduleLayoutDto_base {
    _id: Types.ObjectId;
    busTemplateId: Types.ObjectId;
}
export {};
