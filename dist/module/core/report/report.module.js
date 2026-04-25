"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const report_controller_1 = require("./report.controller");
const report_service_1 = require("./report.service");
const booking_schema_1 = require("../booking/schema/booking.schema");
const tracking_schema_1 = require("../tracking/schema/tracking.schema");
const payment_method_schema_1 = require("../payment-method/schema/payment-method.schema");
const bus_route_schema_1 = require("../bus/bus-route/schema/bus-route.schema");
const bus_schedule_schema_1 = require("../bus/bus-schedule/schema/bus-schedule.schema");
const goods_schema_1 = require("../goods/goods/schema/goods.schema");
const payment_schema_1 = require("../payment/schema/payment.schema");
const bus_schedule_module_1 = require("../bus/bus-schedule/bus-schedule.module");
const bus_route_module_1 = require("../bus/bus-route/bus-route.module");
const report_date_helper_service_1 = require("./helpers/report-date-helper.service");
const report_comparison_helper_service_1 = require("./helpers/report-comparison-helper.service");
const report_detail_helper_service_1 = require("./helpers/report-detail-helper.service");
const report_chart_helper_service_1 = require("./helpers/report-chart-helper.service");
const report_booking_service_1 = require("./services/report-booking.service");
const report_goods_service_1 = require("./services/report-goods.service");
const report_payment_service_1 = require("./services/report-payment.service");
const report_schedule_service_1 = require("./services/report-schedule.service");
const bus_schedule_layout_schema_1 = require("../bus/bus-schedule-layout/schema/bus-schedule-layout.schema");
let ReportModule = class ReportModule {
};
exports.ReportModule = ReportModule;
exports.ReportModule = ReportModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: booking_schema_1.BookingDocument.name, schema: booking_schema_1.BookingSchema },
                { name: tracking_schema_1.TrackingDocument.name, schema: tracking_schema_1.TrackingSchema },
                { name: payment_method_schema_1.PaymentMethodDocument.name, schema: payment_method_schema_1.PaymentMethodSchema },
                { name: bus_route_schema_1.BusRouteDocument.name, schema: bus_route_schema_1.BusRouteSchema },
                { name: bus_schedule_schema_1.BusScheduleDocument.name, schema: bus_schedule_schema_1.BusScheduleSchema },
                { name: goods_schema_1.GoodsDocument.name, schema: goods_schema_1.GoodsSchema },
                { name: payment_schema_1.PaymentDocument.name, schema: payment_schema_1.PaymentSchema },
                { name: bus_schedule_layout_schema_1.BusScheduleLayoutDocument.name, schema: bus_schedule_layout_schema_1.BusScheduleLayoutSchema },
            ]),
            (0, common_1.forwardRef)(() => bus_schedule_module_1.BusScheduleModule),
            (0, common_1.forwardRef)(() => bus_route_module_1.BusRouteModule),
        ],
        controllers: [report_controller_1.ReportController],
        providers: [
            report_service_1.ReportService,
            report_date_helper_service_1.ReportDateHelperService,
            report_comparison_helper_service_1.ReportComparisonHelperService,
            report_detail_helper_service_1.ReportDetailHelperService,
            report_chart_helper_service_1.ReportChartHelperService,
            report_booking_service_1.ReportBookingService,
            report_schedule_service_1.ReportScheduleService,
            report_goods_service_1.ReportGoodsService,
            report_payment_service_1.ReportPaymentService,
        ],
        exports: [report_service_1.ReportService],
    })
], ReportModule);
//# sourceMappingURL=report.module.js.map