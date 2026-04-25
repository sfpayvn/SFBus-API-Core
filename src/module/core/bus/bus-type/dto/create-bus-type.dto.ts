import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateBusTypeDto {
  @IsNotEmpty()
  @Type(() => String)
  name: string;
}
