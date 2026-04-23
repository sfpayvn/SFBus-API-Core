"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreModule = void 0;
const common_1 = require("@nestjs/common");
const booking_module_1 = require("./booking/booking.module");
const payment_module_1 = require("./payment/payment.module");
const payment_method_module_1 = require("./payment-method/payment-method.module");
const interceptors_module_1 = require("../../interceptors/interceptors.module");
const auth_module_1 = require("./auth/auth/auth.module");
const bus_layout_template_module_1 = require("./bus/bus-layout-template/bus-layout-template.module");
const bus_province_module_1 = require("./bus/bus-province/bus-province.module");
const bus_route_module_1 = require("./bus/bus-route/bus-route.module");
const bus_schedule_autogenerator_module_1 = require("./bus/bus-schedule-autogenerator/bus-schedule-autogenerator.module");
const bus_schedule_layout_module_1 = require("./bus/bus-schedule-layout/bus-schedule-layout.module");
const bus_schedule_template_module_1 = require("./bus/bus-schedule-template/bus-schedule-template.module");
const bus_schedule_module_1 = require("./bus/bus-schedule/bus-schedule.module");
const bus_service_module_1 = require("./bus/bus-service/bus-service.module");
const bus_station_module_1 = require("./bus/bus-station/bus-station.module");
const bus_template_module_1 = require("./bus/bus-template/bus-template.module");
const bus_type_module_1 = require("./bus/bus-type/bus-type.module");
const bus_module_1 = require("./bus/bus/bus.module");
const counter_module_1 = require("./counter/counter.module");
const file_folder_module_1 = require("./file/file-folder/file-folder.module");
const file_module_1 = require("./file/file/file.module");
const goods_category_module_1 = require("./goods/good-category/goods-category.module");
const goods_module_1 = require("./goods/goods/goods.module");
const notification_module_1 = require("./notification/notification.module");
const promotion_module_1 = require("./promotion/promotion.module");
const seat_type_module_1 = require("./seat/seat-type/seat-type.module");
const user_module_1 = require("./user/user/user.module");
const tenant_module_1 = require("./tenant/tenant.module");
const subscription_module_1 = require("./subscription/subscription.module");
const tenant_subscription_module_1 = require("./tenant-subscription/tenant-subscription.module");
const tenant_subscription_usage_module_1 = require("./tenant-subscription-usage/tenant-subscription-usage.module");
const settings_module_1 = require("./settings/settings.module");
const report_module_1 = require("./report/report.module");
const tracking_module_1 = require("./tracking/tracking.module");
const auto_job_tracking_1 = require("./auto-job-tracking");
const widget_blocks_module_1 = require("./widget-blocks/widget-blocks.module");
const driver_module_1 = require("./user/driver/driver.module");
const fee_tax_module_1 = require("./fee-tax/fee-tax.module");
let CoreModule = class CoreModule {
};
exports.CoreModule = CoreModule;
exports.CoreModule = CoreModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bus_type_module_1.BusTypeModule,
            bus_province_module_1.BusProvinceModule,
            bus_station_module_1.BusStationModule,
            bus_service_module_1.BusServiceModule,
            file_module_1.FileModule,
            bus_route_module_1.BusRouteModule,
            bus_schedule_module_1.BusScheduleModule,
            bus_schedule_template_module_1.BusScheduleTemplateModule,
            bus_schedule_layout_module_1.BusScheduleLayoutModule,
            bus_layout_template_module_1.BusLayoutTemplateModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            bus_module_1.BusModule,
            bus_template_module_1.BusTemplateModule,
            seat_type_module_1.SeatTypeModule,
            booking_module_1.BookingModule,
            payment_module_1.PaymentModule,
            payment_method_module_1.PaymentMethodModule,
            notification_module_1.NotificationModule,
            file_folder_module_1.FileFolderModule,
            counter_module_1.CounterModule,
            bus_schedule_autogenerator_module_1.BusScheduleAutogeneratorModule,
            driver_module_1.DriverModule,
            goods_module_1.GoodsModule,
            goods_category_module_1.GoodsCategoryModule,
            interceptors_module_1.InterceptorModule,
            promotion_module_1.PromotionModule,
            subscription_module_1.SubscriptionModule,
            tenant_module_1.TenantModule,
            tenant_subscription_module_1.TenantSubscriptionModule,
            tenant_subscription_usage_module_1.TenantSubscriptionUsageModule,
            settings_module_1.SettingsModule,
            report_module_1.ReportModule,
            tracking_module_1.TrackingModule,
            auto_job_tracking_1.AutoJobTrackingModule,
            widget_blocks_module_1.WidgetBlocksModule,
            fee_tax_module_1.FeeTaxModule,
        ],
        exports: [
            bus_type_module_1.BusTypeModule,
            bus_province_module_1.BusProvinceModule,
            bus_station_module_1.BusStationModule,
            bus_service_module_1.BusServiceModule,
            file_module_1.FileModule,
            bus_route_module_1.BusRouteModule,
            bus_schedule_module_1.BusScheduleModule,
            bus_schedule_template_module_1.BusScheduleTemplateModule,
            bus_schedule_layout_module_1.BusScheduleLayoutModule,
            bus_layout_template_module_1.BusLayoutTemplateModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            bus_module_1.BusModule,
            bus_template_module_1.BusTemplateModule,
            seat_type_module_1.SeatTypeModule,
            booking_module_1.BookingModule,
            payment_module_1.PaymentModule,
            payment_method_module_1.PaymentMethodModule,
            notification_module_1.NotificationModule,
            file_folder_module_1.FileFolderModule,
            counter_module_1.CounterModule,
            bus_schedule_autogenerator_module_1.BusScheduleAutogeneratorModule,
            driver_module_1.DriverModule,
            goods_module_1.GoodsModule,
            goods_category_module_1.GoodsCategoryModule,
            interceptors_module_1.InterceptorModule,
            promotion_module_1.PromotionModule,
            subscription_module_1.SubscriptionModule,
            tenant_module_1.TenantModule,
            tenant_subscription_module_1.TenantSubscriptionModule,
            tenant_subscription_usage_module_1.TenantSubscriptionUsageModule,
            settings_module_1.SettingsModule,
            report_module_1.ReportModule,
            tracking_module_1.TrackingModule,
            auto_job_tracking_1.AutoJobTrackingModule,
            widget_blocks_module_1.WidgetBlocksModule,
            fee_tax_module_1.FeeTaxModule,
        ],
    })
], CoreModule);
//# sourceMappingURL=core.module.js.map