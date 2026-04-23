export declare class ChartStatsQueryDto {
    startDate: Date;
    endDate: Date;
    comparisonStartDate?: Date;
    comparisonEndDate?: Date;
    comparisonMode: boolean;
    platform?: string;
    userId?: string;
}
export declare class ChartDataPointDto {
    labels: string[];
    data: number[];
    total: number;
    average: number;
}
export declare class ChartStatsResponseDto {
    current: ChartDataPointDto;
    previous?: ChartDataPointDto;
    metadata: {
        startDate: string;
        endDate: string;
        comparisonStartDate?: string;
        comparisonEndDate?: string;
        groupBy?: string;
    };
}
