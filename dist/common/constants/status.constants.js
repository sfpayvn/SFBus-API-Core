"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DURATION_STATUS_OPTIONS = exports.DURATION_STATUS_LABELS = exports.DURATION_STATUS = exports.PRIORITYCLASSES = exports.EVENT_STATUS_OPTIONS = exports.EVENT_STATUS_CLASSES = exports.EVENT_STATUS_LABELS = exports.EVENT_STATUS = exports.GOODS_STATUS_OPTIONS = exports.GOODS_PAYMENT_STATUS_OPTIONS = exports.GOODS_PAYMENT_STATUS_CLASSES = exports.GOODS_PAYMENT_STATUS_LABELS = exports.GOODS_PAYMENT_STATUS = exports.GOODS_STATUS_LABELS_UPPERCASE = exports.GOODS_STATUS_CLASSES = exports.GOODS_STATUS_LABELS = exports.GOODS_STATUS = exports.SEAT_STATUS_OPTIONS = exports.SEAT_STATUS_CLASSES = exports.SEAT_STATUS_LABELS = exports.SEAT_STATUS = exports.PAYMENT_METHOD_TYPES = exports.PAYMENT_STATUS_LABELS = exports.PAYMENT_STATUS_CLASSES = exports.PAYMENT_STATUS = exports.BOOKING_STATUS_OPTIONS = exports.BOOKING_STATUS_LABELS = exports.BOOKING_STATUS_CLASSES = exports.BOOKING_STATUS = exports.COMMON_STATUS_CLASSES = exports.COMMON_STATUS_LABELS = exports.COMMON_STATUS = void 0;
exports.COMMON_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    SUSPENDED: 'suspended',
    EXPIRED: 'expired',
    CANCELLED: 'canceled',
};
exports.COMMON_STATUS_LABELS = {
    [exports.COMMON_STATUS.ACTIVE]: 'Hoạt động',
    [exports.COMMON_STATUS.INACTIVE]: 'Không hoạt động',
    [exports.COMMON_STATUS.SUSPENDED]: 'Tạm dừng',
    [exports.COMMON_STATUS.EXPIRED]: 'Hết hạn',
    [exports.COMMON_STATUS.CANCELLED]: 'Đã hủy',
};
exports.COMMON_STATUS_CLASSES = {
    [exports.COMMON_STATUS.ACTIVE]: 'border-green-500 bg-green-200',
    [exports.COMMON_STATUS.INACTIVE]: 'border-indigo-500 bg-indigo-200',
    [exports.COMMON_STATUS.SUSPENDED]: 'border-red-500 bg-red-200',
    [exports.COMMON_STATUS.EXPIRED]: 'border-gray-500 bg-gray-200',
    [exports.COMMON_STATUS.CANCELLED]: 'border-yellow-500 bg-yellow-200',
};
exports.BOOKING_STATUS = {
    RESERVED: 'reserved',
    PAID: 'paid',
    DEPOSITED: 'deposited',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
};
exports.BOOKING_STATUS_CLASSES = {
    [exports.BOOKING_STATUS.RESERVED]: 'border-yellow-500 bg-yellow-200',
    [exports.BOOKING_STATUS.PAID]: 'border-green-500 bg-green-200',
    [exports.BOOKING_STATUS.DEPOSITED]: 'border-red-500 bg-red-200',
    [exports.BOOKING_STATUS.COMPLETED]: 'border-purple-500 bg-purple-200',
    [exports.BOOKING_STATUS.CANCELLED]: 'border-indigo-500 bg-indigo-200',
};
exports.BOOKING_STATUS_LABELS = {
    [exports.BOOKING_STATUS.RESERVED]: 'Đã đặt',
    [exports.BOOKING_STATUS.PAID]: 'Đã thanh toán',
    [exports.BOOKING_STATUS.DEPOSITED]: 'Đã đặt cọc',
    [exports.BOOKING_STATUS.COMPLETED]: 'Hoàn thành',
    [exports.BOOKING_STATUS.CANCELLED]: 'Đã hủy',
};
exports.BOOKING_STATUS_OPTIONS = [
    { value: exports.BOOKING_STATUS.RESERVED, label: exports.BOOKING_STATUS_LABELS[exports.BOOKING_STATUS.RESERVED] },
    { value: exports.BOOKING_STATUS.DEPOSITED, label: exports.BOOKING_STATUS_LABELS[exports.BOOKING_STATUS.DEPOSITED] },
    { value: exports.BOOKING_STATUS.PAID, label: exports.BOOKING_STATUS_LABELS[exports.BOOKING_STATUS.PAID] },
    { value: exports.BOOKING_STATUS.COMPLETED, label: exports.BOOKING_STATUS_LABELS[exports.BOOKING_STATUS.COMPLETED] },
    { value: exports.BOOKING_STATUS.CANCELLED, label: exports.BOOKING_STATUS_LABELS[exports.BOOKING_STATUS.CANCELLED] },
];
exports.PAYMENT_STATUS = {
    PENDING: 'pending',
    COMPLETED: 'completed',
    FAILED: 'failed',
    REFUNDED: 'refunded',
};
exports.PAYMENT_STATUS_CLASSES = {
    [exports.PAYMENT_STATUS.PENDING]: 'border-yellow-500 bg-yellow-200',
    [exports.PAYMENT_STATUS.COMPLETED]: 'border-green-500 bg-green-200',
    [exports.PAYMENT_STATUS.FAILED]: 'border-red-500 bg-red-200',
    [exports.PAYMENT_STATUS.REFUNDED]: 'border-purple-500 bg-purple-200',
};
exports.PAYMENT_STATUS_LABELS = {
    [exports.PAYMENT_STATUS.PENDING]: 'Đang xử lý',
    [exports.PAYMENT_STATUS.COMPLETED]: 'Thành công',
    [exports.PAYMENT_STATUS.FAILED]: 'Thất bại',
    [exports.PAYMENT_STATUS.REFUNDED]: 'Đã hoàn tiền',
};
exports.PAYMENT_METHOD_TYPES = {
    card: 'Card',
    banking: 'Banking',
    cash: 'Cash',
};
exports.SEAT_STATUS = {
    NOT_PICKED_UP: 'not_picked_up',
    PICKED_UP: 'picked_up',
    ON_BOARD: 'on_board',
    DROPPED_OFF: 'dropped_off',
};
exports.SEAT_STATUS_LABELS = {
    [exports.SEAT_STATUS.NOT_PICKED_UP]: 'Chưa đón',
    [exports.SEAT_STATUS.PICKED_UP]: 'Đã đón',
    [exports.SEAT_STATUS.ON_BOARD]: 'Đã lên xe',
    [exports.SEAT_STATUS.DROPPED_OFF]: 'Đã trả khách',
};
exports.SEAT_STATUS_CLASSES = {
    [exports.SEAT_STATUS.NOT_PICKED_UP]: 'border-orange-600 bg-orange-200',
    [exports.SEAT_STATUS.PICKED_UP]: 'border-blue-600 bg-blue-200',
    [exports.SEAT_STATUS.ON_BOARD]: 'border-green-600 bg-green-200',
    [exports.SEAT_STATUS.DROPPED_OFF]: 'border-purple-600 bg-purple-200',
};
exports.SEAT_STATUS_OPTIONS = [
    { value: exports.SEAT_STATUS.NOT_PICKED_UP, label: exports.SEAT_STATUS_LABELS[exports.SEAT_STATUS.NOT_PICKED_UP] },
    { value: exports.SEAT_STATUS.PICKED_UP, label: exports.SEAT_STATUS_LABELS[exports.SEAT_STATUS.PICKED_UP] },
    { value: exports.SEAT_STATUS.ON_BOARD, label: exports.SEAT_STATUS_LABELS[exports.SEAT_STATUS.ON_BOARD] },
    { value: exports.SEAT_STATUS.DROPPED_OFF, label: exports.SEAT_STATUS_LABELS[exports.SEAT_STATUS.DROPPED_OFF] },
];
exports.GOODS_STATUS = {
    NEW: 'new',
    PENDING: 'pending',
    ON_BOARD: 'on_board',
    WAITING_CONTINUE_DELIVERY: 'waiting_continue_delivery',
    ARRIVED_FINAL_STATION: 'arrived_final_station',
    OUT_FOR_DELIVERY: 'out_for_delivery',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
};
exports.GOODS_STATUS_LABELS = {
    [exports.GOODS_STATUS.NEW]: 'Nhập hàng',
    [exports.GOODS_STATUS.PENDING]: 'Chờ vận chuyển',
    [exports.GOODS_STATUS.ON_BOARD]: 'Đang vận chuyển',
    [exports.GOODS_STATUS.WAITING_CONTINUE_DELIVERY]: 'Chờ tiếp tục',
    [exports.GOODS_STATUS.ARRIVED_FINAL_STATION]: 'Đã tới trạm',
    [exports.GOODS_STATUS.OUT_FOR_DELIVERY]: 'Đang giao',
    [exports.GOODS_STATUS.COMPLETED]: 'Hoàn thành',
    [exports.GOODS_STATUS.CANCELLED]: 'Đã hủy',
};
exports.GOODS_STATUS_CLASSES = {
    [exports.GOODS_STATUS.NEW]: 'border-orange-500 bg-orange-200',
    [exports.GOODS_STATUS.PENDING]: 'border-yellow-500 bg-yellow-200 ',
    [exports.GOODS_STATUS.ON_BOARD]: 'border-blue-500 bg-blue-200',
    [exports.GOODS_STATUS.WAITING_CONTINUE_DELIVERY]: 'border-indigo-500 bg-indigo-200',
    [exports.GOODS_STATUS.ARRIVED_FINAL_STATION]: 'border-purple-500 bg-purple-200',
    [exports.GOODS_STATUS.OUT_FOR_DELIVERY]: 'border-pink-500 bg-pink-200',
    [exports.GOODS_STATUS.COMPLETED]: 'border-green-500 bg-green-200',
    [exports.GOODS_STATUS.CANCELLED]: 'border-red-500 bg-red-200',
};
exports.GOODS_STATUS_LABELS_UPPERCASE = {
    [exports.GOODS_STATUS.NEW]: 'NHẬP HÀNG',
    [exports.GOODS_STATUS.PENDING]: 'CHỜ VẬN CHUYỂN',
    [exports.GOODS_STATUS.ON_BOARD]: 'ĐANG TRÊN ĐƯỜNG',
    [exports.GOODS_STATUS.WAITING_CONTINUE_DELIVERY]: 'CHỜ TIẾP TỤC',
    [exports.GOODS_STATUS.ARRIVED_FINAL_STATION]: 'ĐÃ TỚI TRẠM',
    [exports.GOODS_STATUS.OUT_FOR_DELIVERY]: 'ĐANG GIAO',
    [exports.GOODS_STATUS.COMPLETED]: 'HOÀN THÀNH',
    [exports.GOODS_STATUS.CANCELLED]: 'ĐÃ HỦY',
};
exports.GOODS_PAYMENT_STATUS = {
    NEW: 'new',
    DEPOSITED: 'deposited',
    PAID: 'paid',
    READY_REFUND: 'ready_refund',
    REFUNDED: 'refunded',
};
exports.GOODS_PAYMENT_STATUS_LABELS = {
    [exports.GOODS_PAYMENT_STATUS.NEW]: 'Chưa thanh toán',
    [exports.GOODS_PAYMENT_STATUS.DEPOSITED]: 'Thanh toán 1 phần',
    [exports.GOODS_PAYMENT_STATUS.READY_REFUND]: 'Chờ hoàn tiền',
    [exports.GOODS_PAYMENT_STATUS.PAID]: 'Đã thanh toán',
    [exports.GOODS_PAYMENT_STATUS.REFUNDED]: 'Đã hoàn tiền',
};
exports.GOODS_PAYMENT_STATUS_CLASSES = {
    [exports.GOODS_PAYMENT_STATUS.NEW]: 'border-yellow-500 bg-yellow-200',
    [exports.GOODS_PAYMENT_STATUS.DEPOSITED]: 'border-orange-500 bg-orange-200',
    [exports.GOODS_PAYMENT_STATUS.PAID]: 'border-green-500 bg-green-200',
    [exports.GOODS_PAYMENT_STATUS.READY_REFUND]: 'border-indigo-500 bg-indigo-200',
    [exports.GOODS_PAYMENT_STATUS.REFUNDED]: 'border-purple-500 bg-purple-200',
};
exports.GOODS_PAYMENT_STATUS_OPTIONS = [
    { value: exports.GOODS_PAYMENT_STATUS.NEW, label: exports.GOODS_PAYMENT_STATUS_LABELS[exports.GOODS_PAYMENT_STATUS.NEW] },
    { value: exports.GOODS_PAYMENT_STATUS.DEPOSITED, label: exports.GOODS_PAYMENT_STATUS_LABELS[exports.GOODS_PAYMENT_STATUS.DEPOSITED] },
    { value: exports.GOODS_PAYMENT_STATUS.PAID, label: exports.GOODS_PAYMENT_STATUS_LABELS[exports.GOODS_PAYMENT_STATUS.PAID] },
    { value: exports.GOODS_PAYMENT_STATUS.READY_REFUND, label: exports.GOODS_PAYMENT_STATUS_LABELS[exports.GOODS_PAYMENT_STATUS.READY_REFUND] },
    { value: exports.GOODS_PAYMENT_STATUS.REFUNDED, label: exports.GOODS_PAYMENT_STATUS_LABELS[exports.GOODS_PAYMENT_STATUS.REFUNDED] },
];
exports.GOODS_STATUS_OPTIONS = [
    { value: exports.GOODS_STATUS.NEW, label: exports.GOODS_STATUS_LABELS_UPPERCASE[exports.GOODS_STATUS.NEW] },
    { value: exports.GOODS_STATUS.PENDING, label: exports.GOODS_STATUS_LABELS_UPPERCASE[exports.GOODS_STATUS.PENDING] },
    { value: exports.GOODS_STATUS.ON_BOARD, label: exports.GOODS_STATUS_LABELS_UPPERCASE[exports.GOODS_STATUS.ON_BOARD] },
    {
        value: exports.GOODS_STATUS.WAITING_CONTINUE_DELIVERY,
        label: exports.GOODS_STATUS_LABELS_UPPERCASE[exports.GOODS_STATUS.WAITING_CONTINUE_DELIVERY],
    },
    {
        value: exports.GOODS_STATUS.ARRIVED_FINAL_STATION,
        label: exports.GOODS_STATUS_LABELS_UPPERCASE[exports.GOODS_STATUS.ARRIVED_FINAL_STATION],
    },
    { value: exports.GOODS_STATUS.OUT_FOR_DELIVERY, label: exports.GOODS_STATUS_LABELS_UPPERCASE[exports.GOODS_STATUS.OUT_FOR_DELIVERY] },
    { value: exports.GOODS_STATUS.COMPLETED, label: exports.GOODS_STATUS_LABELS_UPPERCASE[exports.GOODS_STATUS.COMPLETED] },
    { value: exports.GOODS_STATUS.CANCELLED, label: exports.GOODS_STATUS_LABELS_UPPERCASE[exports.GOODS_STATUS.CANCELLED] },
];
exports.EVENT_STATUS = {
    UN_PUBLISHED: 'un_published',
    SCHEDULED: 'scheduled',
    CANCELLED: 'cancelled',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    OVERDUE: 'overdue',
};
exports.EVENT_STATUS_LABELS = {
    [exports.EVENT_STATUS.UN_PUBLISHED]: 'Chưa xuất bản',
    [exports.EVENT_STATUS.SCHEDULED]: 'Đã lên lịch',
    [exports.EVENT_STATUS.CANCELLED]: 'Đã hủy',
    [exports.EVENT_STATUS.IN_PROGRESS]: 'Đang diễn ra',
    [exports.EVENT_STATUS.COMPLETED]: 'Hoàn thành',
    [exports.EVENT_STATUS.OVERDUE]: 'Quá hạn',
};
exports.EVENT_STATUS_CLASSES = {
    [exports.EVENT_STATUS.UN_PUBLISHED]: 'border-gray-500 bg-gray-200 text-gray-800',
    [exports.EVENT_STATUS.SCHEDULED]: 'border-blue-500 bg-blue-200 text-blue-800',
    [exports.EVENT_STATUS.CANCELLED]: 'border-red-500 bg-red-200 text-red-800',
    [exports.EVENT_STATUS.IN_PROGRESS]: 'border-indigo-500 bg-indigo-200 text-indigo-800',
    [exports.EVENT_STATUS.COMPLETED]: 'border-green-500 bg-green-200 text-green-800',
    [exports.EVENT_STATUS.OVERDUE]: 'border-orange-500 bg-orange-200 text-orange-800',
};
exports.EVENT_STATUS_OPTIONS = [
    { value: exports.EVENT_STATUS.SCHEDULED, label: exports.EVENT_STATUS_LABELS[exports.EVENT_STATUS.SCHEDULED] },
    { value: exports.EVENT_STATUS.IN_PROGRESS, label: exports.EVENT_STATUS_LABELS[exports.EVENT_STATUS.IN_PROGRESS] },
    { value: exports.EVENT_STATUS.COMPLETED, label: exports.EVENT_STATUS_LABELS[exports.EVENT_STATUS.COMPLETED] },
    { value: exports.EVENT_STATUS.CANCELLED, label: exports.EVENT_STATUS_LABELS[exports.EVENT_STATUS.CANCELLED] },
    { value: exports.EVENT_STATUS.OVERDUE, label: exports.EVENT_STATUS_LABELS[exports.EVENT_STATUS.OVERDUE] },
];
exports.PRIORITYCLASSES = {
    1: 'border-gray-500 bg-gray-200 text-gray-800',
    2: 'border-blue-500 bg-blue-200 text-blue-800',
    3: 'border-green-500 bg-green-200 text-green-800',
    4: 'border-yellow-500 bg-yellow-200 text-yellow-800',
    5: 'border-red-500 bg-red-200 text-red-800',
    6: 'border-purple-500 bg-purple-200 text-purple-800',
    7: 'border-pink-500 bg-pink-200 text-pink-800',
    8: 'border-indigo-500 bg-indigo-200 text-indigo-800',
    9: 'border-teal-500 bg-teal-200 text-teal-800',
    10: 'border-cyan-500 bg-cyan-200 text-cyan-800',
};
exports.DURATION_STATUS = {
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
    YEAR: 'year',
    LIFETIME: 'lifetime',
};
exports.DURATION_STATUS_LABELS = {
    [exports.DURATION_STATUS.DAY]: 'Ngày',
    [exports.DURATION_STATUS.WEEK]: 'Tuần',
    [exports.DURATION_STATUS.MONTH]: 'Tháng',
    [exports.DURATION_STATUS.YEAR]: 'Năm',
    [exports.DURATION_STATUS.LIFETIME]: 'Không bao giờ hết hạn',
};
exports.DURATION_STATUS_OPTIONS = [
    { value: exports.DURATION_STATUS.DAY, label: exports.DURATION_STATUS_LABELS[exports.DURATION_STATUS.DAY] },
    { value: exports.DURATION_STATUS.WEEK, label: exports.DURATION_STATUS_LABELS[exports.DURATION_STATUS.WEEK] },
    { value: exports.DURATION_STATUS.MONTH, label: exports.DURATION_STATUS_LABELS[exports.DURATION_STATUS.MONTH] },
    { value: exports.DURATION_STATUS.YEAR, label: exports.DURATION_STATUS_LABELS[exports.DURATION_STATUS.YEAR] },
    { value: exports.DURATION_STATUS.LIFETIME, label: exports.DURATION_STATUS_LABELS[exports.DURATION_STATUS.LIFETIME] },
];
//# sourceMappingURL=status.constants.js.map