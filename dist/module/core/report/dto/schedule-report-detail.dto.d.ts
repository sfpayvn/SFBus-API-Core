export declare class SeatDetailReportDto {
    seatId: string;
    seatNumber: number;
    seatName: string;
    seatType: string;
    status: string;
    passenger?: {
        name: string;
        phoneNumber: string;
        email: string;
    };
    price: number;
    discountAmount: number;
    finalPrice: number;
}
export declare class BookingItemDetailDto {
    bookingItemNumber: string;
    seat: SeatDetailReportDto;
    departureStation: {
        _id: string;
        name: string;
    };
    destinationStation: {
        _id: string;
        name: string;
    };
    price: number;
    discountAmount: number;
    finalPrice: number;
}
export declare class BookingDetailReportDto {
    bookingId: string;
    bookingNumber: string;
    bookingGroupNumber: string;
    status: string;
    passenger: {
        name: string;
        phoneNumber: string;
        email: string;
    };
    quantity: number;
    bookingItems: BookingItemDetailDto[];
    totalPrice: number;
    discountTotalAmount: number;
    afterDiscountTotalPrice: number;
    paymentStatus: string;
    paymentTime?: Date;
    createdAt: Date;
}
export declare class GoodsDetailReportDto {
    goodsId: string;
    goodsNumber: string;
    name: string;
    status: string;
    paymentStatus: string;
    quantity: number;
    weight: number;
    goodsValue: number;
    shippingCost: number;
    cod: number;
    sender: {
        name: string;
        phoneNumber: string;
    };
    customer: {
        name: string;
        phoneNumber: string;
    };
    note?: string;
    createdAt: Date;
}
export declare class BookingStatsDto {
    totalBookings: number;
    totalSeatsBooked: number;
    totalSeatsAvailable: number;
    occupancyRate: number;
    totalRevenue: number;
    totalDiscount: number;
    netRevenue: number;
}
export declare class GoodsStatsDto {
    totalGoods: number;
    totalItemsShipped: number;
    totalItemsRemaining: number;
    shipmentRate: number;
    totalShippingCost: number;
    totalCod: number;
    totalGoodsRevenue: number;
    netGoodsRevenue: number;
}
export declare class ScheduleReportStatsDto {
    booking: BookingStatsDto;
    goods: GoodsStatsDto;
}
export declare class ScheduleReportDetailDto {
    scheduleId: string;
    scheduleNumber: string;
    scheduleName: string;
    tripDate: Date;
    status: string;
    bus?: {
        _id: string;
        name: string;
        registrationNumber: string;
        licensePlate: string;
    };
    route: {
        _id: string;
        name: string;
    };
    drivers: Array<{
        _id: string;
        name: string;
        phoneNumber: string;
    }>;
    totalCapacity: number;
    bookings: BookingDetailReportDto[];
    goods: GoodsDetailReportDto[];
    stats: ScheduleReportStatsDto;
    generatedAt: Date;
    generatedBy?: string;
}
export declare class ScheduleReportQueryDto {
    includeBookings?: boolean;
    includeGoods?: boolean;
    includeStats?: boolean;
}
export declare class PaginatedScheduleReportDto {
    data: ScheduleReportDetailDto;
    bookings: {
        total: number;
        items: BookingDetailReportDto[];
    };
    goods: {
        total: number;
        items: GoodsDetailReportDto[];
    };
}
