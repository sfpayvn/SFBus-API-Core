import { Types } from 'mongoose';
import { DriverBusLayoutTemplateDto } from '../../driver-bus-layout-template/dto/driver-bus-layout-template.dto';
export declare class DriverBusScheduleLayoutSeatDto {
    _id: Types.ObjectId;
    bookingId: Types.ObjectId;
    index: number;
    typeId: Types.ObjectId;
    name: string;
    status: string;
    bookingStatus: string;
}
export declare class DriverBusScheduleSeatLayoutTemplateDto {
    _id: Types.ObjectId;
    name: string;
    seats: DriverBusScheduleLayoutSeatDto[];
}
export declare class DriverBusScheduleLayoutDto extends DriverBusLayoutTemplateDto {
    busLayoutTemplateId: Types.ObjectId;
    busScheduleId: Types.ObjectId;
    seatLayouts: DriverBusScheduleSeatLayoutTemplateDto[];
}
export declare class DriverRequestUpdateSeatStatusDto {
    _id: Types.ObjectId;
    status: string;
    bookingStatus?: string;
    bookingId?: Types.ObjectId;
}
