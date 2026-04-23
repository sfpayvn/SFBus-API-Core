import { Types } from 'mongoose';
import { GoodsCategoryDto } from '../../good-category/dto/goods-category.dto';
import { BusRouteDto } from '@/module/core/bus/bus-route/dto/bus-route.dto';
import { BusScheduleDto } from '@/module/core/bus/bus-schedule/dto/bus-schedule.dto';
import { DeliveryType, FulfillmentMode, GoodsEventType } from '../../types/goods.types';
export declare class GoodsEvent {
    type: GoodsEventType;
    stationId?: Types.ObjectId;
    scheduleId?: Types.ObjectId;
    note?: string;
    createdAt?: Date;
}
export declare class GoodsDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    busScheduleId: Types.ObjectId;
    busSchedule: BusScheduleDto;
    busRouteId: Types.ObjectId;
    busRoute: BusRouteDto;
    name: string;
    goodsNumber: string;
    customerName: string;
    customerPhoneNumber: string;
    senderName: string;
    senderPhoneNumber: string;
    goodsPriority: number;
    goodsImportant: boolean;
    quantity: number;
    shippingCost: number;
    cod: number;
    goodsValue: number;
    categories: GoodsCategoryDto[];
    weight: number;
    length: number;
    width: number;
    note: string;
    status: string;
    paymentStatus: string;
    paidBy: string;
    imageIds: Types.ObjectId[];
    images: string[];
    originStationId?: Types.ObjectId;
    destinationStationId?: Types.ObjectId;
    currentStationId?: Types.ObjectId;
    currentScheduleId?: Types.ObjectId;
    deliveryType?: DeliveryType;
    pickupFulfillmentMode?: FulfillmentMode;
    deliveryFulfillmentMode?: FulfillmentMode;
    pickupAddress?: string;
    deliveryAddress?: string;
    createdAt: Date;
    events: GoodsEvent[];
    updatedAt: Date;
    __v: number;
}
export declare class GoodsSortFilter {
    key: string;
    value: string | string[];
}
export declare class SearchGoodsPagingQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: GoodsSortFilter;
    filters: GoodsSortFilter[];
}
export declare class SearchGoodsPagingRes {
    pageIdx: number;
    goods: GoodsDto[];
    totalPage: number;
    totalItem: number;
    countByStatus: Record<string, number>;
}
