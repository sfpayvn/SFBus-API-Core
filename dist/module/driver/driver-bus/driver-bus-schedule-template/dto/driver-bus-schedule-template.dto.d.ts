import { Types } from 'mongoose';
import { DriverBusRouteDto } from '../../driver-bus-route/dto/driver-bus-route.dto';
import { DriverBusSeatPrices } from '../../driver-bus-schedule/dto/driver-bus-schedule.dto';
export declare class DriverBusScheduleTemplateBreakPointsTimeDto {
    busStationId: Types.ObjectId;
    timeOffset: string;
}
export declare class DriverBusScheduleTemplateRouteDto extends DriverBusRouteDto {
    breakPoints: DriverBusScheduleTemplateBreakPointsTimeDto[];
}
export declare class DriverBusScheduleTemplateSeatPrices extends DriverBusSeatPrices {
}
export declare class DriverBusScheduleTemplateDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    name: string;
    busId: Types.ObjectId;
    busDriverIds: Types.ObjectId[];
    busTemplateId: Types.ObjectId;
    busSeatLayoutBlockIds: Types.ObjectId[];
    busRouteId: Types.ObjectId;
    busRoute: DriverBusScheduleTemplateRouteDto;
    busSeatPrices: DriverBusScheduleTemplateSeatPrices[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class DriverSearchBusScheduleTemplateQuerySortFilter {
    key: string;
    value: string;
}
export declare class DriverSearchBusScheduleTemplateQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: DriverSearchBusScheduleTemplateQuerySortFilter;
    filters: DriverSearchBusScheduleTemplateQuerySortFilter[];
}
export declare class DriverSearchBusScheduleTemplateRes {
    pageIdx: number;
    busScheduleTemplates: DriverBusScheduleTemplateDto[];
    totalPage: number;
    totalItem: number;
}
