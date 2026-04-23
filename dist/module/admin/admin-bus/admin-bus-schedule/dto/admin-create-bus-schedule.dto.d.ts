import { Types } from 'mongoose';
import { CreateBusRouteDto } from '@/module/core/bus/bus-route/dto/create-bus-route.dto';
import { AdminCreateBusProvinceDto } from '../../admin-bus-province/dto/admin-create-bus-province.dto';
import { AdminCreateBusRouteBreakPointsDto } from '../../admin-bus-route/dto/admin-create-bus-route.dto';
import { AdminCreateBusScheduleTemplateBusSeatPrices } from '../../admin-bus-schedule-template/dto/admin-create-bus-schedule-template.dto';
import { AdminCreateBusTemplateDto } from '../../admin-bus-template/dto/admin-create-bus-template.dto';
import { AdminCreateBusServiceDto } from '../../admin-bus-service/dto/admin-create-bus-service.dto';
import { AdminCreateBusTypeDto } from '../../admin-bus-type/dto/admin-create-bus-type.dto';
export declare class AdminCreateBusScheduleBusDto {
    name: string;
    licensePlate: string;
    description?: string;
    busTemplateId: Types.ObjectId;
}
export declare class AdminCreateBusScheduleBusProvinceDto extends AdminCreateBusProvinceDto {
    _id: string;
}
export declare class AdminCreateBusScheduleBusServiceDto extends AdminCreateBusServiceDto {
    _id: string;
}
export declare class AdminCreateBusScheduleBusTypeDto extends AdminCreateBusTypeDto {
    _id: string;
}
export declare class AdminCreateBusScheduleBusTemplateDto extends AdminCreateBusTemplateDto {
    _id: string;
    busServices: AdminCreateBusScheduleBusServiceDto[];
    busType: AdminCreateBusScheduleBusTypeDto;
}
export declare class AdminCreateBusScheduleBreakPointsTimeDto extends AdminCreateBusRouteBreakPointsDto {
    busStationId: Types.ObjectId;
    isOffice: boolean;
    provinceId: Types.ObjectId;
    province: AdminCreateBusScheduleBusProvinceDto;
    name: string;
    detailAddress: string;
    location: string;
    timeSchedule?: string;
    notes?: string;
}
export declare class AdminCreateBusRouteScheduleDto extends CreateBusRouteDto {
    breakPoints: AdminCreateBusScheduleBreakPointsTimeDto[];
}
export declare class AdminCreateBusScheduleDto {
    tenantId: Types.ObjectId;
    busScheduleNumber: string;
    currentStationId: Types.ObjectId;
    name: string;
    busId?: Types.ObjectId;
    busDriverIds: Types.ObjectId[];
    bus?: AdminCreateBusScheduleBusDto;
    busTemplateId: Types.ObjectId;
    busTemplate: AdminCreateBusScheduleBusTemplateDto;
    busRouteId: Types.ObjectId;
    busRoute: AdminCreateBusRouteScheduleDto;
    busLayoutTemplateId: Types.ObjectId;
    busScheduleTemplateId: Types.ObjectId;
    busSeatPrices: AdminCreateBusScheduleTemplateBusSeatPrices[];
    status?: 'un_published' | 'scheduled' | 'overdue' | 'in_progress' | 'completed' | 'cancelled';
    note?: string;
    startDate: string;
    endDate: string;
    busSeatLayoutBlockIds: Types.ObjectId[];
}
