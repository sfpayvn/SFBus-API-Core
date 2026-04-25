import { Document } from 'mongoose';
import { Types } from 'mongoose';
import { DeliveryType, FulfillmentMode } from '../../types/goods.types';
export declare class GoodsDocument extends Document {
    tenantId: Types.ObjectId;
    busScheduleId: Types.ObjectId | null;
    name: string;
    goodsNumber: string;
    customerName: string;
    customerPhoneNumber: string;
    senderName: string;
    senderPhoneNumber: string | null;
    goodsPriority: number;
    goodsImportant: boolean;
    quantity: number;
    shippingCost: number;
    cod: number;
    goodsValue: number;
    categoriesIds: Types.ObjectId[];
    busRouteId: Types.ObjectId;
    weight: number;
    length: number;
    width: number;
    height: number;
    note: string;
    status: string;
    paymentStatus: string;
    paidBy: string;
    imageIds: Types.ObjectId[];
    originStationId: Types.ObjectId | null;
    destinationStationId: Types.ObjectId | null;
    currentStationId: Types.ObjectId | null;
    currentScheduleId: Types.ObjectId | null;
    events: any[];
    deliveryType: DeliveryType;
    pickupFulfillmentMode: FulfillmentMode;
    deliveryFulfillmentMode: FulfillmentMode;
    pickupAddress: string | null;
    deliveryAddress: string | null;
}
export declare const GoodsSchema: import("mongoose").Schema<GoodsDocument, import("mongoose").Model<GoodsDocument, any, any, any, Document<unknown, any, GoodsDocument> & GoodsDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, GoodsDocument, Document<unknown, {}, import("mongoose").FlatRecord<GoodsDocument>> & import("mongoose").FlatRecord<GoodsDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
