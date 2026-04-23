import { Types, Document } from 'mongoose';
import { BusRouteBreakPointsDocument, BusRouteDocument } from '../../bus-route/schema/bus-route.schema';
import { BusProvinceDocument } from '../../bus-province/schema/bus-schema.schema';
import { BusServiceDocument } from '../../bus-service/schema/bus-service.schema';
import { BusTypeDocument } from '../../bus-type/schema/bus-type.schema';
declare const BusScheduleBusDocument_base: import("@nestjs/mapped-types").MappedType<Omit<BusRouteDocument, "tenantId">>;
export declare class BusScheduleBusDocument extends BusScheduleBusDocument_base {
}
export declare class BusTemplateOfScheduleDocument {
    name: string;
    busServiceIds: Types.ObjectId[];
    busTypeId: Types.ObjectId;
    busLayoutTemplateId: Types.ObjectId;
    busServices: BusServiceDocument[];
    busType: BusTypeDocument;
}
declare const BusScheduleRouteDocument_base: import("@nestjs/mapped-types").MappedType<Omit<BusRouteDocument, "tenantId">>;
export declare class BusScheduleRouteDocument extends BusScheduleRouteDocument_base {
    breakPoints: [BusRouteScheduleBreakPointsDocument];
}
export declare class BusRouteScheduleBreakPointsDocument extends BusRouteBreakPointsDocument {
    timeSchedule: string;
    provinceId: Types.ObjectId;
    province: BusProvinceDocument;
    name: string;
    detailAddress: string;
    location: string;
}
export declare class BusSeatPricesDocument {
    seatTypeId: Types.ObjectId;
    seatTypeName: string;
    price: number;
}
export declare class BusScheduleDocument extends Document {
    tenantId: Types.ObjectId;
    busScheduleNumber: string;
    name: string;
    busId: Types.ObjectId;
    busDriverIds: Types.ObjectId[];
    bus: BusScheduleBusDocument;
    busTemplateId: Types.ObjectId;
    busTemplate: BusTemplateOfScheduleDocument;
    busRouteId: Types.ObjectId;
    busRoute: BusScheduleRouteDocument;
    busLayoutTemplateId: Types.ObjectId;
    busScheduleTemplateId: Types.ObjectId;
    busSeatLayoutBlockIds: Types.ObjectId[];
    busSeatPrices: BusSeatPricesDocument[];
    status: string;
    note: string;
    startDate: string;
    endDate: string;
    currentStationId: Types.ObjectId;
}
export declare const BusScheduleSchema: import("mongoose").Schema<BusScheduleDocument, import("mongoose").Model<BusScheduleDocument, any, any, any, Document<unknown, any, BusScheduleDocument> & BusScheduleDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BusScheduleDocument, Document<unknown, {}, import("mongoose").FlatRecord<BusScheduleDocument>> & import("mongoose").FlatRecord<BusScheduleDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export {};
