import { Types } from 'mongoose';
import { PosBusLayoutTemplateDto } from '../../pos-bus-layout-template/dto/pos-bus-layout-template.dto';
export declare class PosBusScheduleLayoutSeatDto {
    _id: Types.ObjectId;
    bookingId: Types.ObjectId;
    index: number;
    typeId: Types.ObjectId;
    name: string;
    status: string;
    bookingStatus: string;
}
export declare class PosBusScheduleSeatLayoutTemplateDto {
    _id: Types.ObjectId;
    name: string;
    seats: PosBusScheduleLayoutSeatDto[];
}
export declare class PosBusScheduleLayoutDto extends PosBusLayoutTemplateDto {
    busLayoutTemplateId: Types.ObjectId;
    busScheduleId: Types.ObjectId;
    seatLayouts: PosBusScheduleSeatLayoutTemplateDto[];
}
export declare class PosRequestUpdateSeatStatusDto {
    _id: Types.ObjectId;
    status: string;
    bookingStatus?: string;
    bookingId?: Types.ObjectId;
}
