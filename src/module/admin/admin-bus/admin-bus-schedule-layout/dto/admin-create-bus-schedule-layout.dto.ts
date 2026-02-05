import { Types } from 'mongoose';
import { AdminCreateBusLayoutTemplateDto } from '../../admin-bus-layout-template/dto/admin-create-bus-layout-template.dto';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class AdminCreateBusScheduleLayoutDto extends AdminCreateBusLayoutTemplateDto {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  busLayoutTemplateId: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  busScheduleId: Types.ObjectId;
}
