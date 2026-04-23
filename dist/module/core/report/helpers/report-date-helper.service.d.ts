import { GroupedDetailResponseDto } from '../dto/report-details.dto';
export declare class ReportDateHelperService {
    groupDataByDate(allData: any[], startDate: Date, endDate: Date, groupBy: 'hour' | 'day' | 'week' | 'month', dateField: string): GroupedDetailResponseDto<any>;
    getDateLabelFormat(groupBy: 'hour' | 'day' | 'week' | 'month'): (date: Date) => string;
    incrementDate(date: Date, groupBy: 'hour' | 'day' | 'week' | 'month'): void;
    getWeekNumber(date: Date): number;
}
