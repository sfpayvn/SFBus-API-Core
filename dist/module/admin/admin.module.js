"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const admin_payment_module_1 = require("./admin-payment/admin-payment.module");
const admin_booking_module_1 = require("./admin-booking/admin-booking.module");
const bus_type_module_1 = require("../core/bus/bus-type/bus-type.module");
const admin_bus_schedule_autogenerator_module_1 = require("./admin-bus/admin-bus-schedule-autogenerator/admin-bus-schedule-autogenerator.module");
const admin_bus_schedule_layout_module_1 = require("./admin-bus/admin-bus-schedule-layout/admin-bus-schedule-layout.module");
const admin_bus_schedule_template_module_1 = require("./admin-bus/admin-bus-schedule-template/admin-bus-schedule-template.module");
const admin_bus_layout_template_module_1 = require("./admin-bus/admin-bus-layout-template/admin-bus-layout-template.module");
const admin_bus_province_module_1 = require("./admin-bus/admin-bus-province/admin-bus-province.module");
const admin_bus_route_module_1 = require("./admin-bus/admin-bus-route/admin-bus-route.module");
const admin_bus_schedule_module_1 = require("./admin-bus/admin-bus-schedule/admin-bus-schedule.module");
const admin_bus_service_module_1 = require("./admin-bus/admin-bus-service/admin-bus-service.module");
const admin_bus_template_module_1 = require("./admin-bus/admin-bus-template/admin-bus-template.module");
const admin_bus_type_module_1 = require("./admin-bus/admin-bus-type/admin-bus-type.module");
const admin_bus_module_1 = require("./admin-bus/admin-bus-main/admin-bus.module");
const counter_module_1 = require("./admin-counter/counter.module");
const admin_file_folder_module_1 = require("./admin-file/admin-file-folder/admin-file-folder.module");
const admin_file_module_1 = require("./admin-file/admin-file-main/admin-file.module");
const admin_goods_category_module_1 = require("./admin-goods/admin-good-category/admin-goods-category.module");
const admin_notification_module_1 = require("./admin-notification/admin-notification.module");
const admin_promotion_module_1 = require("./admin-promotion/admin-promotion.module");
const admin_seat_type_module_1 = require("./admin-seat/admin-seat-type/admin-seat-type.module");
const admin_user_module_1 = require("./admin-user/admin-user.module");
const admin_auth_module_1 = require("./admin-auth/admin-auth/admin-auth.module");
const admin_subscription_module_1 = require("./admin-subscription/admin-subscription.module");
const admin_tenant_module_1 = require("./admin-tenant/admin-tenant.module");
const admin_auth_rescue_module_1 = require("./admin-auth/admin-auth-rescue/admin-auth-rescue.module");
const admin_bus_station_module_1 = require("./admin-bus/admin-bus-station/admin-bus-station.module");
const admin_tenant_subscription_module_1 = require("./admin-tenant-subscription/admin-tenant-subscription.module");
const admin_payment_method_module_1 = require("./admin-payment-method/admin-payment-method.module");
const admin_settings_module_1 = require("./admin-settings/admin-settings.module");
const admin_report_module_1 = require("./admin-report/admin-report.module");
const admin_goods_module_1 = require("./admin-goods/admin-goods/admin-goods.module");
const admin_tracking_module_1 = require("./admin-tracking/admin-tracking.module");
const admin_driver_module_1 = require("./admin-user/admin-driver/admin-driver.module");
const admin_widget_blocks_module_1 = require("./admin-widget-blocks/admin-widget-blocks.module");
const admin_content_layout_module_1 = require("./admin-content-layout/admin-content-layout.module");
const admin_fee_tax_module_1 = require("./admin-fee-tax/admin-fee-tax.module");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            admin_auth_module_1.AdminAuthModule,
            admin_bus_type_module_1.AdminBusTypeModule,
            bus_type_module_1.BusTypeModule,
            admin_bus_province_module_1.AdminBusProvinceModule,
            admin_bus_station_module_1.AdminBusStationModule,
            admin_bus_service_module_1.AdminBusServiceModule,
            admin_file_module_1.AdminFileModule,
            admin_bus_route_module_1.AdminBusRouteModule,
            admin_bus_schedule_module_1.AdminBusScheduleModule,
            admin_bus_schedule_template_module_1.AdminBusScheduleTemplateModule,
            admin_bus_schedule_layout_module_1.AdminBusScheduleLayoutModule,
            admin_bus_layout_template_module_1.AdminBusLayoutTemplateModule,
            admin_user_module_1.AdminUserModule,
            admin_bus_module_1.AdminBusModule,
            admin_bus_template_module_1.AdminBusTemplateModule,
            admin_seat_type_module_1.AdminSeatTypeModule,
            admin_booking_module_1.AdminBookingModule,
            admin_payment_module_1.AdminPaymentModule,
            admin_payment_method_module_1.AdminPaymentMethodModule,
            admin_fee_tax_module_1.AdminFeeTaxModule,
            admin_notification_module_1.AdminNotificationModule,
            admin_file_folder_module_1.AdminFileFolderModule,
            counter_module_1.AdminCounterModule,
            admin_bus_schedule_autogenerator_module_1.AdminBusScheduleAutogeneratorModule,
            admin_driver_module_1.AdminDriverModule,
            admin_goods_module_1.AdminGoodsModule,
            admin_goods_category_module_1.AdminGoodsCategoryModule,
            admin_promotion_module_1.AdminPromotionModule,
            admin_subscription_module_1.AdminSubscriptionModule,
            admin_tenant_module_1.AdminTenantModule,
            admin_auth_rescue_module_1.AdminAuthRescueModule,
            admin_tenant_subscription_module_1.AdminTenantSubscriptionModule,
            admin_settings_module_1.AdminSettingsModule,
            admin_report_module_1.AdminReportModule,
            admin_tracking_module_1.AdminTrackingModule,
            admin_widget_blocks_module_1.AdminWidgetBlocksModule,
            admin_content_layout_module_1.AdminContentLayoutModule,
        ],
        exports: [
            admin_auth_module_1.AdminAuthModule,
            admin_bus_type_module_1.AdminBusTypeModule,
            admin_bus_province_module_1.AdminBusProvinceModule,
            admin_bus_station_module_1.AdminBusStationModule,
            admin_bus_service_module_1.AdminBusServiceModule,
            admin_file_module_1.AdminFileModule,
            admin_bus_route_module_1.AdminBusRouteModule,
            admin_bus_schedule_module_1.AdminBusScheduleModule,
            admin_bus_schedule_template_module_1.AdminBusScheduleTemplateModule,
            admin_bus_schedule_layout_module_1.AdminBusScheduleLayoutModule,
            admin_bus_layout_template_module_1.AdminBusLayoutTemplateModule,
            admin_user_module_1.AdminUserModule,
            admin_bus_module_1.AdminBusModule,
            admin_bus_template_module_1.AdminBusTemplateModule,
            admin_seat_type_module_1.AdminSeatTypeModule,
            admin_booking_module_1.AdminBookingModule,
            admin_payment_module_1.AdminPaymentModule,
            admin_payment_method_module_1.AdminPaymentMethodModule,
            admin_fee_tax_module_1.AdminFeeTaxModule,
            admin_notification_module_1.AdminNotificationModule,
            admin_file_folder_module_1.AdminFileFolderModule,
            counter_module_1.AdminCounterModule,
            admin_bus_schedule_autogenerator_module_1.AdminBusScheduleAutogeneratorModule,
            admin_driver_module_1.AdminDriverModule,
            admin_goods_module_1.AdminGoodsModule,
            admin_goods_category_module_1.AdminGoodsCategoryModule,
            admin_promotion_module_1.AdminPromotionModule,
            admin_subscription_module_1.AdminSubscriptionModule,
            admin_tenant_module_1.AdminTenantModule,
            admin_auth_rescue_module_1.AdminAuthRescueModule,
            admin_tenant_subscription_module_1.AdminTenantSubscriptionModule,
            admin_settings_module_1.AdminSettingsModule,
            admin_report_module_1.AdminReportModule,
            admin_widget_blocks_module_1.AdminWidgetBlocksModule,
            admin_content_layout_module_1.AdminContentLayoutModule,
            admin_tracking_module_1.AdminTrackingModule,
        ],
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map