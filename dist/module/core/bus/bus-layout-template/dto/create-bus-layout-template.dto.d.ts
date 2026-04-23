import { Types } from 'mongoose';
export declare class CreateSeatDto {
    index: number;
    typeId: Types.ObjectId;
    name: string;
    status: string;
}
export declare class CreateBusSeatLayoutTemplateDto {
    name: string;
    seats: CreateSeatDto[];
}
export declare class CreateBusLayoutTemplateDto {
    name: string;
    seatLayouts: CreateBusSeatLayoutTemplateDto[];
}
