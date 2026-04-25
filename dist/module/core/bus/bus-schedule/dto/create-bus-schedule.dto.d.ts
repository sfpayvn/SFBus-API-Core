import { Types } from 'mongoose';
import { CreateBusRouteDto } from '@/module/core/bus/bus-route/dto/create-bus-route.dto';
import { CreateBusProvinceDto } from '../../bus-province/dto/create-bus-province.dto';
import { CreateBusRouteBreakPointsDto } from '../../bus-route/dto/create-bus-route.dto';
import { CreateBusScheduleTemplateBusSeatPrices } from '../../bus-schedule-template/dto/create-bus-schedule-template.dto';
import { CreateBusTemplateDto } from '../../bus-template/dto/create-bus-template.dto';
import { CreateBusServiceDto } from '../../bus-service/dto/create-bus-service.dto';
import { CreateBusTypeDto } from '../../bus-type/dto/create-bus-type.dto';
export declare class CreateBusScheduleBusDto {
    name: string;
    licensePlate: string;
    description?: string;
    busTemplateId: Types.ObjectId;
}
export declare class CreateBusScheduleBusProvinceDto extends CreateBusProvinceDto {
    _id: string;
}
export declare class CreateBusScheduleBusServiceDto extends CreateBusServiceDto {
    _id: string;
}
export declare class CreateBusScheduleBusTypeDto extends CreateBusTypeDto {
    _id: string;
}
export declare class CreateBusScheduleBusTemplateDto extends CreateBusTemplateDto {
    _id: string;
    busServices: CreateBusScheduleBusServiceDto[];
    busType: CreateBusScheduleBusTypeDto;
}
export declare class CreateBusScheduleBreakPointsTimeDto extends CreateBusRouteBreakPointsDto {
    busStationId: Types.ObjectId;
    isOffice: boolean;
    provinceId: Types.ObjectId;
    province: CreateBusScheduleBusProvinceDto;
    name: string;
    detailAddress: string;
    location: string;
    timeSchedule?: string;
    notes?: string;
}
export declare class CreateBusRouteScheduleDto extends CreateBusRouteDto {
    breakPoints: CreateBusScheduleBreakPointsTimeDto[];
}
export declare class CreateBusScheduleDto {
    tenantId: Types.ObjectId;
    busScheduleNumber: string;
    currentStationId: Types.ObjectId;
    name: string;
    busId?: Types.ObjectId;
    busDriverIds: Types.ObjectId[];
    bus?: CreateBusScheduleBusDto;
    busTemplateId: Types.ObjectId;
    busTemplate: CreateBusScheduleBusTemplateDto;
    busRouteId: Types.ObjectId;
    busRoute: CreateBusRouteScheduleDto;
    busLayoutTemplateId: Types.ObjectId;
    busScheduleTemplateId: Types.ObjectId;
    busSeatPrices: CreateBusScheduleTemplateBusSeatPrices[];
    status?: 'un_published' | 'scheduled' | 'overdue' | 'in_progress' | 'completed' | 'cancelled';
    note?: string;
    startDate: string;
    endDate: string;
    busSeatLayoutBlockIds: Types.ObjectId[];
}
