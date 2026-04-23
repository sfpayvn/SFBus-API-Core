import { Types } from 'mongoose';
import { CreateBusScheduleTemplateBusSeatPrices } from '../../bus-schedule-template/dto/create-bus-schedule-template.dto';
import { CreateBusScheduleBusDto, CreateBusScheduleBusTemplateDto, CreateBusRouteScheduleDto } from './create-bus-schedule.dto';
export declare class UpdateBusScheduleDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    busScheduleNumber: string;
    name: string;
    busId?: Types.ObjectId;
    currentStationId: Types.ObjectId;
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
