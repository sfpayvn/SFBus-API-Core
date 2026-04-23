import { Types } from 'mongoose';
export declare class SpecificTimeSlotDto {
    _id: Types.ObjectId;
    timeSlot: string;
}
export declare class BusScheduleAutogeneratorDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    busScheduleTemplateId: Types.ObjectId;
    name: string;
    repeatType: string;
    repeatInterval: number;
    specificTimeSlots: SpecificTimeSlotDto[];
    repeatDaysPerWeek: string[];
    preGenerateDays: number;
    startDate: Date;
    endDate: Date;
    status: 'un_published' | 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class SearchBusScheduleAutogeneratorPagingQuerySortFilter {
    key: string;
    value: string;
}
export declare class SearchBusScheduleAutogeneratorQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: SearchBusScheduleAutogeneratorPagingQuerySortFilter;
    filters: SearchBusScheduleAutogeneratorPagingQuerySortFilter[];
}
export declare class SearchBusScheduleRes {
    pageIdx: number;
    busScheduleAutoGenerators: BusScheduleAutogeneratorDto[];
    totalPage: number;
    totalItem: number;
}
