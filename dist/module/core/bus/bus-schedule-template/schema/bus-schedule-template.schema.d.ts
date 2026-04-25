import { Types, Document } from 'mongoose';
import { BusRouteBreakPointsDocument, BusRouteDocument } from '../../bus-route/schema/bus-route.schema';
import { BusSeatPricesDocument } from '../../bus-schedule/schema/bus-schedule.schema';
declare const BusScheduleTemplateRouteDocument_base: import("@nestjs/mapped-types").MappedType<Omit<BusRouteDocument, "tenantId">>;
export declare class BusScheduleTemplateRouteDocument extends BusScheduleTemplateRouteDocument_base {
    breakPoints: [BusRouteScheduleTemplateBreakPointsDocument];
}
export declare class BusRouteScheduleTemplateBreakPointsDocument extends BusRouteBreakPointsDocument {
    timeOffset: string;
}
export declare class BusSeatPricesScheduleTemplateBreakPointsDocument extends BusSeatPricesDocument {
}
export declare class BusScheduleTemplateDocument extends Document {
    tenantId: Types.ObjectId;
    name: string;
    busId: Types.ObjectId;
    busDriverIds: Types.ObjectId[];
    busTemplateId: Types.ObjectId;
    busSeatLayoutBlockIds: Types.ObjectId[];
    busRouteId: Types.ObjectId;
    busRoute: BusScheduleTemplateRouteDocument;
    busSeatPrices: BusSeatPricesScheduleTemplateBreakPointsDocument;
}
export declare const BusScheduleTemplateSchema: import("mongoose").Schema<BusScheduleTemplateDocument, import("mongoose").Model<BusScheduleTemplateDocument, any, any, any, Document<unknown, any, BusScheduleTemplateDocument> & BusScheduleTemplateDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BusScheduleTemplateDocument, Document<unknown, {}, import("mongoose").FlatRecord<BusScheduleTemplateDocument>> & import("mongoose").FlatRecord<BusScheduleTemplateDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export {};
