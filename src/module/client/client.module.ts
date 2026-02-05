import { Module } from '@nestjs/common';
import { ClientBookingModule } from './client-booking/client-booking.module';
import { BusTypeModule } from '../core/bus/bus-type/bus-type.module';
import { ClientBusScheduleLayoutModule } from './client-bus/client-bus-schedule-layout/client-bus-schedule-layout.module';
import { ClientBusScheduleTemplateModule } from './client-bus/client-bus-schedule-template/client-bus-schedule-template.module';
import { ClientBusLayoutTemplateModule } from './client-bus/client-bus-layout-template/client-bus-layout-template.module';
import { ClientBusProvinceModule } from './client-bus/client-bus-province/client-bus-province.module';
import { ClientBusRouteModule } from './client-bus/client-bus-route/client-bus-route.module';
import { ClientBusScheduleModule } from './client-bus/client-bus-schedule/client-bus-schedule.module';
import { ClientBusServiceModule } from './client-bus/client-bus-service/client-bus-service.module';
import { ClientBusTemplateModule } from './client-bus/client-bus-template/client-bus-template.module';
import { ClientBusTypeModule } from './client-bus/client-bus-type/client-bus-type.module';
import { ClientNotificationModule } from './client-notification/client-notification.module';
import { ClientPromotionModule } from './client-promotion/client-promotion.module';
import { ClientDriverModule } from './client-user/client-driver/client-driver.module';
import { ClientUserModule } from './client-user/client-user-main/client-user.module';
import { ClientBusStationModule } from './client-bus/client-bus-station/client-bus-station.module';
import { ClientAuthRescueModule } from './client-auth/client-auth-rescue/client-auth-rescue.module';
import { ClientAuthModule } from './client-auth/client-auth/client-auth.module';
import { ClientFileModule } from './client-file/client-file-main/client-file.module';
import { ClientSeatTypeModule } from './client-seat/client-seat-type/client-seat-type.module';
import { ClientCounterModule } from './client-counter/client-counter.module';
import { ClientPaymentMethodModule } from './client-payment-method/client-payment-method.module';
import { ClientSettingsModule } from './client-settings/client-settings.module';
import { ClientGoodsModule } from './client-goods/client-goods/client-goods.module';
import { ClientTenantModule } from './client-tenant/client-tenant.module';
import { ClientPaymentModule } from './client-payment/client-payment.module';
import { ClientTrackingModule } from './client-tracking/client-tracking.module';
import { ClientContentLayoutModule } from './client-content-layout/client-content-layout.module';

@Module({
  imports: [
    ClientAuthModule,
    ClientBusTypeModule,
    BusTypeModule,
    ClientBusProvinceModule,
    ClientBusStationModule,
    ClientBusServiceModule,
    ClientFileModule,
    ClientBusRouteModule,
    ClientBusScheduleModule,
    ClientBusScheduleTemplateModule,
    ClientBusScheduleLayoutModule,
    ClientBusLayoutTemplateModule,
    ClientUserModule,
    ClientBusTemplateModule,
    ClientSeatTypeModule,
    ClientBookingModule,
    ClientNotificationModule,
    ClientCounterModule,
    ClientDriverModule,
    ClientGoodsModule,
    ClientPromotionModule,
    ClientAuthRescueModule,
    ClientPaymentMethodModule,
    ClientSettingsModule,
    ClientPaymentModule,
    ClientTenantModule,
    ClientTrackingModule,
    ClientContentLayoutModule,
  ],
  exports: [
    ClientAuthModule,
    ClientBusTypeModule,
    ClientBusProvinceModule,
    ClientBusStationModule,
    ClientBusServiceModule,
    ClientFileModule,
    ClientBusRouteModule,
    ClientBusScheduleModule,
    ClientBusScheduleTemplateModule,
    ClientBusScheduleLayoutModule,
    ClientBusLayoutTemplateModule,
    ClientUserModule,
    ClientBusTemplateModule,
    ClientSeatTypeModule,
    ClientBookingModule,
    ClientNotificationModule,
    ClientCounterModule,
    ClientDriverModule,
    ClientGoodsModule,
    ClientPromotionModule,
    ClientAuthRescueModule,
    ClientPaymentMethodModule,
    ClientSettingsModule,
    ClientPaymentModule,
    ClientTenantModule,
    ClientTrackingModule,
    ClientContentLayoutModule,
  ],
})
export class ClientModule {}
