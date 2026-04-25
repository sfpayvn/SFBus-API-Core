import { Types } from 'mongoose';
import { PosBusRouteDto } from '../../pos-bus-route/dto/pos-bus-route.dto';
import { PosBusSeatPrices } from '../../pos-bus-schedule/dto/pos-bus-schedule.dto';
export declare class PosBusScheduleTemplateBreakPointsTimeDto {
    busStationId: Types.ObjectId;
    timeOffset: string;
}
export declare class PosBusScheduleTemplateRouteDto extends PosBusRouteDto {
    breakPoints: PosBusScheduleTemplateBreakPointsTimeDto[];
}
export declare class PosBusScheduleTemplateSeatPrices extends PosBusSeatPrices {
}
export declare class PosBusScheduleTemplateDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    name: string;
    busId: Types.ObjectId;
    busDriverIds: Types.ObjectId[];
    busTemplateId: Types.ObjectId;
    busSeatLayoutBlockIds: Types.ObjectId[];
    busRouteId: Types.ObjectId;
    busRoute: PosBusScheduleTemplateRouteDto;
    busSeatPrices: PosBusScheduleTemplateSeatPrices[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class PosSearchBusScheduleTemplateQuerySortFilter {
    key: string;
    value: string;
}
export declare class PosSearchBusScheduleTemplateQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: PosSearchBusScheduleTemplateQuerySortFilter;
    filters: PosSearchBusScheduleTemplateQuerySortFilter[];
}
export declare class PosSearchBusScheduleTemplateRes {
    pageIdx: number;
    busScheduleTemplates: PosBusScheduleTemplateDto[];
    totalPage: number;
    totalItem: number;
}
