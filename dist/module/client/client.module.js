"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientModule = void 0;
const common_1 = require("@nestjs/common");
const client_booking_module_1 = require("./client-booking/client-booking.module");
const bus_type_module_1 = require("../core/bus/bus-type/bus-type.module");
const client_bus_schedule_layout_module_1 = require("./client-bus/client-bus-schedule-layout/client-bus-schedule-layout.module");
const client_bus_schedule_template_module_1 = require("./client-bus/client-bus-schedule-template/client-bus-schedule-template.module");
const client_bus_layout_template_module_1 = require("./client-bus/client-bus-layout-template/client-bus-layout-template.module");
const client_bus_province_module_1 = require("./client-bus/client-bus-province/client-bus-province.module");
const client_bus_route_module_1 = require("./client-bus/client-bus-route/client-bus-route.module");
const client_bus_schedule_module_1 = require("./client-bus/client-bus-schedule/client-bus-schedule.module");
const client_bus_service_module_1 = require("./client-bus/client-bus-service/client-bus-service.module");
const client_bus_template_module_1 = require("./client-bus/client-bus-template/client-bus-template.module");
const client_bus_type_module_1 = require("./client-bus/client-bus-type/client-bus-type.module");
const client_notification_module_1 = require("./client-notification/client-notification.module");
const client_promotion_module_1 = require("./client-promotion/client-promotion.module");
const client_driver_module_1 = require("./client-user/client-driver/client-driver.module");
const client_user_module_1 = require("./client-user/client-user-main/client-user.module");
const client_bus_station_module_1 = require("./client-bus/client-bus-station/client-bus-station.module");
const client_auth_rescue_module_1 = require("./client-auth/client-auth-rescue/client-auth-rescue.module");
const client_auth_module_1 = require("./client-auth/client-auth/client-auth.module");
const client_file_module_1 = require("./client-file/client-file-main/client-file.module");
const client_seat_type_module_1 = require("./client-seat/client-seat-type/client-seat-type.module");
const client_counter_module_1 = require("./client-counter/client-counter.module");
const client_payment_method_module_1 = require("./client-payment-method/client-payment-method.module");
const client_settings_module_1 = require("./client-settings/client-settings.module");
const client_goods_module_1 = require("./client-goods/client-goods/client-goods.module");
const client_tenant_module_1 = require("./client-tenant/client-tenant.module");
const client_payment_module_1 = require("./client-payment/client-payment.module");
const client_tracking_module_1 = require("./client-tracking/client-tracking.module");
const client_content_layout_module_1 = require("./client-content-layout/client-content-layout.module");
let ClientModule = class ClientModule {
};
exports.ClientModule = ClientModule;
exports.ClientModule = ClientModule = __decorate([
    (0, common_1.Module)({
        imports: [
            client_auth_module_1.ClientAuthModule,
            client_bus_type_module_1.ClientBusTypeModule,
            bus_type_module_1.BusTypeModule,
            client_bus_province_module_1.ClientBusProvinceModule,
            client_bus_station_module_1.ClientBusStationModule,
            client_bus_service_module_1.ClientBusServiceModule,
            client_file_module_1.ClientFileModule,
            client_bus_route_module_1.ClientBusRouteModule,
            client_bus_schedule_module_1.ClientBusScheduleModule,
            client_bus_schedule_template_module_1.ClientBusScheduleTemplateModule,
            client_bus_schedule_layout_module_1.ClientBusScheduleLayoutModule,
            client_bus_layout_template_module_1.ClientBusLayoutTemplateModule,
            client_user_module_1.ClientUserModule,
            client_bus_template_module_1.ClientBusTemplateModule,
            client_seat_type_module_1.ClientSeatTypeModule,
            client_booking_module_1.ClientBookingModule,
            client_notification_module_1.ClientNotificationModule,
            client_counter_module_1.ClientCounterModule,
            client_driver_module_1.ClientDriverModule,
            client_goods_module_1.ClientGoodsModule,
            client_promotion_module_1.ClientPromotionModule,
            client_auth_rescue_module_1.ClientAuthRescueModule,
            client_payment_method_module_1.ClientPaymentMethodModule,
            client_settings_module_1.ClientSettingsModule,
            client_payment_module_1.ClientPaymentModule,
            client_tenant_module_1.ClientTenantModule,
            client_tracking_module_1.ClientTrackingModule,
            client_content_layout_module_1.ClientContentLayoutModule,
        ],
        exports: [
            client_auth_module_1.ClientAuthModule,
            client_bus_type_module_1.ClientBusTypeModule,
            client_bus_province_module_1.ClientBusProvinceModule,
            client_bus_station_module_1.ClientBusStationModule,
            client_bus_service_module_1.ClientBusServiceModule,
            client_file_module_1.ClientFileModule,
            client_bus_route_module_1.ClientBusRouteModule,
            client_bus_schedule_module_1.ClientBusScheduleModule,
            client_bus_schedule_template_module_1.ClientBusScheduleTemplateModule,
            client_bus_schedule_layout_module_1.ClientBusScheduleLayoutModule,
            client_bus_layout_template_module_1.ClientBusLayoutTemplateModule,
            client_user_module_1.ClientUserModule,
            client_bus_template_module_1.ClientBusTemplateModule,
            client_seat_type_module_1.ClientSeatTypeModule,
            client_booking_module_1.ClientBookingModule,
            client_notification_module_1.ClientNotificationModule,
            client_counter_module_1.ClientCounterModule,
            client_driver_module_1.ClientDriverModule,
            client_goods_module_1.ClientGoodsModule,
            client_promotion_module_1.ClientPromotionModule,
            client_auth_rescue_module_1.ClientAuthRescueModule,
            client_payment_method_module_1.ClientPaymentMethodModule,
            client_settings_module_1.ClientSettingsModule,
            client_payment_module_1.ClientPaymentModule,
            client_tenant_module_1.ClientTenantModule,
            client_tracking_module_1.ClientTrackingModule,
            client_content_layout_module_1.ClientContentLayoutModule,
        ],
    })
], ClientModule);
//# sourceMappingURL=client.module.js.map