export declare class StatsQueryDto {
    userId?: string;
    startDate: Date;
    endDate: Date;
    comparisonStartDate?: Date;
    comparisonEndDate?: Date;
    platform?: string;
    comparisonMode: boolean;
}
export declare class StatsResponseDto {
    value: number;
    total: number;
    change?: string;
    changeType?: 'increase' | 'decrease' | 'neutral';
    percentage?: number;
}
