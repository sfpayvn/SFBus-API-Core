export const TRACKING_TYPES = {
  // Booking actions
  BOOKING_CREATED: 'booking_created',
  BOOKING_UPDATED: 'booking_updated',
  BOOKING_BULK_UPDATED: 'booking_bulk_updated',
  BOOKING_CANCELLED: 'booking_cancelled',

  SEAT_BOARDING: 'seat_boarding',

  // Payment actions
  PAYMENT_BOOKING_PROCESSED: 'payment_booking_processed',
  PAYMENT_GOODS_PROCESSED: 'payment_goods_processed',

  // Schedule actions
  SCHEDULE_CREATED: 'schedule_created',
  SCHEDULE_UPDATED: 'schedule_updated',
  SCHEDULE_CANCELLED: 'schedule_cancelled',

  // Goods actions
  GOODS_CREATED: 'goods_created',
  GOODS_UPDATED: 'goods_updated',
  GOODS_CANCELLED: 'goods_cancelled',
  GOODS_DELETED: 'goods_deleted',

  GOODS_BOARDING: 'goods_boarding',

  GOODS_ASSIGNMENT: 'goods_assignment',

  // Add more tracking types as needed
} as const;

export type TrackingType = (typeof TRACKING_TYPES)[keyof typeof TRACKING_TYPES];
