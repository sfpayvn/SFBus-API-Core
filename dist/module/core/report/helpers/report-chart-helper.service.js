"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportChartHelperService = void 0;
const common_1 = require("@nestjs/common");
const report_date_helper_service_1 = require("./report-date-helper.service");
let ReportChartHelperService = class ReportChartHelperService {
    constructor(dateHelper) {
        this.dateHelper = dateHelper;
    }
    async getChartData(model, matchFilter, startDate, endDate, finalGroupBy, timezoneOffset, dateField = 'createdAt', sumField) {
        let groupExpression;
        if (finalGroupBy === 'hour') {
            groupExpression = {
                year: { $year: { $add: [`$${dateField}`, timezoneOffset] } },
                month: { $month: { $add: [`$${dateField}`, timezoneOffset] } },
                day: { $dayOfMonth: { $add: [`$${dateField}`, timezoneOffset] } },
                hour: { $hour: { $add: [`$${dateField}`, timezoneOffset] } },
            };
        }
        else {
            groupExpression = {
                year: { $year: { $add: [`$${dateField}`, timezoneOffset] } },
                month: { $month: { $add: [`$${dateField}`, timezoneOffset] } },
                day: { $dayOfMonth: { $add: [`$${dateField}`, timezoneOffset] } },
            };
        }
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
        const dataMap = new Map();
        aggregateResult.forEach((item) => {
            let key;
            if (finalGroupBy === 'hour') {
                key = `${item._id.year}-${item._id.month}-${item._id.day}-${item._id.hour}`;
            }
            else {
                key = `${item._id.year}-${item._id.month}-${item._id.day}`;
            }
            dataMap.set(key, item.count);
        });
        const labels = [];
        const data = [];
        const localStart = new Date(startDate.getTime() + timezoneOffset);
        const localEnd = new Date(endDate.getTime() + timezoneOffset);
        const currentDate = new Date(localStart);
        while (currentDate <= localEnd) {
            let label;
            let key;
            if (finalGroupBy === 'hour') {
                const hour = currentDate.getUTCHours();
                label = `${hour.toString().padStart(2, '0')}:00`;
                key = `${currentDate.getUTCFullYear()}-${currentDate.getUTCMonth() + 1}-${currentDate.getUTCDate()}-${hour}`;
                currentDate.setUTCHours(currentDate.getUTCHours() + 1);
            }
            else {
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
    groupDataByDate(data, startDate, endDate, groupBy, timezoneOffset, dateField = 'createdAt') {
        const groups = new Map();
        const localStart = new Date(startDate.getTime() + timezoneOffset);
        const localEnd = new Date(endDate.getTime() + timezoneOffset);
        const currentDate = new Date(localStart);
        const labels = [];
        while (currentDate <= localEnd) {
            let label;
            let key;
            if (groupBy === 'hour') {
                const hour = currentDate.getUTCHours();
                label = `${currentDate.getUTCDate().toString().padStart(2, '0')}/${(currentDate.getUTCMonth() + 1)
                    .toString()
                    .padStart(2, '0')} ${hour.toString().padStart(2, '0')}:00`;
                key = `${currentDate.getUTCFullYear()}-${currentDate.getUTCMonth() + 1}-${currentDate.getUTCDate()}-${hour}`;
                currentDate.setUTCHours(currentDate.getUTCHours() + 1);
            }
            else if (groupBy === 'day') {
                label = `${currentDate.getUTCDate().toString().padStart(2, '0')}/${(currentDate.getUTCMonth() + 1)
                    .toString()
                    .padStart(2, '0')}`;
                key = `${currentDate.getUTCFullYear()}-${currentDate.getUTCMonth() + 1}-${currentDate.getUTCDate()}`;
                currentDate.setUTCDate(currentDate.getUTCDate() + 1);
            }
            else if (groupBy === 'week') {
                const weekNum = this.dateHelper.getWeekNumber(currentDate);
                label = `Tuần ${weekNum}`;
                key = `${currentDate.getUTCFullYear()}-W${weekNum}`;
                currentDate.setUTCDate(currentDate.getUTCDate() + 7);
            }
            else {
                label = `${(currentDate.getUTCMonth() + 1).toString().padStart(2, '0')}/${currentDate.getUTCFullYear()}`;
                key = `${currentDate.getUTCFullYear()}-${currentDate.getUTCMonth() + 1}`;
                currentDate.setUTCMonth(currentDate.getUTCMonth() + 1);
            }
            labels.push(label);
            groups.set(key, []);
        }
        data.forEach((item) => {
            const utcDate = new Date(item[dateField]);
            const itemDate = new Date(utcDate.getTime() + timezoneOffset);
            let key;
            if (groupBy === 'hour') {
                key = `${itemDate.getUTCFullYear()}-${itemDate.getUTCMonth() + 1}-${itemDate.getUTCDate()}-${itemDate.getUTCHours()}`;
            }
            else if (groupBy === 'day') {
                key = `${itemDate.getUTCFullYear()}-${itemDate.getUTCMonth() + 1}-${itemDate.getUTCDate()}`;
            }
            else if (groupBy === 'week') {
                const weekNum = this.dateHelper.getWeekNumber(itemDate);
                key = `${itemDate.getUTCFullYear()}-W${weekNum}`;
            }
            else {
                key = `${itemDate.getUTCFullYear()}-${itemDate.getUTCMonth() + 1}`;
            }
            if (groups.has(key)) {
                groups.get(key).push(item);
            }
        });
        return Array.from(groups.entries()).map(([key, items], index) => ({
            label: labels[index] || key,
            date: key,
            count: items.length,
            data: items,
        }));
    }
};
exports.ReportChartHelperService = ReportChartHelperService;
exports.ReportChartHelperService = ReportChartHelperService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [report_date_helper_service_1.ReportDateHelperService])
], ReportChartHelperService);
//# sourceMappingURL=report-chart-helper.service.js.map