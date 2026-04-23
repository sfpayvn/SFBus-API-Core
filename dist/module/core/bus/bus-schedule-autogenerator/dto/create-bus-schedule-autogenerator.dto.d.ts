import { Types } from 'mongoose';
export declare class CreateeSpecificTimeSlotDto {
    _id: Types.ObjectId;
    timeSlot: string;
}
export declare class CreateBusScheduleAutogeneratorDto {
    tenantId: Types.ObjectId;
    busScheduleTemplateId: Types.ObjectId;
    name: string;
    repeatType: string;
    repeatInterval: number;
    specificTimeSlots: CreateeSpecificTimeSlotDto[];
    repeatDaysPerWeek: string[];
    preGenerateDays: number;
    startDate: Date;
    endDate: Date;
    status?: string;
}
