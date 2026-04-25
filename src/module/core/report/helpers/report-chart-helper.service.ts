import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { ChartDataPointDto } from '../dto/report-chart-stats.dto';
import { ReportDateHelperService } from './report-date-helper.service';

/**
 * Helper service cho chart data aggregation và grouping
 */
@Injectable()
export class ReportChartHelperService {
  constructor(private readonly dateHelper: ReportDateHelperService) {}

  /**
   * Lấy dữ liệu chart từ tracking collection
   */
  async getChartData(
    model: Model<any>,
    matchFilter: any,
    startDate: Date,
    endDate: Date,
    finalGroupBy: 'hour' | 'day',
    timezoneOffset: number,
    dateField: string = 'createdAt',
    sumField?: string, // Field để sum (vd: 'metadata.totalTickets'), nếu không có thì count records
  ): Promise<ChartDataPointDto> {
    // Tự động xác định groupBy dựa vào range

    // Tạo group expression dựa theo groupBy với timezone offset
    let groupExpression: any;

    if (finalGroupBy === 'hour') {
      groupExpression = {
        year: { $year: { $add: [`$${dateField}`, timezoneOffset] } },
        month: { $month: { $add: [`$${dateField}`, timezoneOffset] } },
        day: { $dayOfMonth: { $add: [`$${dateField}`, timezoneOffset] } },
        hour: { $hour: { $add: [`$${dateField}`, timezoneOffset] } },
      };
    } else {
      groupExpression = {
        year: { $year: { $add: [`$${dateField}`, timezoneOffset] } },
        month: { $month: { $add: [`$${dateField}`, timezoneOffset] } },
        day: { $dayOfMonth: { $add: [`$${dateField}`, timezoneOffset] } },
      };
    }

    // Xác định cách tính count: sum field hoặc count records
    const countExpression = sumField ? { $sum: { $toInt: `$${sumField}` } } : { $sum: 1 };

    const aggregateResult = await model
      .aggregate([
        { $match: matchFilter },
        {
          $group: {
            _id: groupExpression,
            count: countExpression,
          },
        },
        { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1, '_id.hour': 1, '_id.week': 1 } },
      ])
      .exec();

    // Tạo map để dễ lookup
    const dataMap = new Map<string, number>();
    aggregateResult.forEach((item) => {
      let key: string;
      if (finalGroupBy === 'hour') {
        key = `${item._id.year}-${item._id.month}-${item._id.day}-${item._id.hour}`;
      } else {
        key = `${item._id.year}-${item._id.month}-${item._id.day}`;
      }
      dataMap.set(key, item.count);
    });

    // Fill missing dates – iterate theo local time để key khớp với MongoDB aggregation (vốn dùng timezoneOffset)
    const labels: string[] = [];
    const data: number[] = [];
    const localStart = new Date(startDate.getTime() + timezoneOffset);
    const localEnd = new Date(endDate.getTime() + timezoneOffset);
    const currentDate = new Date(localStart);

    while (currentDate <= localEnd) {
      let label: string;
      let key: string;

      if (finalGroupBy === 'hour') {
        const hour = currentDate.getUTCHours();
        label = `${hour.toString().padStart(2, '0')}:00`;
        key = `${currentDate.getUTCFullYear()}-${currentDate.getUTCMonth() + 1}-${currentDate.getUTCDate()}-${hour}`;
        currentDate.setUTCHours(currentDate.getUTCHours() + 1);
      } else {
        label = `${currentDate.getUTCDate().toString().padStart(2, '0')}/${(currentDate.getUTCMonth() + 1)
          .toString()
          .padStart(2, '0')}`;
        key = `${currentDate.getUTCFullYear()}-${currentDate.getUTCMonth() + 1}-${currentDate.getUTCDate()}`;
        currentDate.setUTCDate(currentDate.getUTCDate() + 1);
      }

      labels.push(label);
      data.push(dataMap.get(key) || 0);
    }

    const total = data.reduce((sum, val) => sum + val, 0);
    const average = data.length > 0 ? Math.round(total / data.length) : 0;

    return { labels, data, total, average };
  }

  /**
   * Group data by date period với timezone offset
   */
  groupDataByDate(
    data: any[],
    startDate: Date,
    endDate: Date,
    groupBy: 'hour' | 'day' | 'week' | 'month',
    timezoneOffset: number,
    dateField: string = 'createdAt',
  ) {
    const groups = new Map<string, any[]>();

    // Tạo tất cả các labels từ startDate đến endDate – iterate theo local time
    const localStart = new Date(startDate.getTime() + timezoneOffset);
    const localEnd = new Date(endDate.getTime() + timezoneOffset);
    const currentDate = new Date(localStart);
    const labels: string[] = [];

    while (currentDate <= localEnd) {
      let label: string;
      let key: string;

      if (groupBy === 'hour') {
        const hour = currentDate.getUTCHours();
        label = `${currentDate.getUTCDate().toString().padStart(2, '0')}/${(currentDate.getUTCMonth() + 1)
          .toString()
          .padStart(2, '0')} ${hour.toString().padStart(2, '0')}:00`;
        key = `${currentDate.getUTCFullYear()}-${currentDate.getUTCMonth() + 1}-${currentDate.getUTCDate()}-${hour}`;
        currentDate.setUTCHours(currentDate.getUTCHours() + 1);
      } else if (groupBy === 'day') {
        label = `${currentDate.getUTCDate().toString().padStart(2, '0')}/${(currentDate.getUTCMonth() + 1)
          .toString()
          .padStart(2, '0')}`;
        key = `${currentDate.getUTCFullYear()}-${currentDate.getUTCMonth() + 1}-${currentDate.getUTCDate()}`;
        currentDate.setUTCDate(currentDate.getUTCDate() + 1);
      } else if (groupBy === 'week') {
        const weekNum = this.dateHelper.getWeekNumber(currentDate);
        label = `Tuần ${weekNum}`;
        key = `${currentDate.getUTCFullYear()}-W${weekNum}`;
        currentDate.setUTCDate(currentDate.getUTCDate() + 7);
      } else {
        label = `${(currentDate.getUTCMonth() + 1).toString().padStart(2, '0')}/${currentDate.getUTCFullYear()}`;
        key = `${currentDate.getUTCFullYear()}-${currentDate.getUTCMonth() + 1}`;
        currentDate.setUTCMonth(currentDate.getUTCMonth() + 1);
      }

      labels.push(label);
      groups.set(key, []);
    }

    // Phân loại data vào các group
    data.forEach((item) => {
      const utcDate = new Date(item[dateField]);
      const itemDate = new Date(utcDate.getTime() + timezoneOffset);
      let key: string;

      if (groupBy === 'hour') {
        key = `${itemDate.getUTCFullYear()}-${itemDate.getUTCMonth() + 1}-${itemDate.getUTCDate()}-${itemDate.getUTCHours()}`;
      } else if (groupBy === 'day') {
        key = `${itemDate.getUTCFullYear()}-${itemDate.getUTCMonth() + 1}-${itemDate.getUTCDate()}`;
      } else if (groupBy === 'week') {
        const weekNum = this.dateHelper.getWeekNumber(itemDate);
        key = `${itemDate.getUTCFullYear()}-W${weekNum}`;
      } else {
        key = `${itemDate.getUTCFullYear()}-${itemDate.getUTCMonth() + 1}`;
      }

      if (groups.has(key)) {
        groups.get(key)!.push(item);
      }
    });

    // Convert map to array
    return Array.from(groups.entries()).map(([key, items], index) => ({
      label: labels[index] || key,
      date: key,
      count: items.length,
      data: items,
    }));
  }
}
