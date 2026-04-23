import { Types } from 'mongoose';
import { CreateBusScheduleTemplateDto } from './create-bus-schedule-template.dto';
declare const UpdateBusScheduleTemplateDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateBusScheduleTemplateDto>>;
export declare class UpdateBusScheduleTemplateDto extends UpdateBusScheduleTemplateDto_base {
    _id: Types.ObjectId;
}
export {};
