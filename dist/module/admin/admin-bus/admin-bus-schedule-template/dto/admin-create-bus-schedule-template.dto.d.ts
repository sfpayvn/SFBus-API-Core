import { Types } from 'mongoose';
import { AdminCreateBusRouteBreakPointsDto, AdminCreateBusRouteDto } from '../../admin-bus-route/dto/admin-create-bus-route.dto';
export declare class AdminCreateBusScheduleTemplateBusSeatPrices {
    seatTypeId: Types.ObjectId;
    seatTypeName: string;
    price: number;
}
export declare class AdminCreateBusScheduleTemplateBreakPointsTimeDto extends AdminCreateBusRouteBreakPointsDto {
    timeOffset: string;
}
export declare class AdminCreateBusRouteScheduleTemplateDto extends AdminCreateBusRouteDto {
    breakPoints: AdminCreateBusScheduleTemplateBreakPointsTimeDto[];
}
export declare class AdminCreateBusScheduleTemplateDto {
    tenantId: Types.ObjectId;
    name: string;
    busId: Types.ObjectId;
    busDriverIds: Types.ObjectId[];
    busTemplateId: Types.ObjectId;
    busSeatLayoutBlockIds: Types.ObjectId[];
    busRouteId: Types.ObjectId;
    busRoute: AdminCreateBusRouteScheduleTemplateDto;
    busSeatPrices: AdminCreateBusScheduleTemplateBusSeatPrices[];
}
