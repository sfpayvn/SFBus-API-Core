import { Types } from 'mongoose';
import { CreateBusRouteBreakPointsDto, CreateBusRouteDto } from '../../bus-route/dto/create-bus-route.dto';
export declare class CreateBusScheduleTemplateBusSeatPrices {
    seatTypeId: Types.ObjectId;
    seatTypeName: string;
    price: number;
}
export declare class CreateBusScheduleTemplateBreakPointsTimeDto extends CreateBusRouteBreakPointsDto {
    timeOffset: string;
}
export declare class CreateBusRouteScheduleTemplateDto extends CreateBusRouteDto {
    breakPoints: CreateBusScheduleTemplateBreakPointsTimeDto[];
}
export declare class CreateBusScheduleTemplateDto {
    tenantId: Types.ObjectId;
    name: string;
    busId: Types.ObjectId;
    busDriverIds: Types.ObjectId[];
    busTemplateId: Types.ObjectId;
    busSeatLayoutBlockIds: Types.ObjectId[];
    busRouteId: Types.ObjectId;
    busRoute: CreateBusRouteScheduleTemplateDto;
    busSeatPrices: CreateBusScheduleTemplateBusSeatPrices[];
}
