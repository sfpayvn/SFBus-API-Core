import { Types } from 'mongoose';
import { BusLayoutTemplateDto } from '../../bus-layout-template/dto/bus-layout-template.dto';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class BusScheduleLayoutSeatDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  index: number;

  @Expose()
  typeId: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  status: string;

  @Expose()
  bookingId: Types.ObjectId;

  @Expose()
  bookingStatus: string;

  @Expose()
  bookingNumber: string;
}

export class BusScheduleSeatLayoutTemplateDto {
  _id: Types.ObjectId;
  name: string;
  seats: BusScheduleLayoutSeatDto[];
}

export class BusScheduleLayoutDto extends BusLayoutTemplateDto {
  @Expose()
  busLayoutTemplateId: Types.ObjectId;

  @Expose()
  busScheduleId: Types.ObjectId;

  @Expose()
  seatLayouts: BusScheduleSeatLayoutTemplateDto[];
}

export class RequestUpdateSeatStatusDto {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  _id: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => String)
  status?: string;

  @IsNotEmpty()
  @Type(() => String)
  bookingStatus?: string;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  bookingId?: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => String)
  bookingNumber?: string;
}
