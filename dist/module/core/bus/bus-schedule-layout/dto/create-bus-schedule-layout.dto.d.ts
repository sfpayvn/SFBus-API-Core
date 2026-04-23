import { Types } from 'mongoose';
import { CreateBusLayoutTemplateDto } from '../../bus-layout-template/dto/create-bus-layout-template.dto';
export declare class CreateBusScheduleLayoutDto extends CreateBusLayoutTemplateDto {
    busLayoutTemplateId: Types.ObjectId;
    busScheduleId: Types.ObjectId;
}
