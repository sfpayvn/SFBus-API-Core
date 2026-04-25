import { Types } from 'mongoose';
export declare class AdminSpecificTimeSlotDto {
    _id: Types.ObjectId;
    timeSlot: string;
}
export declare class AdminBusScheduleAutogeneratorDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    busScheduleTemplateId: Types.ObjectId;
    name: string;
    repeatType: string;
    repeatInterval: number;
    specificTimeSlots: AdminSpecificTimeSlotDto[];
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
export declare class AdminSearchBusScheduleRes {
    pageIdx: number;
    busScheduleAutoGenerators: AdminBusScheduleAutogeneratorDto[];
    totalPage: number;
    totalItem: number;
}
export declare class AdminSearchBusSchedulePagingQuerySortFilter {
    key: string;
    value: string;
}
export declare class AdminSearchBusScheduleAutogeneratorQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: AdminSearchBusSchedulePagingQuerySortFilter;
    filters: AdminSearchBusSchedulePagingQuerySortFilter[];
}
