import { Types } from 'mongoose';
import { ClientBusLayoutTemplateDto } from '../../client-bus-layout-template/dto/client-bus-layout-template.dto';
export declare class ClientBusScheduleLayoutSeatDto {
    _id: Types.ObjectId;
    index: number;
    typeId: Types.ObjectId;
    name: string;
    status: string;
    bookingId: Types.ObjectId;
    bookingStatus: string;
    bookingNumber: string;
}
export declare class ClientBusScheduleSeatLayoutTemplateDto {
    _id: Types.ObjectId;
    name: string;
    seats: ClientBusScheduleLayoutSeatDto[];
}
export declare class ClientBusScheduleLayoutDto extends ClientBusLayoutTemplateDto {
    busLayoutTemplateId: Types.ObjectId;
    busScheduleId: Types.ObjectId;
    seatLayouts: ClientBusScheduleSeatLayoutTemplateDto[];
}
export declare class ClientRequestUpdateSeatStatusDto {
    _id: Types.ObjectId;
    status: string;
    bookingStatus?: string;
    bookingId?: Types.ObjectId;
}
