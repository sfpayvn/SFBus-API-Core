import { Injectable } from '@nestjs/common';
import { GroupedDetailItem, GroupedDetailResponseDto } from '../dto/report-details.dto';

@Injectable()
export class ReportDateHelperService {
  /**
   * Generic helper method to group any data by date
   */
  groupDataByDate(
    allData: any[],
    startDate: Date,
    endDate: Date,
    groupBy: 'hour' | 'day' | 'week' | 'month',
    dateField: string,
  ): GroupedDetailResponseDto<any> {
    const groupsMap = new Map<string, any[]>();
    const labelFormat = this.getDateLabelFormat(groupBy);

    allData.forEach((item: any) => {
      const dateValue = item[dateField];
      const date = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
      const label = labelFormat(date);

      if (!groupsMap.has(label)) {
        groupsMap.set(label, []);
      }
      groupsMap.get(label)!.push(item);
    });

    // Convert map to array of groups
    const groups: GroupedDetailItem<any>[] = [];
    const current = new Date(startDate);

    while (current <= endDate) {
      const label = labelFormat(current);
      const data = groupsMap.get(label) || [];

      groups.push({
        label,
        date: current.toISOString(),
        count: data.length,
        data,
      });

      // Increment date based on groupBy
      this.incrementDate(current, groupBy);
    }

    return {
      groups,
      total: allData.length,
      metadata: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        groupBy,
      },
    };
  }

  /**
   * Helper method to get date label format function
   */
  getDateLabelFormat(groupBy: 'hour' | 'day' | 'week' | 'month'): (date: Date) => string {
    switch (groupBy) {
      case 'hour':
        return (date: Date) => {
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const hours = date.getHours().toString().padStart(2, '0');
          return `${day}/${month} ${hours}:00`;
        };
      case 'day':
        return (date: Date) => {
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          return `${day}/${month}`;
        };
      case 'week':
        return (date: Date) => {
          const weekNum = this.getWeekNumber(date);
          return `Tuần ${weekNum}`;
        };
      case 'month':
        return (date: Date) => {
          const month = date.getMonth() + 1;
          return `Tháng ${month}`;
        };
    }
  }

  /**
   * Helper method to increment date based on groupBy
   */
  incrementDate(date: Date, groupBy: 'hour' | 'day' | 'week' | 'month'): void {
    switch (groupBy) {
      case 'hour':
        date.setHours(date.getHours() + 1);
        break;
      case 'day':
        date.setDate(date.getDate() + 1);
        break;
      case 'week':
        date.setDate(date.getDate() + 7);
        break;
      case 'month':
        date.setMonth(date.getMonth() + 1);
        break;
    }
  }

  /**
   * Lấy số tuần trong năm
   */
  getWeekNumber(date: Date): number {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  }
}
