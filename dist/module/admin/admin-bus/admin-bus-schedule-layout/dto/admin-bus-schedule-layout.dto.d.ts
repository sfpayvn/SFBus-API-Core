import { Types } from 'mongoose';
import { AdminBusLayoutTemplateDto } from '../../admin-bus-layout-template/dto/admin-bus-layout-template.dto';
export declare class AdminBusScheduleLayoutSeatDto {
    _id: Types.ObjectId;
    bookingId: Types.ObjectId;
    index: number;
    typeId: Types.ObjectId;
    name: string;
    status: string;
    bookingStatus: string;
}
export declare class AdminBusScheduleSeatLayoutTemplateDto {
    _id: Types.ObjectId;
    name: string;
    seats: AdminBusScheduleLayoutSeatDto[];
}
export declare class AdminBusScheduleLayoutDto extends AdminBusLayoutTemplateDto {
    busLayoutTemplateId: Types.ObjectId;
    busScheduleId: Types.ObjectId;
    seatLayouts: AdminBusScheduleSeatLayoutTemplateDto[];
}
export declare class AdminRequestUpdateSeatStatusDto {
    _id: Types.ObjectId;
    status: string;
    bookingStatus?: string;
    bookingId?: Types.ObjectId;
}
