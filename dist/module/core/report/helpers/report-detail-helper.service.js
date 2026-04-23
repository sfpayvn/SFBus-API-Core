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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportDetailHelperService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const booking_schema_1 = require("../../booking/schema/booking.schema");
const bus_schedule_schema_1 = require("../../bus/bus-schedule/schema/bus-schedule.schema");
const goods_schema_1 = require("../../goods/goods/schema/goods.schema");
const payment_schema_1 = require("../../payment/schema/payment.schema");
const report_date_helper_service_1 = require("./report-date-helper.service");
let ReportDetailHelperService = class ReportDetailHelperService {
    constructor(bookingModel, busScheduleModel, goodsModel, paymentModel, dateHelper) {
        this.bookingModel = bookingModel;
        this.busScheduleModel = busScheduleModel;
        this.goodsModel = goodsModel;
        this.paymentModel = paymentModel;
        this.dateHelper = dateHelper;
    }
    async getGroupedBookingDetails(filter, startDate, endDate, groupBy) {
        const allBookings = await this.bookingModel.find(filter).sort({ createdAt: 1 }).lean().exec();
        return this.dateHelper.groupDataByDate(allBookings, startDate, endDate, groupBy, 'createdAt');
    }
    buildDetailFilter(tenantId, startDate, endDate, dateField, additionalFilters) {
        const filter = {
            tenantId,
        };
        if (dateField === 'createdAt') {
            filter.createdAt = {
                $gte: startDate,
                $lte: endDate,
            };
        }
        else {
            filter.startDate = {
                $gte: startDate.toISOString().split('T')[0],
                $lte: endDate.toISOString().split('T')[0],
            };
        }
        if (additionalFilters) {
            Object.assign(filter, additionalFilters);
        }
        return filter;
    }
    async getPaginatedData(model, filter, pageIdx, pageSize, sortField = 'createdAt') {
        const total = await model.countDocuments(filter).exec();
        const data = await model
            .find(filter)
            .sort({ [sortField]: -1 })
            .skip(pageIdx * pageSize)
            .limit(pageSize)
            .lean()
            .exec();
        const totalPages = Math.ceil(total / pageSize);
        return {
            data,
            total,
            pageIdx,
            pageSize,
            totalPages,
            metadata: {
                startDate: filter.createdAt?.$gte?.toISOString() || filter.startDate?.$gte,
                endDate: filter.createdAt?.$lte?.toISOString() || filter.startDate?.$lte,
            },
        };
    }
};
exports.ReportDetailHelperService = ReportDetailHelperService;
exports.ReportDetailHelperService = ReportDetailHelperService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(booking_schema_1.BookingDocument.name)),
    __param(1, (0, mongoose_1.InjectModel)(bus_schedule_schema_1.BusScheduleDocument.name)),
    __param(2, (0, mongoose_1.InjectModel)(goods_schema_1.GoodsDocument.name)),
    __param(3, (0, mongoose_1.InjectModel)(payment_schema_1.PaymentDocument.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        report_date_helper_service_1.ReportDateHelperService])
], ReportDetailHelperService);
//# sourceMappingURL=report-detail-helper.service.js.map