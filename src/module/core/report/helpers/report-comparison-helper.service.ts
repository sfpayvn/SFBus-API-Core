import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportComparisonHelperService {
  /**
   * Tính toán khoảng thời gian so sánh tự động
   * @param startDate - Ngày bắt đầu khoảng hiện tại
   * @param endDate - Ngày kết thúc khoảng hiện tại
   * @param compareStartDate - Ngày bắt đầu khoảng so sánh (optional)
   * @param compareEndDate - Ngày kết thúc khoảng so sánh (optional)
   * @returns Object chứa calculatedCompareStartDate, calculatedCompareEndDate, compareText
   */
  calculateComparisonDates(
    startDate: Date,
    endDate: Date,
    compareStartDate?: Date,
    compareEndDate?: Date,
  ): {
    calculatedCompareStartDate: Date;
    calculatedCompareEndDate: Date;
    compareText: string;
  } {
    if (compareStartDate && compareEndDate) {
      const formatDate = (date: Date): string => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };

      const msPerDay = 1000 * 60 * 60 * 24;
      const compareDurationMs = compareEndDate.getTime() - compareStartDate.getTime();
      const compareDurationDays = Math.ceil(compareDurationMs / msPerDay);

      // Tính khoảng cách giữa khoảng so sánh và khoảng hiện tại
      const offsetFromEndMs = startDate.getTime() - compareEndDate.getTime();
      const offsetFromEndDays = offsetFromEndMs / msPerDay;

      // Kiểm tra xem compareStartDate và compareEndDate có format thành cùng ngày không
      const compareStartFormatted = formatDate(compareStartDate);
      const compareEndFormatted = formatDate(compareEndDate);
      const isSameDay = compareStartFormatted === compareEndFormatted;

      // Kiểm tra nếu comparison period kết thúc ngay trước current period
      const isConsecutive = offsetFromEndMs >= 0 && offsetFromEndDays <= 1;

      // Kiểm tra nếu là ngày hôm qua
      const isYesterday = isSameDay && isConsecutive;

      // Kiểm tra nếu là 30 ngày trước (cả tháng)
      const compareStartDay = compareStartDate.getDate();
      const compareEndDay = compareEndDate.getDate();
      const compareMonth = compareEndDate.getMonth();
      const compareYear = compareEndDate.getFullYear();
      const lastDayOfMonth = new Date(compareYear, compareMonth + 1, 0).getDate();
      const isFullMonth =
        compareStartDay === 1 &&
        compareEndDay === lastDayOfMonth &&
        compareDurationDays >= 28 &&
        compareDurationDays <= 31;

      let compareText = '';
      if (isYesterday) {
        compareText = 'so với ngày hôm qua';
      } else if (!isYesterday && isConsecutive && (compareDurationDays === 7 || compareDurationDays === 8)) {
        compareText = 'so với 7 ngày trước';
      } else if (!isYesterday && isConsecutive && isFullMonth) {
        compareText = 'so với 30 ngày trước';
      } else if (isSameDay) {
        compareText = `so với ngày ${compareStartFormatted}`;
      } else {
        compareText = `so với ${compareStartFormatted} - ${compareEndFormatted}`;
      }

      return {
        calculatedCompareStartDate: compareStartDate,
        calculatedCompareEndDate: compareEndDate,
        compareText,
      };
    }

    // Trường hợp không có compareStartDate và compareEndDate
    return {
      calculatedCompareStartDate: startDate,
      calculatedCompareEndDate: endDate,
      compareText: '',
    };
  }

  /**
   * Tính phần trăm thay đổi và xác định changeType
   * @param currentValue - Giá trị hiện tại
   * @param compareValue - Giá trị so sánh
   * @param compareText - Text mô tả khoảng so sánh
   * @returns Object chứa change, changeType, percentage
   */
  calculatePercentageChange(
    currentValue: number,
    compareValue: number,
    compareText: string,
  ): {
    change: string;
    changeType: 'increase' | 'decrease' | 'neutral';
    percentage: number;
  } {
    let percentage = 0;
    let changeType: 'increase' | 'decrease' | 'neutral' = 'neutral';

    if (compareValue > 0) {
      percentage = Number((((currentValue - compareValue) / compareValue) * 100).toFixed(1));
      if (percentage > 0) {
        changeType = 'increase';
      } else if (percentage < 0) {
        changeType = 'decrease';
      }
    } else if (currentValue > 0) {
      percentage = 100;
      changeType = 'increase';
    }

    const changeSign = percentage > 0 ? '+' : '';
    const change = `${changeSign}${percentage}% ${compareText}`;

    return {
      change,
      changeType,
      percentage: Math.abs(percentage),
    };
  }
}
