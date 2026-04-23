import { Types } from 'mongoose';
import { AdminBusSeatPrices } from '../../admin-bus-schedule/dto/admin-bus-schedule.dto';
import { AdminBusRouteDto } from '../../admin-bus-route/dto/admin-admin-bus-route.dto';
export declare class AdminBusScheduleTemplateBreakPointsTimeDto {
    busStationId: Types.ObjectId;
    timeOffset: string;
}
export declare class AdminBusScheduleTemplateRouteDto extends AdminBusRouteDto {
    breakPoints: AdminBusScheduleTemplateBreakPointsTimeDto[];
}
export declare class AdminBusScheduleTemplateSeatPrices extends AdminBusSeatPrices {
}
export declare class AdminBusScheduleTemplateDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    name: string;
    busId: Types.ObjectId;
    busDriverIds: Types.ObjectId[];
    busTemplateId: Types.ObjectId;
    busSeatLayoutBlockIds: Types.ObjectId[];
    busRouteId: Types.ObjectId;
    busRoute: AdminBusScheduleTemplateRouteDto;
    busSeatPrices: AdminBusScheduleTemplateSeatPrices[];
    isDefault?: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class AdminSearchBusScheduleTemplateQuerySortFilter {
    key: string;
    value: string;
}
export declare class AdminSearchBusScheduleTemplateQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: AdminSearchBusScheduleTemplateQuerySortFilter;
    filters: AdminSearchBusScheduleTemplateQuerySortFilter[];
}
export declare class AdminSearchBusScheduleTemplateRes {
    pageIdx: number;
    busScheduleTemplates: AdminBusScheduleTemplateDto[];
    totalPage: number;
    totalItem: number;
}
