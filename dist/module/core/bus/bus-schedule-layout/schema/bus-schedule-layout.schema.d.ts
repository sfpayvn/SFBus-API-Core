import { Types } from 'mongoose';
import { BusLayoutTemplateDocument } from '../../bus-layout-template/schema/bus-layout-template.schema';
export declare class BusScheduleLayoutSeatDocument {
    _id: Types.ObjectId;
    index: number;
    typeId: Types.ObjectId;
    name: string;
    status: string;
    bookingId: Types.ObjectId;
    bookingStatus: string;
    bookingNumber: string;
}
export declare class BusScheduleSeatLayoutTemplateDocument {
    _id: Types.ObjectId;
    name: string;
    seats: BusScheduleLayoutSeatDocument[];
}
declare const BusScheduleLayoutDocument_base: import("@nestjs/mapped-types").MappedType<Omit<BusLayoutTemplateDocument, "_id" | "seatLayouts">>;
export declare class BusScheduleLayoutDocument extends BusScheduleLayoutDocument_base {
    tenantId: Types.ObjectId;
    busLayoutTemplateId: Types.ObjectId;
    busScheduleId: Types.ObjectId;
    seatLayouts: BusScheduleSeatLayoutTemplateDocument[];
}
export declare const BusScheduleLayoutSchema: import("mongoose").Schema<BusScheduleLayoutDocument, import("mongoose").Model<BusScheduleLayoutDocument, any, any, any, import("mongoose").Document<unknown, any, BusScheduleLayoutDocument> & BusScheduleLayoutDocument & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BusScheduleLayoutDocument, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<BusScheduleLayoutDocument>> & import("mongoose").FlatRecord<BusScheduleLayoutDocument> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export {};
