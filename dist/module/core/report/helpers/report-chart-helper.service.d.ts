import { Model } from 'mongoose';
import { ChartDataPointDto } from '../dto/report-chart-stats.dto';
import { ReportDateHelperService } from './report-date-helper.service';
export declare class ReportChartHelperService {
    private readonly dateHelper;
    constructor(dateHelper: ReportDateHelperService);
    getChartData(model: Model<any>, matchFilter: any, startDate: Date, endDate: Date, finalGroupBy: 'hour' | 'day', timezoneOffset: number, dateField?: string, sumField?: string): Promise<ChartDataPointDto>;
    groupDataByDate(data: any[], startDate: Date, endDate: Date, groupBy: 'hour' | 'day' | 'week' | 'month', timezoneOffset: number, dateField?: string): {
        label: string;
        date: string;
        count: number;
        data: any[];
    }[];
}
