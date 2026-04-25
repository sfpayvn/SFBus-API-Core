import { Types } from 'mongoose';
import { CreateBusScheduleLayoutDto } from './create-bus-schedule-layout.dto';
declare const UpdateBusScheduleLayoutDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateBusScheduleLayoutDto>>;
export declare class UpdateBusScheduleLayoutDto extends UpdateBusScheduleLayoutDto_base {
    _id: Types.ObjectId;
    busTemplateId: Types.ObjectId;
}
export {};
