/**
 * Delivery type enumeration
 * STATION - Delivery to station/office
 * ADDRESS - Delivery to customer address
 */
export type DeliveryType = 'STATION' | 'ADDRESS';

/**
 * Fulfillment mode enumeration
 * ROADSIDE - Pickup/delivery along the roadside
 * STATION - Pickup/delivery at station/office
 */
export type FulfillmentMode = 'ROADSIDE' | 'STATION';

export type GoodsEventType =
  | 'CREATED'
  | 'ASSIGNED_TO_SCHEDULE'
  | 'UNASSIGNED_FROM_SCHEDULE'
  | 'LOADED_ON_BUS'
  | 'DROPPED_AT_STATION'
  | 'DELIVERED';

export const GOODS_EVENT_TYPES: Record<GoodsEventType, GoodsEventType> = {
  CREATED: 'CREATED',
  ASSIGNED_TO_SCHEDULE: 'ASSIGNED_TO_SCHEDULE',
  UNASSIGNED_FROM_SCHEDULE: 'UNASSIGNED_FROM_SCHEDULE',
  LOADED_ON_BUS: 'LOADED_ON_BUS',
  DROPPED_AT_STATION: 'DROPPED_AT_STATION',
  DELIVERED: 'DELIVERED',
};
