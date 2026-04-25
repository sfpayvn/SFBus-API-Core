import { Types } from 'mongoose';
import { BusLayoutTemplateDto } from '../../bus-layout-template/dto/bus-layout-template.dto';
export declare class BusScheduleLayoutSeatDto {
    _id: Types.ObjectId;
    index: number;
    typeId: Types.ObjectId;
    name: string;
    status: string;
    bookingId: Types.ObjectId;
    bookingStatus: string;
    bookingNumber: string;
}
export declare class BusScheduleSeatLayoutTemplateDto {
    _id: Types.ObjectId;
    name: string;
    seats: BusScheduleLayoutSeatDto[];
}
export declare class BusScheduleLayoutDto extends BusLayoutTemplateDto {
    busLayoutTemplateId: Types.ObjectId;
    busScheduleId: Types.ObjectId;
    seatLayouts: BusScheduleSeatLayoutTemplateDto[];
}
export declare class RequestUpdateSeatStatusDto {
    _id: Types.ObjectId;
    status?: string;
    bookingStatus?: string;
    bookingId?: Types.ObjectId;
    bookingNumber?: string;
}
