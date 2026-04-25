import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Types } from 'mongoose';

export class CreateSeatDto {
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

export class CreateBusSeatLayoutTemplateDto {
  @IsNotEmpty()
  @Type(() => String)
  name: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateSeatDto)
  seats: CreateSeatDto[];
}

export class CreateBusLayoutTemplateDto {
  @IsNotEmpty()
  @Type(() => String)
  name: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateBusSeatLayoutTemplateDto)
  seatLayouts: CreateBusSeatLayoutTemplateDto[];
}
