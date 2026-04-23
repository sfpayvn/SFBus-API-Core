import { Types } from 'mongoose';
export declare class AdminCreateSpecificTimeSlotDto {
    _id: Types.ObjectId;
    timeSlot: string;
}
export declare class AdminCreateBusScheduleAutogeneratorDto {
    tenantId: Types.ObjectId;
    busScheduleTemplateId: Types.ObjectId;
    name: string;
    repeatType: string;
    repeatInterval: number;
    specificTimeSlots: AdminCreateSpecificTimeSlotDto[];
    repeatDaysPerWeek: string[];
    preGenerateDays: number;
    startDate: Date;
    endDate: Date;
}
