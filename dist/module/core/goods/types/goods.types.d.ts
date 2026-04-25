export type DeliveryType = 'STATION' | 'ADDRESS';
export type FulfillmentMode = 'ROADSIDE' | 'STATION';
export type GoodsEventType = 'CREATED' | 'ASSIGNED_TO_SCHEDULE' | 'UNASSIGNED_FROM_SCHEDULE' | 'LOADED_ON_BUS' | 'DROPPED_AT_STATION' | 'DELIVERED';
export declare const GOODS_EVENT_TYPES: Record<GoodsEventType, GoodsEventType>;
