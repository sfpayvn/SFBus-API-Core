import { Types } from 'mongoose';
import { BusRouteDto } from '@/module/core/bus/bus-route/dto/bus-route.dto';
import { BusScheduleDto } from '@/module/core/bus/bus-schedule/dto/bus-schedule.dto';
import { DeliveryType, FulfillmentMode, GoodsEventType } from '@/module/core/goods/types/goods.types';
import { AdminGoodsCategoryDto } from '../../admin-good-category/dto/admin-goods-category.dto';
export declare class AdminGoodsEvent {
    type: GoodsEventType;
    stationId?: Types.ObjectId;
    scheduleId?: Types.ObjectId;
    note?: string;
}
export declare class AdminGoodsDto {
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
    categories: AdminGoodsCategoryDto[];
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
    events: AdminGoodsEvent[];
    updatedAt: Date;
    __v: number;
}
export declare class AdminGoodsSortFilter {
    key: string;
    value: string | string[];
}
export declare class AdminSearchGoodsPagingQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: AdminGoodsSortFilter;
    filters: AdminGoodsSortFilter[];
}
export declare class AdminSearchGoodsPagingRes {
    pageIdx: number;
    goods: AdminGoodsDto[];
    totalPage: number;
    totalItem: number;
    countByStatus: Record<string, number>;
}
