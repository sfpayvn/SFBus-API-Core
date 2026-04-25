export declare class ReportComparisonHelperService {
    calculateComparisonDates(startDate: Date, endDate: Date, compareStartDate?: Date, compareEndDate?: Date, timezoneOffset?: number): {
        calculatedCompareStartDate: Date;
        calculatedCompareEndDate: Date;
        compareText: string;
    };
    calculatePercentageChange(currentValue: number, compareValue: number, compareText: string): {
        change: string;
        changeType: 'increase' | 'decrease' | 'neutral';
        percentage: number;
    };
}
