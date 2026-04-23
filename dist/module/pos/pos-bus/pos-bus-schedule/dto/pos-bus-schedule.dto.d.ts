import { Types } from 'mongoose';
import { PosBusProvinceDto } from '../../pos-bus-province/dto/pos-bus-province.dto';
import { PosBusTemplateDto } from '../../pos-bus-template/dto/pos-bus-template.dto';
import { PosDriverDto } from '@/module/pos/pos-user/pos-driver/dto/pos-driver.dto';
import { PosBusDto } from '../../pos-bus-main/dto/pos-bus.dto';
import { PosBusRouteDto } from '../../pos-bus-route/dto/pos-bus-route.dto';
export declare class PosBusScheduleBreakPointsTimeDto {
    busStationId: Types.ObjectId;
    province: PosBusProvinceDto;
    name: string;
    detailAddress: string;
    location: string;
    provinceId: Types.ObjectId;
    timeSchedule: string;
}
export declare class PosBusScheduleBusDto extends PosBusDto {
}
export declare class PosBusScheduleRouteDto extends PosBusRouteDto {
    breakPoints: PosBusScheduleBreakPointsTimeDto[];
}
export declare class PosBusSeatPrices {
    seatTypeId: Types.ObjectId;
    seatTypeName: string;
    price: number;
}
export declare class PosBusScheduleDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    busScheduleNumber: string;
    name: string;
    busId?: Types.ObjectId;
    currentStationId: Types.ObjectId;
    busDriverIds: Types.ObjectId[];
    busDrivers?: PosDriverDto[];
    bus?: PosBusScheduleBusDto;
    busTemplateId: Types.ObjectId;
    busTemplate: PosBusTemplateDto;
    busRouteId: Types.ObjectId;
    busRoute: PosBusScheduleRouteDto;
    busLayoutTemplateId: Types.ObjectId;
    busScheduleTemplateId: Types.ObjectId;
    busSeatPrices: PosBusSeatPrices[];
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
export declare class PosSearchBusScheduleQuery {
    departureDate: Date;
    departureId: Types.ObjectId;
    destinationId: Types.ObjectId;
}
export declare class PosSearchBusSchedulePagingQuerySortFilter {
    key: string;
    value: string | string[];
}
export declare class PosSearchBusSchedulePagingQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: PosSearchBusSchedulePagingQuerySortFilter;
    filters: PosSearchBusSchedulePagingQuerySortFilter[];
    startDate: string;
    endDate: string;
    departureId: Types.ObjectId;
    destinationId: Types.ObjectId;
}
export declare class PosSearchBusSchedulePagingRes {
    pageIdx: number;
    busSchedules: PosBusScheduleDto[];
    totalPage: number;
    totalItem: number;
}
export declare class PosSearchBusScheduleDriverQuery {
    driverId: Types.ObjectId;
    startDate: Date;
    endDate: Date;
}
