import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Types } from 'mongoose';

export class AdminCreateSeatDto {
  @IsNotEmpty()
  @Type(() => Number)
  index: number;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  typeId: Types.ObjectId;

  @IsOptional()
  @Type(() => String)
  name: string;

  @IsOptional()
  @Type(() => String)
  status: string;
}

export class AdminCreateBusSeatLayoutTemplateDto {
  @IsNotEmpty()
  @Type(() => String)
  name: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AdminCreateSeatDto)
  seats: AdminCreateSeatDto[];
}

export class AdminCreateBusLayoutTemplateDto {
  @IsNotEmpty()
  @Type(() => String)
  name: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AdminCreateBusSeatLayoutTemplateDto)
  seatLayouts: AdminCreateBusSeatLayoutTemplateDto[];
}
