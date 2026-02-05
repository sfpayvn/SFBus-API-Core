import { Types } from 'mongoose';
import { ClientBusLayoutTemplateDto } from '../../client-bus-layout-template/dto/client-bus-layout-template.dto';
import { Exclude, Expose, Transform, Type } from 'class-transformer';

export class ClientBusScheduleLayoutSeatDto {
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

  @Exclude()
  bookingId: Types.ObjectId;
  @Exclude()
  bookingStatus: string;
  @Exclude()
  bookingNumber: string;
}

export class ClientBusScheduleSeatLayoutTemplateDto {
  @Expose()
  _id: Types.ObjectId;
  @Expose()
  name: string;
  @Expose()
  @Type(() => ClientBusScheduleLayoutSeatDto)
  seats: ClientBusScheduleLayoutSeatDto[];
}

export class ClientBusScheduleLayoutDto extends ClientBusLayoutTemplateDto {
  @Expose()
  busLayoutTemplateId: Types.ObjectId;
  @Expose()
  busScheduleId: Types.ObjectId;
  @Expose()
  @Type(() => ClientBusScheduleSeatLayoutTemplateDto)
  seatLayouts: ClientBusScheduleSeatLayoutTemplateDto[];
}

export class ClientRequestUpdateSeatStatusDto {
  _id: Types.ObjectId;
  status: string;
  bookingStatus?: string;
  bookingId?: Types.ObjectId;
}
