export declare class BaseDetailQueryDto {
    startDate: Date;
    endDate: Date;
    platform?: string;
    userId?: string;
    pageIdx?: number;
    pageSize?: number;
    groupBy?: 'hour' | 'day' | 'week' | 'month';
    comparisonMode?: boolean;
    comparisonStartDate?: Date;
    comparisonEndDate?: Date;
}
export declare class BookingDetailQueryDto extends BaseDetailQueryDto {
    busRouteId?: string;
    status?: string;
}
export declare class ScheduleDetailQueryDto extends BaseDetailQueryDto {
    busRouteId?: string;
    status?: string;
}
export declare class GoodsDetailQueryDto extends BaseDetailQueryDto {
    busRouteId?: string;
    status?: string;
}
export declare class PaymentDetailQueryDto extends BaseDetailQueryDto {
    paymentMethodId?: string;
    bookingId?: string;
}
export declare class DetailResponseDto<T> {
    data: T[];
    total: number;
    pageIdx: number;
    pageSize: number;
    totalPages: number;
    metadata: {
        startDate: string;
        endDate: string;
    };
}
export declare class GroupedDetailItem<T> {
    label: string;
    date: string;
    count: number;
    data: T[];
}
export declare class GroupedDetailResponseDto<T> {
    groups: GroupedDetailItem<T>[];
    total: number;
    comparisonGroups?: GroupedDetailItem<T>[];
    comparisonTotal?: number;
    metadata: {
        startDate: string;
        endDate: string;
        groupBy: string;
        comparisonStartDate?: string;
        comparisonEndDate?: string;
    };
}
