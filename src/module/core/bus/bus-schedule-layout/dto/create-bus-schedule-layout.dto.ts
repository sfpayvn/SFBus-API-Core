import { Types } from 'mongoose';
import { CreateBusLayoutTemplateDto } from '../../bus-layout-template/dto/create-bus-layout-template.dto';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateBusScheduleLayoutDto extends CreateBusLayoutTemplateDto {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  busLayoutTemplateId: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  busScheduleId: Types.ObjectId;
}
