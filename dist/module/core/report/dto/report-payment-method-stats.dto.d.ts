export declare class PaymentMethodStatsQueryDto {
    startDate: Date;
    endDate: Date;
    platform?: string;
    userId?: string;
}
export declare class PaymentMethodStatItemDto {
    method: string;
    count: number;
    percentage: number;
}
export declare class PaymentMethodStatsResponseDto {
    data: PaymentMethodStatItemDto[];
    total: number;
    metadata: {
        startDate: string;
        endDate: string;
    };
}
