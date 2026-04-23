import { Types } from 'mongoose';
import { ClientBusRouteDto } from '../../client-bus-route/dto/client-bus-route.dto';
import { ClientBusSeatPrices } from '../../client-bus-schedule/dto/client-bus-schedule.dto';
export declare class ClientBusScheduleTemplateBreakPointsTimeDto {
    busStationId: Types.ObjectId;
    timeOffset: string;
}
export declare class ClientBusScheduleTemplateRouteDto extends ClientBusRouteDto {
    breakPoints: ClientBusScheduleTemplateBreakPointsTimeDto[];
}
export declare class ClientBusScheduleTemplateSeatPrices extends ClientBusSeatPrices {
}
export declare class ClientBusScheduleTemplateDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    name: string;
    busId: Types.ObjectId;
    busDriverIds: Types.ObjectId[];
    busTemplateId: Types.ObjectId;
    busSeatLayoutBlockIds: Types.ObjectId[];
    busRouteId: Types.ObjectId;
    busRoute: ClientBusScheduleTemplateRouteDto;
    busSeatPrices: ClientBusScheduleTemplateSeatPrices[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class ClientSearchBusScheduleTemplateQuerySortFilter {
    key: string;
    value: string;
}
export declare class ClientSearchBusScheduleTemplateQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: ClientSearchBusScheduleTemplateQuerySortFilter;
    filters: ClientSearchBusScheduleTemplateQuerySortFilter[];
}
export declare class ClientSearchBusScheduleTemplateRes {
    pageIdx: number;
    busScheduleTemplates: ClientBusScheduleTemplateDto[];
    totalPage: number;
    totalItem: number;
}
