"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportDateHelperService = void 0;
const common_1 = require("@nestjs/common");
let ReportDateHelperService = class ReportDateHelperService {
    groupDataByDate(allData, startDate, endDate, groupBy, dateField) {
        const groupsMap = new Map();
        const labelFormat = this.getDateLabelFormat(groupBy);
        allData.forEach((item) => {
            const dateValue = item[dateField];
            const date = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
            const label = labelFormat(date);
            if (!groupsMap.has(label)) {
                groupsMap.set(label, []);
            }
            groupsMap.get(label).push(item);
        });
        const groups = [];
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
    getDateLabelFormat(groupBy) {
        switch (groupBy) {
            case 'hour':
                return (date) => {
                    const day = date.getDate().toString().padStart(2, '0');
                    const month = (date.getMonth() + 1).toString().padStart(2, '0');
                    const hours = date.getHours().toString().padStart(2, '0');
                    return `${day}/${month} ${hours}:00`;
                };
            case 'day':
                return (date) => {
                    const day = date.getDate().toString().padStart(2, '0');
                    const month = (date.getMonth() + 1).toString().padStart(2, '0');
                    return `${day}/${month}`;
                };
            case 'week':
                return (date) => {
                    const weekNum = this.getWeekNumber(date);
                    return `Tuần ${weekNum}`;
                };
            case 'month':
                return (date) => {
                    const month = date.getMonth() + 1;
                    return `Tháng ${month}`;
                };
        }
    }
    incrementDate(date, groupBy) {
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
    getWeekNumber(date) {
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
    }
};
exports.ReportDateHelperService = ReportDateHelperService;
exports.ReportDateHelperService = ReportDateHelperService = __decorate([
    (0, common_1.Injectable)()
], ReportDateHelperService);
//# sourceMappingURL=report-date-helper.service.js.map