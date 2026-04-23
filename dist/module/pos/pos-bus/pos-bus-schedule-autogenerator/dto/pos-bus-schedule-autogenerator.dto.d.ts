import { Types } from 'mongoose';
export declare class PosSpecificTimeSlotDto {
    _id: Types.ObjectId;
    timeSlot: string;
}
export declare class PosBusScheduleAutogeneratorDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    busScheduleTemplateId: Types.ObjectId;
    name: string;
    repeatType: string;
    repeatInterval: number;
    specificTimeSlots: PosSpecificTimeSlotDto[];
    repeatDaysPerWeek: string[];
    preGenerateDays: number;
    startDate: Date;
    endDate: Date;
    status: 'un_published' | 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class SearchBusScheduleAutogeneratorQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: string;
    filter: string;
}
export declare class PosSearchBusScheduleRes {
    pageIdx: number;
    busScheduleAutoGenerators: PosBusScheduleAutogeneratorDto[];
    totalPage: number;
    totalItem: number;
}
export declare class PosSearchBusSchedulePagingQuerySortFilter {
    key: string;
    value: string;
}
export declare class PosSearchBusScheduleAutogeneratorQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: PosSearchBusSchedulePagingQuerySortFilter;
    filters: PosSearchBusSchedulePagingQuerySortFilter[];
}
