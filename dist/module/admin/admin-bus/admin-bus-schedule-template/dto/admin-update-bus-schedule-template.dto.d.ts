import { Types } from 'mongoose';
import { AdminCreateBusScheduleTemplateDto } from './admin-create-bus-schedule-template.dto';
declare const AdminUpdateBusScheduleTemplateDto_base: import("@nestjs/mapped-types").MappedType<Partial<AdminCreateBusScheduleTemplateDto>>;
export declare class AdminUpdateBusScheduleTemplateDto extends AdminUpdateBusScheduleTemplateDto_base {
    _id: Types.ObjectId;
}
export {};
