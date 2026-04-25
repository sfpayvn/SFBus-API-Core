import { Types } from 'mongoose';
import { BusRouteDto } from '@/module/core/bus/bus-route/dto/bus-route.dto';
import { BusScheduleDto } from '@/module/core/bus/bus-schedule/dto/bus-schedule.dto';
import { DriverGoodsCategoryDto } from '../../driver-good-category/dto/driver-goods-category.dto';
import { DeliveryType, FulfillmentMode } from '@/module/core/goods/types/goods.types';
export declare class DriverGoodsDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    busScheduleId: Types.ObjectId;
    busSchedule: BusScheduleDto;
    name: string;
    goodsNumber: string;
    customerName: string;
    customerPhoneNumber: string;
    senderName: string;
    goodsPriority: number;
    goodsImportant: boolean;
    quantity: number;
    shippingCost: number;
    cod: number;
    goodsValue: number;
    categories: DriverGoodsCategoryDto[];
    busRouteId: Types.ObjectId;
    weight: number;
    length: number;
    width: number;
    busRoute: BusRouteDto;
    note: string;
    status: string;
    paidBy: string;
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
    updatedAt: Date;
    __v: number;
}
export declare class DriverGoodsSortFilter {
    key: string;
    value: string | string[];
}
export declare class DriverSearchGoodsPagingQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: DriverGoodsSortFilter;
    filters: DriverGoodsSortFilter[];
}
export declare class DriverSearchGoodsPagingRes {
    pageIdx: number;
    goods: DriverGoodsDto[];
    totalPage: number;
    totalItem: number;
}
