import { Types } from 'mongoose';
import { ClientBusProvinceDto } from '../../client-bus-province/dto/client-bus-province.dto';
import { ClientBusTemplateDto } from '../../client-bus-template/dto/client-bus-template.dto';
import { ClientBusDto } from '../../client-bus-main/dto/client-bus.dto';
import { ClientBusRouteDto } from '../../client-bus-route/dto/client-bus-route.dto';
import { ClientDriverDto } from '@/module/client/client-user/client-driver/dto/client-driver.dto';
export declare class ClientBusScheduleBreakPointsTimeDto {
    busStationId: Types.ObjectId;
    province: ClientBusProvinceDto;
    name: string;
    detailAddress: string;
    location: string;
    provinceId: Types.ObjectId;
    timeSchedule: string;
}
export declare class ClientBusScheduleBusDto extends ClientBusDto {
}
export declare class ClientBusScheduleRouteDto extends ClientBusRouteDto {
    breakPoints: ClientBusScheduleBreakPointsTimeDto[];
}
export declare class ClientBusSeatPrices {
    seatTypeId: Types.ObjectId;
    seatTypeName: string;
    price: number;
}
export declare class ClientBusScheduleDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    busScheduleNumber: string;
    name: string;
    busId?: Types.ObjectId;
    currentStationId: Types.ObjectId;
    busDriverIds: Types.ObjectId[];
    busDrivers?: ClientDriverDto[];
    bus?: ClientBusScheduleBusDto;
    busTemplateId: Types.ObjectId;
    busTemplate: ClientBusTemplateDto;
    busRouteId: Types.ObjectId;
    busRoute: ClientBusScheduleRouteDto;
    busLayoutTemplateId: Types.ObjectId;
    busScheduleTemplateId: Types.ObjectId;
    busSeatPrices: ClientBusSeatPrices[];
    remainSeat: number;
    status: 'un_published' | 'scheduled' | 'overdue' | 'in_progress' | 'completed' | 'cancelled';
    note?: string;
    startDate: string;
    endDate: string;
    busSeatLayoutBlockIds: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class ClientSearchBusScheduleQuery {
    departureDate: Date;
    departureId: Types.ObjectId;
    destinationId: Types.ObjectId;
}
export declare class ClientSearchBusSchedulePagingQuerySortFilter {
    key: string;
    value: string;
}
export declare class ClientSearchBusSchedulePagingQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: ClientSearchBusSchedulePagingQuerySortFilter;
    filters: ClientSearchBusSchedulePagingQuerySortFilter[];
    startDate: string;
    endDate: string;
    departureId: Types.ObjectId;
    destinationId: Types.ObjectId;
}
export declare class ClientSearchBusSchedulePagingRes {
    pageIdx: number;
    busSchedules: ClientBusScheduleDto[];
    totalPage: number;
    totalItem: number;
}
export declare class ClientSearchBusScheduleDriverQuery {
    driverId: Types.ObjectId;
    startDate: Date;
    endDate: Date;
}
