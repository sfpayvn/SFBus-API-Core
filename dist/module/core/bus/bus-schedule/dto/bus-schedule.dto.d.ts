import { Types } from 'mongoose';
import { BusDto } from '../../bus/dto/bus.dto';
import { BusRouteDto } from '../../bus-route/dto/bus-route.dto';
import { BusProvinceDto } from '../../bus-province/dto/bus-province.dto';
import { BusTemplateDto } from '../../bus-template/dto/bus-template.dto';
import { DriverDto } from '@/module/core/user/driver/dto/driver.dto';
export declare class BusScheduleBreakPointsTimeDto {
    busStationId: Types.ObjectId;
    province: BusProvinceDto;
    name: string;
    detailAddress: string;
    location: string;
    provinceId: Types.ObjectId;
    timeSchedule: string;
}
export declare class BusScheduleBusDto extends BusDto {
}
export declare class BusScheduleRouteDto extends BusRouteDto {
    breakPoints: BusScheduleBreakPointsTimeDto[];
}
export declare class BusSeatPrices {
    seatTypeId: Types.ObjectId;
    seatTypeName: string;
    price: number;
}
export declare class BusScheduleDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    busScheduleNumber: string;
    name: string;
    busId?: Types.ObjectId;
    busDriverIds: Types.ObjectId[];
    busDrivers?: DriverDto[];
    bus?: BusScheduleBusDto;
    busTemplateId: Types.ObjectId;
    busTemplate: BusTemplateDto;
    busRouteId: Types.ObjectId;
    busRoute: BusScheduleRouteDto;
    busLayoutTemplateId: Types.ObjectId;
    busScheduleTemplateId: Types.ObjectId;
    busSeatPrices: BusSeatPrices[];
    remainSeat: number;
    status: 'un_published' | 'scheduled' | 'overdue' | 'in_progress' | 'completed' | 'cancelled';
    note?: string;
    startDate: string;
    endDate: string;
    currentStationId: Types.ObjectId;
    busSeatLayoutBlockIds: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class SearchBusScheduleQuery {
    departureDate: Date;
    departureId: Types.ObjectId;
    destinationId: Types.ObjectId;
}
export declare class BusScheduleSortFilter {
    key: string;
    value: string | string[];
}
export declare class SearchBusSchedulePagingQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: BusScheduleSortFilter;
    filters: BusScheduleSortFilter[];
    startDate: string;
    endDate: string;
    departureId: Types.ObjectId;
    destinationId: Types.ObjectId;
}
export declare class SearchBusSchedulePagingRes {
    pageIdx: number;
    busSchedules: BusScheduleDto[];
    totalPage: number;
    totalItem: number;
}
export declare class SearchBusScheduleDriverQuery {
    keyword: string;
    sortBy: BusScheduleSortFilter;
    filters: BusScheduleSortFilter[];
}
