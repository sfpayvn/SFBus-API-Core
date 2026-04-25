import { Types } from 'mongoose';
import { AdminCreateBusLayoutTemplateDto } from '../../admin-bus-layout-template/dto/admin-create-bus-layout-template.dto';
export declare class AdminCreateBusScheduleLayoutDto extends AdminCreateBusLayoutTemplateDto {
    busLayoutTemplateId: Types.ObjectId;
    busScheduleId: Types.ObjectId;
}
