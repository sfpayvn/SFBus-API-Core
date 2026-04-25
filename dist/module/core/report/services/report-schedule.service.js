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
exports.ReportScheduleService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const tracking_types_1 = require("../../tracking/constants/tracking-types");
const tracking_schema_1 = require("../../tracking/schema/tracking.schema");
const bus_schedule_schema_1 = require("../../bus/bus-schedule/schema/bus-schedule.schema");
const booking_schema_1 = require("../../booking/schema/booking.schema");
const goods_schema_1 = require("../../goods/goods/schema/goods.schema");
const payment_schema_1 = require("../../payment/schema/payment.schema");
const report_comparison_helper_service_1 = require("../helpers/report-comparison-helper.service");
const report_date_helper_service_1 = require("../helpers/report-date-helper.service");
const report_chart_helper_service_1 = require("../helpers/report-chart-helper.service");
const bus_route_schema_1 = require("../../bus/bus-route/schema/bus-route.schema");
const utils_1 = require("../../../../utils/utils");
const status_constants_1 = require("../../../../common/constants/status.constants");
const bus_schedule_layout_schema_1 = require("../../bus/bus-schedule-layout/schema/bus-schedule-layout.schema");
let ReportScheduleService = class ReportScheduleService {
    constructor(trackingModel, busScheduleModel, busRouteModel, bookingModel, goodsModel, paymentModel, comparisonHelper, dateHelper, chartHelper, busScheduleLayoutModel) {
        this.trackingModel = trackingModel;
        this.busScheduleModel = busScheduleModel;
        this.busRouteModel = busRouteModel;
        this.bookingModel = bookingModel;
        this.goodsModel = goodsModel;
        this.paymentModel = paymentModel;
        this.comparisonHelper = comparisonHelper;
        this.dateHelper = dateHelper;
        this.chartHelper = chartHelper;
        this.busScheduleLayoutModel = busScheduleLayoutModel;
        this.ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';
    }
    async getScheduleStats(query, tenantId, timezoneOffset) {
        const { startDate, endDate, comparisonStartDate, comparisonEndDate, platform, userId, comparisonMode } = query;
        const comparisonDates = this.comparisonHelper.calculateComparisonDates(startDate, endDate, comparisonStartDate, comparisonEndDate, timezoneOffset);
        const currentFilter = {
            tenantId,
            type: tracking_types_1.TRACKING_TYPES.SCHEDULE_IN_PROGRESS,
            createdAt: { $gte: startDate, $lte: endDate },
        };
        if (platform)
            currentFilter.platform = platform;
        if (userId)
            currentFilter.createdBy = new mongoose_2.Types.ObjectId(userId);
        const compareFilter = {
            tenantId,
            type: tracking_types_1.TRACKING_TYPES.SCHEDULE_IN_PROGRESS,
            createdAt: {
                $gte: comparisonDates.calculatedCompareStartDate,
                $lte: comparisonDates.calculatedCompareEndDate,
            },
        };
        if (platform)
            compareFilter.platform = platform;
        if (userId)
            compareFilter.createdBy = new mongoose_2.Types.ObjectId(userId);
        const currentCount = await this.trackingModel.countDocuments(currentFilter).exec();
        const compareCount = await this.trackingModel.countDocuments(compareFilter).exec();
        if (!comparisonMode) {
            return { value: currentCount, total: currentCount };
        }
        const comparisonResult = this.comparisonHelper.calculatePercentageChange(currentCount, compareCount, comparisonDates.compareText);
        return {
            value: currentCount,
            total: currentCount,
            change: comparisonResult.change,
            changeType: comparisonResult.changeType,
            percentage: comparisonResult.percentage,
        };
    }
    async getScheduleChartStats(query, tenantId, timezoneOffset) {
        const { startDate, endDate, comparisonMode, platform, userId, comparisonStartDate: customComparisonStartDate, comparisonEndDate: customComparisonEndDate, } = query;
        const _localStart = new Date(startDate.getTime() + timezoneOffset);
        const _localEnd = new Date(endDate.getTime() + timezoneOffset);
        const isSameDay = _localStart.getUTCFullYear() === _localEnd.getUTCFullYear() &&
            _localStart.getUTCMonth() === _localEnd.getUTCMonth() &&
            _localStart.getUTCDate() === _localEnd.getUTCDate();
        const finalGroupBy = isSameDay ? 'hour' : 'day';
        let comparisonStartDate;
        let comparisonEndDate;
        if (comparisonMode) {
            if (customComparisonStartDate && customComparisonEndDate) {
                comparisonStartDate = new Date(customComparisonStartDate);
                comparisonEndDate = new Date(customComparisonEndDate);
            }
            else {
                comparisonEndDate = new Date(startDate.getTime() - 1);
                comparisonStartDate = new Date(comparisonEndDate.getTime() - (endDate.getTime() - startDate.getTime()));
            }
        }
        const currentFilter = {
            tenantId,
            type: tracking_types_1.TRACKING_TYPES.SCHEDULE_IN_PROGRESS,
            createdAt: { $gte: startDate, $lte: endDate },
        };
        if (platform)
            currentFilter.platform = platform;
        if (userId)
            currentFilter.createdBy = new mongoose_2.Types.ObjectId(userId);
        const currentData = await this.chartHelper.getChartData(this.trackingModel, currentFilter, startDate, endDate, finalGroupBy, timezoneOffset);
        let previousData = undefined;
        if (comparisonMode && comparisonStartDate && comparisonEndDate) {
            const compareFilter = {
                tenantId,
                type: tracking_types_1.TRACKING_TYPES.SCHEDULE_IN_PROGRESS,
                createdAt: { $gte: comparisonStartDate, $lte: comparisonEndDate },
            };
            if (platform)
                compareFilter.platform = platform;
            if (userId)
                compareFilter.createdBy = new mongoose_2.Types.ObjectId(userId);
            previousData = await this.chartHelper.getChartData(this.trackingModel, compareFilter, comparisonStartDate, comparisonEndDate, finalGroupBy, timezoneOffset);
        }
        return {
            current: currentData,
            previous: previousData,
            metadata: {
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                comparisonStartDate: comparisonStartDate?.toISOString(),
                comparisonEndDate: comparisonEndDate?.toISOString(),
                groupBy: finalGroupBy,
            },
        };
    }
    async getScheduleDetailsByDate(query, tenantId, timezoneOffset) {
        const { startDate, endDate, pageIdx = 0, pageSize = 20, platform, userId, busRouteId, comparisonMode, comparisonStartDate, comparisonEndDate, } = query;
        const filter = {
            tenantId,
            startDate: {
                $gte: startDate.toISOString().split('T')[0],
                $lte: endDate.toISOString().split('T')[0],
            },
        };
        if (platform)
            filter.platform = platform;
        if (userId)
            filter.createdBy = new mongoose_2.Types.ObjectId(userId);
        if (busRouteId)
            filter.busRouteId = new mongoose_2.Types.ObjectId(busRouteId);
        const _localStart = new Date(startDate.getTime() + timezoneOffset);
        const _localEnd = new Date(endDate.getTime() + timezoneOffset);
        const isSameDay = _localStart.getUTCFullYear() === _localEnd.getUTCFullYear() &&
            _localStart.getUTCMonth() === _localEnd.getUTCMonth() &&
            _localStart.getUTCDate() === _localEnd.getUTCDate();
        const groupBy = isSameDay ? 'hour' : 'day';
        const totalCount = await this.busScheduleModel.countDocuments(filter).exec();
        const skip = pageIdx * pageSize;
        const allSchedules = await this.busScheduleModel
            .find(filter)
            .populate('busRoute')
            .populate('bus')
            .populate('driver')
            .sort({ startDate: 1, departureTime: 1 })
            .skip(skip)
            .limit(pageSize)
            .lean()
            .exec();
        const groups = this.chartHelper.groupDataByDate(allSchedules, startDate, endDate, groupBy, timezoneOffset, 'startDate');
        let comparisonGroups = undefined;
        let comparisonTotal = undefined;
        if (comparisonMode && comparisonStartDate && comparisonEndDate) {
            const compareFilter = {
                ...filter,
                startDate: {
                    $gte: comparisonStartDate.toISOString().split('T')[0],
                    $lte: comparisonEndDate.toISOString().split('T')[0],
                },
            };
            comparisonTotal = await this.busScheduleModel.countDocuments(compareFilter).exec();
            const compareSchedules = await this.busScheduleModel
                .find(compareFilter)
                .populate('busRoute')
                .populate('bus')
                .populate('driver')
                .sort({ startDate: 1, departureTime: 1 })
                .skip(skip)
                .limit(pageSize)
                .lean()
                .exec();
            comparisonGroups = this.chartHelper.groupDataByDate(compareSchedules, comparisonStartDate, comparisonEndDate, groupBy, timezoneOffset, 'startDate');
        }
        return {
            groups,
            total: totalCount,
            pageIdx,
            pageSize,
            totalPage: Math.ceil(totalCount / pageSize),
            comparisonGroups,
            comparisonTotal,
            metadata: {
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                groupBy,
                comparisonStartDate: comparisonStartDate?.toISOString(),
                comparisonEndDate: comparisonEndDate?.toISOString(),
            },
        };
    }
    async getTopRoutesReport(query, tenantId, paymentType, timezoneOffset) {
        const { startDate, endDate, platform, userId } = query;
        const matchFilter = {
            tenantId,
            type: tracking_types_1.TRACKING_TYPES.BOOKING_CREATED,
            createdAt: { $gte: startDate, $lte: endDate },
        };
        if (platform)
            matchFilter.platform = platform;
        if (userId)
            matchFilter.createdBy = new mongoose_2.Types.ObjectId(userId);
        const aggregateResult = await this.trackingModel
            .aggregate([
            { $match: matchFilter },
            { $group: { _id: '$metadata.busRouteId', ticketCount: { $sum: { $toInt: '$metadata.totalTickets' } } } },
            { $sort: { ticketCount: -1 } },
            { $limit: 10 },
        ])
            .exec();
        const totalTicketsResult = await this.trackingModel
            .aggregate([
            { $match: matchFilter },
            { $group: { _id: null, total: { $sum: { $toInt: '$metadata.totalTickets' } } } },
        ])
            .exec();
        const totalTickets = totalTicketsResult.length > 0 ? totalTicketsResult[0].total : 0;
        const paymentFilter = {
            tenantId,
            type: paymentType,
            createdAt: { $gte: startDate, $lte: endDate },
        };
        if (platform)
            paymentFilter.platform = platform;
        if (userId)
            paymentFilter.createdBy = new mongoose_2.Types.ObjectId(userId);
        const revenueByRoute = await this.trackingModel
            .aggregate([
            { $match: paymentFilter },
            {
                $lookup: {
                    from: 'trackings',
                    let: { bookingId: '$metadata.bookingId' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$type', tracking_types_1.TRACKING_TYPES.BOOKING_CREATED] },
                                        { $eq: ['$metadata.bookingId', '$$bookingId'] },
                                    ],
                                },
                            },
                        },
                    ],
                    as: 'bookingTracking',
                },
            },
            { $unwind: { path: '$bookingTracking', preserveNullAndEmptyArrays: false } },
            {
                $group: {
                    _id: '$bookingTracking.metadata.busRouteId',
                    revenue: { $sum: { $toDouble: '$metadata.chargedAmount' } },
                },
            },
        ])
            .exec();
        const revenueMap = new Map();
        let totalRevenue = 0;
        revenueByRoute.forEach((item) => {
            if (item._id) {
                revenueMap.set(item._id.toString(), item.revenue);
                totalRevenue += item.revenue;
            }
        });
        const data = await Promise.all(aggregateResult.map(async (item) => {
            let routeName = 'Không xác định';
            const routeId = item._id ? item._id.toString() : '';
            if (item._id) {
                try {
                    const rootTenantObjectId = (0, utils_1.toObjectId)(this.ROOT_TENANT_ID);
                    const route = await this.busRouteModel.findOne({
                        _id: item._id,
                        tenantId: { $in: [tenantId, rootTenantObjectId] },
                    });
                    if (route) {
                        routeName = route.name;
                    }
                }
                catch (error) {
                }
            }
            const percentage = totalTickets > 0 ? Number(((item.ticketCount / totalTickets) * 100).toFixed(1)) : 0;
            const revenue = revenueMap.get(routeId) || 0;
            return {
                routeId,
                routeName,
                ticketCount: item.ticketCount,
                percentage,
                revenue,
            };
        }));
        return {
            data,
            total: totalTickets,
            totalRevenue,
            metadata: {
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
            },
        };
    }
    async getScheduleReportDetail(busScheduleId, tenantId, query) {
        const scheduleObjectId = new mongoose_2.Types.ObjectId(busScheduleId);
        const includeBookings = query?.includeBookings !== false;
        const includeGoods = query?.includeGoods !== false;
        const schedule = await this.busScheduleModel
            .findOne({
            _id: scheduleObjectId,
            tenantId,
        })
            .lean()
            .exec();
        if (!schedule) {
            throw new Error(`Schedule với ID ${busScheduleId} không tồn tại`);
        }
        const busScheduleLayout = await this.busScheduleLayoutModel
            .findOne({
            busScheduleId: scheduleObjectId,
            tenantId,
        })
            .lean()
            .exec();
        const route = await this.busRouteModel.findById(schedule.busRouteId).lean().exec();
        let bookings = [];
        let goods = [];
        if (includeBookings) {
            bookings = await this.bookingModel
                .find({
                busScheduleId: scheduleObjectId,
                tenantId,
                status: { $ne: status_constants_1.BOOKING_STATUS.CANCELLED },
            })
                .lean()
                .exec();
        }
        if (includeGoods) {
            goods = await this.goodsModel
                .find({
                busScheduleId: scheduleObjectId,
                tenantId,
            })
                .lean()
                .exec();
        }
        let payments = [];
        if (includeBookings && bookings.length > 0) {
            const bookingIds = bookings.map((b) => b._id);
            payments = await this.paymentModel
                .find({
                referrentId: { $in: bookingIds },
                tenantId,
                status: status_constants_1.PAYMENT_STATUS.COMPLETED,
            })
                .lean()
                .exec();
        }
        let goodsPayments = [];
        if (includeGoods && goods.length > 0) {
            const goodsIds = goods.map((g) => g._id);
            goodsPayments = await this.paymentModel
                .find({
                referrentId: { $in: goodsIds },
                tenantId,
                status: { $in: [status_constants_1.PAYMENT_STATUS.COMPLETED, status_constants_1.PAYMENT_STATUS.REFUNDED] },
            })
                .lean()
                .exec();
        }
        const totalCapacity = busScheduleLayout?.seatLayouts?.reduce((acc, layout) => acc +
            (layout.seats.reduce((seatAcc, seat) => seatAcc + (seat.name && seat.status !== 'blocked' ? 1 : 0), 0) || 0), 0) || 0;
        const stats = this.calculateScheduleStats(bookings, goods, payments, goodsPayments, totalCapacity);
        const tripDate = typeof schedule.startDate === 'string' ? new Date(schedule.startDate) : schedule.startDate || new Date();
        const report = {
            scheduleId: String(schedule._id),
            scheduleNumber: schedule.busScheduleNumber,
            scheduleName: schedule.name,
            tripDate,
            status: schedule.status,
            bus: undefined,
            route: {
                _id: String(schedule.busRouteId),
                name: route?.name || 'N/A',
            },
            drivers: [],
            totalCapacity,
            bookings: this.formatBookings(bookings, route?.breakPoints),
            goods: this.formatGoods(goods, route?.breakPoints),
            stats,
            generatedAt: new Date(),
        };
        return report;
    }
    calculateScheduleStats(bookings, goods, payments, goodsPayments, totalCapacity) {
        let totalSeatsBooked = 0;
        let totalRevenue = 0;
        let totalDiscount = 0;
        let totalItemsShipped = 0;
        let totalShippingCost = 0;
        let totalCod = 0;
        bookings.forEach((booking) => {
            if (booking.bookingItems && booking.bookingItems.length > 0) {
                totalSeatsBooked += booking.quantity || booking.bookingItems.length;
                totalDiscount += booking.discountTotalAmount || 0;
            }
        });
        payments.forEach((payment) => {
            totalRevenue += payment.chargedAmount || payment.paymentAmount || 0;
        });
        goods.forEach((good) => {
            const quantity = good.quantity || 1;
            totalItemsShipped += quantity;
            totalShippingCost += good.shippingCost || 0;
            totalCod += good.cod || 0;
        });
        let totalGoodsRevenue = 0;
        goodsPayments.forEach((payment) => {
            totalGoodsRevenue += payment.chargedAmount || payment.paymentAmount || 0;
        });
        const occupancyRate = totalCapacity > 0 ? Math.round((totalSeatsBooked / totalCapacity) * 100) : 0;
        const netRevenue = totalRevenue - totalDiscount;
        const totalGoodsCapacity = goods.length > 0 ? Math.max(goods.length, totalItemsShipped) : 0;
        const shipmentRate = totalGoodsCapacity > 0 ? Math.round((totalItemsShipped / totalGoodsCapacity) * 100) : 0;
        const netGoodsRevenue = totalGoodsRevenue;
        return {
            booking: {
                totalBookings: bookings.length,
                totalSeatsBooked,
                totalSeatsAvailable: totalCapacity - totalSeatsBooked,
                occupancyRate,
                totalRevenue,
                totalDiscount,
                netRevenue,
            },
            goods: {
                totalGoods: goods.length,
                totalItemsShipped,
                totalItemsRemaining: totalGoodsCapacity - totalItemsShipped,
                shipmentRate,
                totalShippingCost,
                totalCod,
                totalGoodsRevenue,
                netGoodsRevenue,
            },
        };
    }
    formatBookings(bookings, breakPoints = []) {
        return bookings.map((booking) => {
            const bookingItems = (booking.bookingItems || []).map((item) => {
                const departureId = item.departure ? String(item.departure) : '';
                const destinationId = item.destination ? String(item.destination) : '';
                const departureStation = breakPoints?.find((bp) => String(bp.busStationId || bp._id) === departureId) || {
                    busStationId: item.departure,
                    name: 'N/A',
                };
                const destinationStation = breakPoints?.find((bp) => String(bp.busStationId || bp._id) === destinationId) || { busStationId: item.destination, name: 'N/A' };
                return {
                    bookingItemNumber: item.bookingItemNumber,
                    seat: {
                        seatId: item.seat?._id?.toString?.() || 'unknown',
                        seatNumber: item.seat?.seatNumber || 0,
                        seatName: item.seat?.name || 'N/A',
                        seatType: item.seat?.typeId?.toString?.() || 'standard',
                        status: item.seat?.status || 'booked',
                        price: item.price || 0,
                        discountAmount: item.discountAmount || 0,
                        finalPrice: item.afterDiscountPrice || item.price || 0,
                    },
                    departureStation: {
                        _id: String(departureStation.busStationId || departureStation._id || ''),
                        name: departureStation.name,
                    },
                    destinationStation: {
                        _id: String(destinationStation.busStationId || destinationStation._id || ''),
                        name: destinationStation.name,
                    },
                    price: item.price || 0,
                    discountAmount: item.discountAmount || 0,
                    finalPrice: item.afterDiscountPrice || item.price || 0,
                };
            });
            return {
                bookingId: booking._id?.toString?.() || booking._id,
                bookingNumber: booking.bookingNumber,
                bookingGroupNumber: booking.bookingGroupNumber,
                status: booking.status,
                passenger: {
                    name: booking.userInfo?.name || 'N/A',
                    phoneNumber: booking.userInfo?.phoneNumber || 'N/A',
                    email: booking.userInfo?.email || 'N/A',
                },
                quantity: booking.quantity || booking.bookingItems?.length || 0,
                bookingItems,
                totalPrice: booking.totalPrice || 0,
                discountTotalAmount: booking.discountTotalAmount || 0,
                afterDiscountTotalPrice: booking.afterDiscountTotalPrice || 0,
                paymentStatus: booking.status,
                paymentTime: booking.paymentTime,
                createdAt: booking.createdAt,
            };
        });
    }
    formatGoods(goods, breakPoints = []) {
        return goods.map((good) => {
            return {
                goodsId: good._id?.toString?.() || good._id,
                goodsNumber: good.goodsNumber,
                name: good.name,
                status: good.status,
                paymentStatus: good.paymentStatus,
                quantity: good.quantity || 0,
                weight: good.weight || 0,
                goodsValue: good.goodsValue || 0,
                shippingCost: good.shippingCost || 0,
                cod: good.cod || 0,
                sender: {
                    name: good.senderName || 'N/A',
                    phoneNumber: good.senderPhoneNumber || 'N/A',
                },
                customer: {
                    name: good.customerName || 'N/A',
                    phoneNumber: good.customerPhoneNumber || 'N/A',
                },
                note: good.note,
                createdAt: good.createdAt,
            };
        });
    }
};
exports.ReportScheduleService = ReportScheduleService;
exports.ReportScheduleService = ReportScheduleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(tracking_schema_1.TrackingDocument.name)),
    __param(1, (0, mongoose_1.InjectModel)(bus_schedule_schema_1.BusScheduleDocument.name)),
    __param(2, (0, mongoose_1.InjectModel)(bus_route_schema_1.BusRouteDocument.name)),
    __param(3, (0, mongoose_1.InjectModel)(booking_schema_1.BookingDocument.name)),
    __param(4, (0, mongoose_1.InjectModel)(goods_schema_1.GoodsDocument.name)),
    __param(5, (0, mongoose_1.InjectModel)(payment_schema_1.PaymentDocument.name)),
    __param(9, (0, mongoose_1.InjectModel)(bus_schedule_layout_schema_1.BusScheduleLayoutDocument.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        report_comparison_helper_service_1.ReportComparisonHelperService,
        report_date_helper_service_1.ReportDateHelperService,
        report_chart_helper_service_1.ReportChartHelperService,
        mongoose_2.Model])
], ReportScheduleService);
//# sourceMappingURL=report-schedule.service.js.map