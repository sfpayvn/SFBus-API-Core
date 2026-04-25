"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverModule = void 0;
const common_1 = require("@nestjs/common");
const driver_payment_module_1 = require("./driver-payment/driver-payment.module");
const driver_booking_module_1 = require("./driver-booking/driver-booking.module");
const bus_type_module_1 = require("../core/bus/bus-type/bus-type.module");
const driver_bus_schedule_layout_module_1 = require("./driver-bus/driver-bus-schedule-layout/driver-bus-schedule-layout.module");
const driver_bus_schedule_template_module_1 = require("./driver-bus/driver-bus-schedule-template/driver-bus-schedule-template.module");
const driver_bus_layout_template_module_1 = require("./driver-bus/driver-bus-layout-template/driver-bus-layout-template.module");
const driver_bus_province_module_1 = require("./driver-bus/driver-bus-province/driver-bus-province.module");
const driver_bus_route_module_1 = require("./driver-bus/driver-bus-route/driver-bus-route.module");
const driver_bus_schedule_module_1 = require("./driver-bus/driver-bus-schedule/driver-bus-schedule.module");
const driver_bus_service_module_1 = require("./driver-bus/driver-bus-service/driver-bus-service.module");
const driver_bus_template_module_1 = require("./driver-bus/driver-bus-template/driver-bus-template.module");
const driver_bus_type_module_1 = require("./driver-bus/driver-bus-type/driver-bus-type.module");
const driver_counter_module_1 = require("./driver-counter/driver-counter.module");
const driver_notification_module_1 = require("./driver-notification/driver-notification.module");
const driver_promotion_module_1 = require("./driver-promotion/driver-promotion.module");
const driver_driver_module_1 = require("./driver-user/driver-driver/driver-driver.module");
const driver_user_module_1 = require("./driver-user/driver-user-main/driver-user.module");
const driver_bus_station_module_1 = require("./driver-bus/driver-bus-station/driver-bus-station.module");
const driver_tenant_subscription_module_1 = require("./driver-tenant-subscription/driver-tenant-subscription.module");
const driver_auth_rescue_module_1 = require("./driver-auth/driver-auth-rescue/driver-auth-rescue.module");
const driver_auth_module_1 = require("./driver-auth/driver-auth/driver-auth.module");
const driver_file_module_1 = require("./driver-file/driver-file-main/driver-file.module");
const driver_seat_type_module_1 = require("./driver-seat/driver-seat-type/driver-seat-type.module");
const driver_payment_method_module_1 = require("./driver-payment-method/driver-payment-method.module");
const driver_settings_module_1 = require("./driver-settings/driver-settings.module");
const driver_report_module_1 = require("./driver-report/driver-report.module");
const driver_goods_module_1 = require("./driver-goods/driver-goods/driver-goods.module");
const driver_tenant_module_1 = require("./driver-tenant/driver-tenant.module");
const driver_tracking_module_1 = require("./driver-tracking/driver-tracking.module");
let DriverModule = class DriverModule {
};
exports.DriverModule = DriverModule;
exports.DriverModule = DriverModule = __decorate([
    (0, common_1.Module)({
        imports: [
            driver_auth_module_1.DriverAuthModule,
            driver_bus_type_module_1.DriverBusTypeModule,
            bus_type_module_1.BusTypeModule,
            driver_bus_province_module_1.DriverBusProvinceModule,
            driver_bus_station_module_1.DriverBusStationModule,
            driver_bus_service_module_1.DriverBusServiceModule,
            driver_file_module_1.DriverFileModule,
            driver_bus_route_module_1.DriverBusRouteModule,
            driver_bus_schedule_module_1.DriverBusScheduleModule,
            driver_bus_schedule_template_module_1.DriverBusScheduleTemplateModule,
            driver_bus_schedule_layout_module_1.DriverBusScheduleLayoutModule,
            driver_bus_layout_template_module_1.DriverBusLayoutTemplateModule,
            driver_user_module_1.DriverUserModule,
            driver_bus_template_module_1.DriverBusTemplateModule,
            driver_seat_type_module_1.DriverSeatTypeModule,
            driver_booking_module_1.DriverBookingModule,
            driver_payment_module_1.DriverPaymentModule,
            driver_notification_module_1.DriverNotificationModule,
            driver_counter_module_1.DriverCounterModule,
            driver_driver_module_1.DriverDriverModule,
            driver_goods_module_1.DriverGoodsModule,
            driver_promotion_module_1.DriverPromotionModule,
            driver_auth_rescue_module_1.DriverAuthRescueModule,
            driver_tenant_subscription_module_1.DriverTenantSubscriptionModule,
            driver_payment_method_module_1.DriverPaymentMethodModule,
            driver_settings_module_1.DriverSettingsModule,
            driver_report_module_1.DriverReportModule,
            driver_tenant_module_1.DriverTenantModule,
            driver_tracking_module_1.DriverTrackingModule,
        ],
        exports: [
            driver_auth_module_1.DriverAuthModule,
            driver_bus_type_module_1.DriverBusTypeModule,
            driver_bus_province_module_1.DriverBusProvinceModule,
            driver_bus_station_module_1.DriverBusStationModule,
            driver_bus_service_module_1.DriverBusServiceModule,
            driver_file_module_1.DriverFileModule,
            driver_bus_route_module_1.DriverBusRouteModule,
            driver_bus_schedule_module_1.DriverBusScheduleModule,
            driver_bus_schedule_template_module_1.DriverBusScheduleTemplateModule,
            driver_bus_schedule_layout_module_1.DriverBusScheduleLayoutModule,
            driver_bus_layout_template_module_1.DriverBusLayoutTemplateModule,
            driver_user_module_1.DriverUserModule,
            driver_bus_template_module_1.DriverBusTemplateModule,
            driver_seat_type_module_1.DriverSeatTypeModule,
            driver_booking_module_1.DriverBookingModule,
            driver_payment_module_1.DriverPaymentModule,
            driver_notification_module_1.DriverNotificationModule,
            driver_counter_module_1.DriverCounterModule,
            driver_driver_module_1.DriverDriverModule,
            driver_goods_module_1.DriverGoodsModule,
            driver_promotion_module_1.DriverPromotionModule,
            driver_auth_rescue_module_1.DriverAuthRescueModule,
            driver_tenant_subscription_module_1.DriverTenantSubscriptionModule,
            driver_payment_method_module_1.DriverPaymentMethodModule,
            driver_settings_module_1.DriverSettingsModule,
            driver_report_module_1.DriverReportModule,
            driver_tenant_module_1.DriverTenantModule,
            driver_tracking_module_1.DriverTrackingModule,
        ],
    })
], DriverModule);
//# sourceMappingURL=driver.module.js.map