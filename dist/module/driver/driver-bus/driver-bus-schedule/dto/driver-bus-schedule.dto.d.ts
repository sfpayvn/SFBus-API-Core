import { Types } from 'mongoose';
import { DriverBusProvinceDto } from '../../driver-bus-province/dto/driver-bus-province.dto';
import { DriverBusTemplateDto } from '../../driver-bus-template/dto/driver-bus-template.dto';
import { DriverBusDto } from '../../driver-bus-main/dto/driver-bus.dto';
import { DriverBusRouteDto } from '../../driver-bus-route/dto/driver-bus-route.dto';
import { DriverDriverDto } from '@/module/driver/driver-user/driver-driver/dto/driver-driver.dto';
export declare class DriverBusScheduleBreakPointsTimeDto {
    busStationId: Types.ObjectId;
    province: DriverBusProvinceDto;
    name: string;
    detailAddress: string;
    location: string;
    provinceId: Types.ObjectId;
    timeSchedule: string;
}
export declare class DriverBusScheduleBusDto extends DriverBusDto {
}
export declare class DriverBusScheduleRouteDto extends DriverBusRouteDto {
    breakPoints: DriverBusScheduleBreakPointsTimeDto[];
}
export declare class DriverBusSeatPrices {
    seatTypeId: Types.ObjectId;
    seatTypeName: string;
    price: number;
}
export declare class DriverBusScheduleDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    busScheduleNumber: string;
    name: string;
    busId?: Types.ObjectId;
    currentStationId: Types.ObjectId;
    busDriverIds: Types.ObjectId[];
    busDrivers?: DriverDriverDto[];
    bus?: DriverBusScheduleBusDto;
    busTemplateId: Types.ObjectId;
    busTemplate: DriverBusTemplateDto;
    busRouteId: Types.ObjectId;
    busRoute: DriverBusScheduleRouteDto;
    busLayoutTemplateId: Types.ObjectId;
    busScheduleTemplateId: Types.ObjectId;
    busSeatPrices: DriverBusSeatPrices[];
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
export declare class DriverSearchBusScheduleQuery {
    departureDate: Date;
    departureId: Types.ObjectId;
    destinationId: Types.ObjectId;
}
export declare class DriverSearchBusSchedulePagingQuerySortFilter {
    key: string;
    value: string;
}
export declare class DriverSearchBusSchedulePagingQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: DriverSearchBusSchedulePagingQuerySortFilter;
    filters: DriverSearchBusSchedulePagingQuerySortFilter[];
    startDate: string;
    endDate: string;
    departureId: Types.ObjectId;
    destinationId: Types.ObjectId;
}
export declare class DriverSearchBusSchedulePagingRes {
    pageIdx: number;
    busSchedules: DriverBusScheduleDto[];
    totalPage: number;
    totalItem: number;
}
export declare class SearchBusScheduleDriverQuery {
    keyword: string;
    sortBy: DriverSearchBusSchedulePagingQuerySortFilter;
    filters: DriverSearchBusSchedulePagingQuerySortFilter[];
}
