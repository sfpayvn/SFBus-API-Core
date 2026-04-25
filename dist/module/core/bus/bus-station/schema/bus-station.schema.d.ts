import { Types, Document } from 'mongoose';
export declare class BusStationDocument extends Document {
    tenantId: Types.ObjectId;
    name: string;
    detailAddress: string;
    location: string;
    provinceId: Types.ObjectId;
    imageId?: Types.ObjectId;
    isOffice?: boolean;
    isActive?: boolean;
}
export declare const BusStationSchema: import("mongoose").Schema<BusStationDocument, import("mongoose").Model<BusStationDocument, any, any, any, Document<unknown, any, BusStationDocument> & BusStationDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BusStationDocument, Document<unknown, {}, import("mongoose").FlatRecord<BusStationDocument>> & import("mongoose").FlatRecord<BusStationDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
