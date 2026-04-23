"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportComparisonHelperService = void 0;
const common_1 = require("@nestjs/common");
let ReportComparisonHelperService = class ReportComparisonHelperService {
    calculateComparisonDates(startDate, endDate, compareStartDate, compareEndDate, timezoneOffset = 7 * 60 * 60 * 1000) {
        if (compareStartDate && compareEndDate) {
            const formatDate = (date) => {
                const local = new Date(date.getTime() + timezoneOffset);
                const day = local.getUTCDate().toString().padStart(2, '0');
                const month = (local.getUTCMonth() + 1).toString().padStart(2, '0');
                const year = local.getUTCFullYear();
                return `${day}/${month}/${year}`;
            };
            const msPerDay = 1000 * 60 * 60 * 24;
            const compareDurationMs = compareEndDate.getTime() - compareStartDate.getTime();
            const compareDurationDays = Math.ceil(compareDurationMs / msPerDay);
            const offsetFromEndMs = startDate.getTime() - compareEndDate.getTime();
            const offsetFromEndDays = offsetFromEndMs / msPerDay;
            const compareStartFormatted = formatDate(compareStartDate);
            const compareEndFormatted = formatDate(compareEndDate);
            const isSameDay = compareStartFormatted === compareEndFormatted;
            const isConsecutive = offsetFromEndMs >= 0 && offsetFromEndDays <= 1;
            const isYesterday = isSameDay && isConsecutive;
            const localCompareStart = new Date(compareStartDate.getTime() + timezoneOffset);
            const localCompareEnd = new Date(compareEndDate.getTime() + timezoneOffset);
            const compareStartDay = localCompareStart.getUTCDate();
            const compareEndDay = localCompareEnd.getUTCDate();
            const compareMonth = localCompareEnd.getUTCMonth();
            const compareYear = localCompareEnd.getUTCFullYear();
            const lastDayOfMonth = new Date(Date.UTC(compareYear, compareMonth + 1, 0)).getUTCDate();
            const isFullMonth = compareStartDay === 1 &&
                compareEndDay === lastDayOfMonth &&
                compareDurationDays >= 28 &&
                compareDurationDays <= 31;
            let compareText = '';
            if (isYesterday) {
                compareText = 'so với ngày hôm qua';
            }
            else if (!isYesterday && isConsecutive && (compareDurationDays === 7 || compareDurationDays === 8)) {
                compareText = 'so với 7 ngày trước';
            }
            else if (!isYesterday && isConsecutive && isFullMonth) {
                compareText = 'so với 30 ngày trước';
            }
            else if (isSameDay) {
                compareText = `so với ngày ${compareStartFormatted}`;
            }
            else {
                compareText = `so với ${compareStartFormatted} - ${compareEndFormatted}`;
            }
            return {
                calculatedCompareStartDate: compareStartDate,
                calculatedCompareEndDate: compareEndDate,
                compareText,
            };
        }
        return {
            calculatedCompareStartDate: startDate,
            calculatedCompareEndDate: endDate,
            compareText: '',
        };
    }
    calculatePercentageChange(currentValue, compareValue, compareText) {
        let percentage = 0;
        let changeType = 'neutral';
        if (compareValue > 0) {
            percentage = Number((((currentValue - compareValue) / compareValue) * 100).toFixed(1));
            if (percentage > 0) {
                changeType = 'increase';
            }
            else if (percentage < 0) {
                changeType = 'decrease';
            }
        }
        else if (currentValue > 0) {
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
};
exports.ReportComparisonHelperService = ReportComparisonHelperService;
exports.ReportComparisonHelperService = ReportComparisonHelperService = __decorate([
    (0, common_1.Injectable)()
], ReportComparisonHelperService);
//# sourceMappingURL=report-comparison-helper.service.js.map