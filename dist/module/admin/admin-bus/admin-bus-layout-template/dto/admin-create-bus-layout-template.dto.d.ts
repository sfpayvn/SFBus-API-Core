import { Types } from 'mongoose';
export declare class AdminCreateSeatDto {
    index: number;
    typeId: Types.ObjectId;
    name: string;
    status: string;
}
export declare class AdminCreateBusSeatLayoutTemplateDto {
    name: string;
    seats: AdminCreateSeatDto[];
}
export declare class AdminCreateBusLayoutTemplateDto {
    name: string;
    seatLayouts: AdminCreateBusSeatLayoutTemplateDto[];
}
