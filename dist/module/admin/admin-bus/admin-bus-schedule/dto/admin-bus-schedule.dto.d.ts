import { Types } from 'mongoose';
import { AdminBusProvinceDto } from '../../admin-bus-province/dto/admin-bus-province.dto';
import { AdminBusTemplateDto } from '../../admin-bus-template/dto/admin-bus-template.dto';
import { AdminBusDto } from '../../admin-bus-main/dto/admin-bus.dto';
import { AdminBusRouteDto } from '../../admin-bus-route/dto/admin-admin-bus-route.dto';
import { AdminDriverDto } from '@/module/admin/admin-user/admin-driver/dto/admin-driver.dto';
export declare class AdminBusScheduleBreakPointsTimeDto {
    busStationId: Types.ObjectId;
    province: AdminBusProvinceDto;
    name: string;
    detailAddress: string;
    location: string;
    provinceId: Types.ObjectId;
    timeSchedule: string;
}
export declare class AdminBusScheduleBusDto extends AdminBusDto {
}
export declare class AdminBusScheduleRouteDto extends AdminBusRouteDto {
    breakPoints: AdminBusScheduleBreakPointsTimeDto[];
}
export declare class AdminBusSeatPrices {
    seatTypeId: Types.ObjectId;
    seatTypeName: string;
    price: number;
}
export declare class AdminBusScheduleDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    busScheduleNumber: string;
    name: string;
    busId?: Types.ObjectId;
    currentStationId: Types.ObjectId;
    busDriverIds: Types.ObjectId[];
    busDrivers?: AdminDriverDto[];
    bus?: AdminBusScheduleBusDto;
    busTemplateId: Types.ObjectId;
    busTemplate: AdminBusTemplateDto;
    busRouteId: Types.ObjectId;
    busRoute: AdminBusScheduleRouteDto;
    busLayoutTemplateId: Types.ObjectId;
    busScheduleTemplateId: Types.ObjectId;
    busSeatPrices: AdminBusSeatPrices[];
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
export declare class AdminSearchBusScheduleQuery {
    departureDate: Date;
    departureId: Types.ObjectId;
    destinationId: Types.ObjectId;
}
export declare class AdminSearchBusSchedulePagingQuerySortFilter {
    key: string;
    value: string;
}
export declare class AdminSearchBusSchedulePagingQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: AdminSearchBusSchedulePagingQuerySortFilter;
    filters: AdminSearchBusSchedulePagingQuerySortFilter[];
    startDate: string;
    endDate: string;
    departureId: Types.ObjectId;
    destinationId: Types.ObjectId;
}
export declare class AdminSearchBusSchedulePagingRes {
    pageIdx: number;
    busSchedules: AdminBusScheduleDto[];
    totalPage: number;
    totalItem: number;
}
export declare class AdminSearchBusScheduleDriverQuery {
    driverId: Types.ObjectId;
    startDate: Date;
    endDate: Date;
}
