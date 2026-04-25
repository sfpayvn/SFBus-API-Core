import { Types } from 'mongoose';
import { BusRouteDto } from '../../bus-route/dto/bus-route.dto';
import { BusSeatPrices } from '../../bus-schedule/dto/bus-schedule.dto';
export declare class BusScheduleTemplateBreakPointsTimeDto {
    busStationId: Types.ObjectId;
    timeOffset: string;
}
export declare class BusScheduleTemplateRouteDto extends BusRouteDto {
    breakPoints: BusScheduleTemplateBreakPointsTimeDto[];
}
export declare class BusScheduleTemplateSeatPrices extends BusSeatPrices {
}
export declare class BusScheduleTemplateDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    name: string;
    busId: Types.ObjectId;
    busDriverIds: Types.ObjectId[];
    busTemplateId: Types.ObjectId;
    busSeatLayoutBlockIds: Types.ObjectId[];
    busRouteId: Types.ObjectId;
    busRoute: BusScheduleTemplateRouteDto;
    busSeatPrices: BusScheduleTemplateSeatPrices[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class SearchBusScheduleTemplateQuerySortFilter {
    key: string;
    value: string;
}
export declare class SearchBusScheduleTemplateQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: SearchBusScheduleTemplateQuerySortFilter;
    filters: SearchBusScheduleTemplateQuerySortFilter[];
}
export declare class SearchBusScheduleTemplateRes {
    pageIdx: number;
    busScheduleTemplates: BusScheduleTemplateDto[];
    totalPage: number;
    totalItem: number;
}
