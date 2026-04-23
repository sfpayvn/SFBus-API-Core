import { DeliveryType, FulfillmentMode, GoodsEventType } from '@/module/core/goods/types/goods.types';
import { Types } from 'mongoose';
export declare class PosCreateGoodsEvent {
    type: GoodsEventType;
    stationId?: Types.ObjectId;
    scheduleId?: Types.ObjectId;
    note?: string;
    createdAt?: Date;
}
export declare class PosCreateGoodsDto {
    status: string;
    paymentStatus: string;
    goodsNumber: string;
    busRouteId: Types.ObjectId;
    busScheduleId: Types.ObjectId;
    name: string;
    customerName: string;
    customerPhoneNumber: string;
    customerAddress: string;
    senderName: string;
    senderPhoneNumber: string;
    goodsPriority: number;
    goodsImportant: boolean;
    quantity: number;
    shippingCost: number;
    cod: number;
    goodsValue: number;
    weight: number;
    length: number;
    width: number;
    height: number;
    note: string;
    paidBy: string;
    imageIds: Types.ObjectId[];
    originStationId?: Types.ObjectId;
    destinationStationId?: Types.ObjectId;
    currentStationId?: Types.ObjectId;
    currentScheduleId?: Types.ObjectId;
    deliveryType?: DeliveryType;
    pickupFulfillmentMode?: FulfillmentMode;
    deliveryFulfillmentMode?: FulfillmentMode;
    pickupAddress?: string;
    deliveryAddress?: string;
    events: PosCreateGoodsEvent[];
}
