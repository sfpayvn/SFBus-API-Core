import { Types, Document } from 'mongoose';
export declare class SpecificTimeSlotDocument extends Document {
    _id: Types.ObjectId;
    timeSlot: Date;
}
export declare class BusScheduleAutogeneratorDocument extends Document {
    tenantId: Types.ObjectId;
    busScheduleTemplateId: Types.ObjectId;
    name: string;
    repeatType: string;
    repeatInterval: number;
    specificTimeSlots: SpecificTimeSlotDocument[];
    repeatDaysPerWeek: string[];
    preGenerateDays: number;
    startDate: Date;
    endDate: Date;
    status: 'un_published' | 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
}
export declare const BusScheduleAutogeneratorSchema: import("mongoose").Schema<BusScheduleAutogeneratorDocument, import("mongoose").Model<BusScheduleAutogeneratorDocument, any, any, any, Document<unknown, any, BusScheduleAutogeneratorDocument> & BusScheduleAutogeneratorDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BusScheduleAutogeneratorDocument, Document<unknown, {}, import("mongoose").FlatRecord<BusScheduleAutogeneratorDocument>> & import("mongoose").FlatRecord<BusScheduleAutogeneratorDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
