"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PosModule = void 0;
const common_1 = require("@nestjs/common");
const pos_payment_module_1 = require("./pos-payment/pos-payment.module");
const pos_booking_module_1 = require("./pos-booking/pos-booking.module");
const bus_type_module_1 = require("../core/bus/bus-type/bus-type.module");
const pos_bus_schedule_autogenerator_module_1 = require("./pos-bus/pos-bus-schedule-autogenerator/pos-bus-schedule-autogenerator.module");
const pos_bus_schedule_layout_module_1 = require("./pos-bus/pos-bus-schedule-layout/pos-bus-schedule-layout.module");
const pos_bus_schedule_template_module_1 = require("./pos-bus/pos-bus-schedule-template/pos-bus-schedule-template.module");
const pos_bus_layout_template_module_1 = require("./pos-bus/pos-bus-layout-template/pos-bus-layout-template.module");
const pos_bus_province_module_1 = require("./pos-bus/pos-bus-province/pos-bus-province.module");
const pos_bus_route_module_1 = require("./pos-bus/pos-bus-route/pos-bus-route.module");
const pos_bus_schedule_module_1 = require("./pos-bus/pos-bus-schedule/pos-bus-schedule.module");
const pos_bus_service_module_1 = require("./pos-bus/pos-bus-service/pos-bus-service.module");
const pos_bus_template_module_1 = require("./pos-bus/pos-bus-template/pos-bus-template.module");
const pos_bus_type_module_1 = require("./pos-bus/pos-bus-type/pos-bus-type.module");
const pos_bus_module_1 = require("./pos-bus/pos-bus-main/pos-bus.module");
const pos_notification_module_1 = require("./pos-notification/pos-notification.module");
const pos_promotion_module_1 = require("./pos-promotion/pos-promotion.module");
const pos_driver_module_1 = require("./pos-user/pos-driver/pos-driver.module");
const pos_user_module_1 = require("./pos-user/pos-user-main/pos-user.module");
const pos_bus_station_module_1 = require("./pos-bus/pos-bus-station/pos-bus-station.module");
const pos_auth_rescue_module_1 = require("./pos-auth/pos-auth-rescue/pos-auth-rescue.module");
const pos_auth_module_1 = require("./pos-auth/pos-auth/pos-auth.module");
const pos_file_module_1 = require("./pos-file/pos-file-main/pos-file.module");
const pos_goods_category_module_1 = require("./pos-goods/pos-good-category/pos-goods-category.module");
const pos_seat_type_module_1 = require("./pos-seat/pos-seat-type/pos-seat-type.module");
const pos_payment_method_module_1 = require("./pos-payment-method/pos-payment-method.module");
const pos_settings_module_1 = require("./pos-settings/pos-settings.module");
const pos_report_module_1 = require("./pos-report/pos-report.module");
const pos_goods_module_1 = require("./pos-goods/pos-goods/pos-goods.module");
const pos_tracking_module_1 = require("./pos-tracking/pos-tracking.module");
const pos_tenant_module_1 = require("./pos-tenant/pos-tenant.module");
let PosModule = class PosModule {
};
exports.PosModule = PosModule;
exports.PosModule = PosModule = __decorate([
    (0, common_1.Module)({
        imports: [
            pos_auth_module_1.PosAuthModule,
            pos_bus_type_module_1.PosBusTypeModule,
            bus_type_module_1.BusTypeModule,
            pos_bus_province_module_1.PosBusProvinceModule,
            pos_bus_station_module_1.PosBusStationModule,
            pos_bus_service_module_1.PosBusServiceModule,
            pos_file_module_1.PosFileModule,
            pos_bus_route_module_1.PosBusRouteModule,
            pos_bus_schedule_module_1.PosBusScheduleModule,
            pos_bus_schedule_template_module_1.PosBusScheduleTemplateModule,
            pos_bus_schedule_layout_module_1.PosBusScheduleLayoutModule,
            pos_bus_layout_template_module_1.PosBusLayoutTemplateModule,
            pos_user_module_1.PosUserModule,
            pos_bus_module_1.PosBusModule,
            pos_bus_template_module_1.PosBusTemplateModule,
            pos_seat_type_module_1.PosSeatTypeModule,
            pos_booking_module_1.PosBookingModule,
            pos_payment_module_1.PosPaymentModule,
            pos_notification_module_1.PosNotificationModule,
            pos_bus_schedule_autogenerator_module_1.PosBusScheduleAutogeneratorModule,
            pos_driver_module_1.PosDriverModule,
            pos_goods_module_1.PosGoodsModule,
            pos_goods_category_module_1.PosGoodsCategoryModule,
            pos_promotion_module_1.PosPromotionModule,
            pos_auth_rescue_module_1.PosAuthRescueModule,
            pos_payment_method_module_1.PosPaymentMethodModule,
            pos_settings_module_1.PosSettingsModule,
            pos_report_module_1.PosReportModule,
            pos_tracking_module_1.PosTrackingModule,
            pos_tenant_module_1.PosTenantModule,
        ],
        exports: [
            pos_auth_module_1.PosAuthModule,
            pos_bus_type_module_1.PosBusTypeModule,
            pos_bus_province_module_1.PosBusProvinceModule,
            pos_bus_station_module_1.PosBusStationModule,
            pos_bus_service_module_1.PosBusServiceModule,
            pos_file_module_1.PosFileModule,
            pos_bus_route_module_1.PosBusRouteModule,
            pos_bus_schedule_module_1.PosBusScheduleModule,
            pos_bus_schedule_template_module_1.PosBusScheduleTemplateModule,
            pos_bus_schedule_layout_module_1.PosBusScheduleLayoutModule,
            pos_bus_layout_template_module_1.PosBusLayoutTemplateModule,
            pos_user_module_1.PosUserModule,
            pos_bus_module_1.PosBusModule,
            pos_bus_template_module_1.PosBusTemplateModule,
            pos_seat_type_module_1.PosSeatTypeModule,
            pos_booking_module_1.PosBookingModule,
            pos_payment_module_1.PosPaymentModule,
            pos_notification_module_1.PosNotificationModule,
            pos_bus_schedule_autogenerator_module_1.PosBusScheduleAutogeneratorModule,
            pos_driver_module_1.PosDriverModule,
            pos_goods_module_1.PosGoodsModule,
            pos_goods_category_module_1.PosGoodsCategoryModule,
            pos_promotion_module_1.PosPromotionModule,
            pos_auth_rescue_module_1.PosAuthRescueModule,
            pos_payment_method_module_1.PosPaymentMethodModule,
            pos_settings_module_1.PosSettingsModule,
            pos_report_module_1.PosReportModule,
            pos_tenant_module_1.PosTenantModule,
            pos_tracking_module_1.PosTrackingModule,
        ],
    })
], PosModule);
//# sourceMappingURL=pos.module.js.map