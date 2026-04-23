export declare const COMMON_STATUS: {
    readonly ACTIVE: "active";
    readonly INACTIVE: "inactive";
    readonly SUSPENDED: "suspended";
    readonly EXPIRED: "expired";
    readonly CANCELLED: "canceled";
};
export declare const COMMON_STATUS_LABELS: {
    [key: string]: string;
};
export declare const COMMON_STATUS_CLASSES: {
    [key: string]: string;
};
export type CommonStatus = (typeof COMMON_STATUS)[keyof typeof COMMON_STATUS];
export declare const BOOKING_STATUS: {
    readonly RESERVED: "reserved";
    readonly PAID: "paid";
    readonly DEPOSITED: "deposited";
    readonly COMPLETED: "completed";
    readonly CANCELLED: "cancelled";
};
export declare const BOOKING_STATUS_CLASSES: {
    [key: string]: string;
};
export declare const BOOKING_STATUS_LABELS: {
    [key: string]: string;
};
export declare const BOOKING_STATUS_OPTIONS: ({
    value: "reserved";
    label: string;
} | {
    value: "deposited";
    label: string;
} | {
    value: "paid";
    label: string;
} | {
    value: "completed";
    label: string;
} | {
    value: "cancelled";
    label: string;
})[];
export type BookingStatusType = (typeof BOOKING_STATUS)[keyof typeof BOOKING_STATUS];
export declare const PAYMENT_STATUS: {
    readonly PENDING: "pending";
    readonly COMPLETED: "completed";
    readonly FAILED: "failed";
    readonly REFUNDED: "refunded";
};
export declare const PAYMENT_STATUS_CLASSES: {
    [key: string]: string;
};
export declare const PAYMENT_STATUS_LABELS: {
    [key: string]: string;
};
export type PaymentStatusType = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];
export declare const PAYMENT_METHOD_TYPES: {
    readonly card: "Card";
    readonly banking: "Banking";
    readonly cash: "Cash";
};
export declare const SEAT_STATUS: {
    readonly NOT_PICKED_UP: "not_picked_up";
    readonly PICKED_UP: "picked_up";
    readonly ON_BOARD: "on_board";
    readonly DROPPED_OFF: "dropped_off";
};
export declare const SEAT_STATUS_LABELS: {
    [key: string]: string;
};
export declare const SEAT_STATUS_CLASSES: {
    [key: string]: string;
};
export declare const SEAT_STATUS_OPTIONS: ({
    value: "not_picked_up";
    label: string;
} | {
    value: "picked_up";
    label: string;
} | {
    value: "on_board";
    label: string;
} | {
    value: "dropped_off";
    label: string;
})[];
export type SeatStatusType = (typeof SEAT_STATUS)[keyof typeof SEAT_STATUS];
export declare const GOODS_STATUS: {
    readonly NEW: "new";
    readonly PENDING: "pending";
    readonly ON_BOARD: "on_board";
    readonly WAITING_CONTINUE_DELIVERY: "waiting_continue_delivery";
    readonly ARRIVED_FINAL_STATION: "arrived_final_station";
    readonly OUT_FOR_DELIVERY: "out_for_delivery";
    readonly COMPLETED: "completed";
    readonly CANCELLED: "cancelled";
};
export declare const GOODS_STATUS_LABELS: {
    [key: string]: string;
};
export declare const GOODS_STATUS_CLASSES: {
    [key: string]: string;
};
export declare const GOODS_STATUS_LABELS_UPPERCASE: {
    [key: string]: string;
};
export declare const GOODS_PAYMENT_STATUS: {
    readonly NEW: "new";
    readonly DEPOSITED: "deposited";
    readonly PAID: "paid";
    readonly READY_REFUND: "ready_refund";
    readonly REFUNDED: "refunded";
};
export declare const GOODS_PAYMENT_STATUS_LABELS: {
    [key: string]: string;
};
export declare const GOODS_PAYMENT_STATUS_CLASSES: {
    [key: string]: string;
};
export declare const GOODS_PAYMENT_STATUS_OPTIONS: ({
    value: "new";
    label: string;
} | {
    value: "deposited";
    label: string;
} | {
    value: "paid";
    label: string;
} | {
    value: "ready_refund";
    label: string;
} | {
    value: "refunded";
    label: string;
})[];
export declare const GOODS_STATUS_OPTIONS: ({
    value: "new";
    label: string;
} | {
    value: "pending";
    label: string;
} | {
    value: "on_board";
    label: string;
} | {
    value: "waiting_continue_delivery";
    label: string;
} | {
    value: "arrived_final_station";
    label: string;
} | {
    value: "out_for_delivery";
    label: string;
} | {
    value: "completed";
    label: string;
} | {
    value: "cancelled";
    label: string;
})[];
export type GoodsStatusType = (typeof GOODS_STATUS)[keyof typeof GOODS_STATUS];
export declare const EVENT_STATUS: {
    readonly UN_PUBLISHED: "un_published";
    readonly SCHEDULED: "scheduled";
    readonly CANCELLED: "cancelled";
    readonly IN_PROGRESS: "in_progress";
    readonly COMPLETED: "completed";
    readonly OVERDUE: "overdue";
};
export declare const EVENT_STATUS_LABELS: {
    [key: string]: string;
};
export declare const EVENT_STATUS_CLASSES: {
    [key: string]: string;
};
export declare const EVENT_STATUS_OPTIONS: ({
    value: "scheduled";
    label: string;
} | {
    value: "in_progress";
    label: string;
} | {
    value: "completed";
    label: string;
} | {
    value: "cancelled";
    label: string;
} | {
    value: "overdue";
    label: string;
})[];
export type EventStatusType = (typeof EVENT_STATUS)[keyof typeof EVENT_STATUS];
export declare const PRIORITYCLASSES: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
};
export declare const DURATION_STATUS: {
    readonly DAY: "day";
    readonly WEEK: "week";
    readonly MONTH: "month";
    readonly YEAR: "year";
    readonly LIFETIME: "lifetime";
};
export declare const DURATION_STATUS_LABELS: {
    [key: string]: string;
};
export declare const DURATION_STATUS_OPTIONS: ({
    value: "day";
    label: string;
} | {
    value: "week";
    label: string;
} | {
    value: "month";
    label: string;
} | {
    value: "year";
    label: string;
} | {
    value: "lifetime";
    label: string;
})[];
export type DurationStatusType = (typeof DURATION_STATUS)[keyof typeof DURATION_STATUS];
