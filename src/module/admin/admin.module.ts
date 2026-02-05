import { Module } from '@nestjs/common';
import { AdminPaymentModule } from './admin-payment/admin-payment.module';
import { AdminBookingModule } from './admin-booking/admin-booking.module';
import { BusTypeModule } from '../core/bus/bus-type/bus-type.module';
import { AdminBusScheduleAutogeneratorModule } from './admin-bus/admin-bus-schedule-autogenerator/admin-bus-schedule-autogenerator.module';
import { AdminBusScheduleLayoutModule } from './admin-bus/admin-bus-schedule-layout/admin-bus-schedule-layout.module';
import { AdminBusScheduleTemplateModule } from './admin-bus/admin-bus-schedule-template/admin-bus-schedule-template.module';
import { AdminBusLayoutTemplateModule } from './admin-bus/admin-bus-layout-template/admin-bus-layout-template.module';
import { AdminBusProvinceModule } from './admin-bus/admin-bus-province/admin-bus-province.module';
import { AdminBusRouteModule } from './admin-bus/admin-bus-route/admin-bus-route.module';
import { AdminBusScheduleModule } from './admin-bus/admin-bus-schedule/admin-bus-schedule.module';
import { AdminBusServiceModule } from './admin-bus/admin-bus-service/admin-bus-service.module';
import { AdminBusTemplateModule } from './admin-bus/admin-bus-template/admin-bus-template.module';
import { AdminBusTypeModule } from './admin-bus/admin-bus-type/admin-bus-type.module';
import { AdminBusModule } from './admin-bus/admin-bus-main/admin-bus.module';
import { AdminCounterModule } from './admin-counter/counter.module';
import { AdminFileFolderModule } from './admin-file/admin-file-folder/admin-file-folder.module';
import { AdminFileModule } from './admin-file/admin-file-main/admin-file.module';
import { AdminGoodsCategoryModule } from './admin-goods/admin-good-category/admin-goods-category.module';
import { AdminNotificationModule } from './admin-notification/admin-notification.module';
import { AdminPromotionModule } from './admin-promotion/admin-promotion.module';
import { AdminSeatTypeModule } from './admin-seat/admin-seat-type/admin-seat-type.module';
import { AdminUserModule } from './admin-user/admin-user.module';
import { AdminAuthModule } from './admin-auth/admin-auth/admin-auth.module';
import { AdminSubscriptionModule } from './admin-subscription/admin-subscription.module';
import { AdminTenantModule } from './admin-tenant/admin-tenant.module';
import { AdminAuthRescueModule } from './admin-auth/admin-auth-rescue/admin-auth-rescue.module';
import { AdminBusStationModule } from './admin-bus/admin-bus-station/admin-bus-station.module';
import { AdminTenantSubscriptionModule } from './admin-tenant-subscription/admin-tenant-subscription.module';
import { AdminPaymentMethodModule } from './admin-payment-method/admin-payment-method.module';
import { AdminSettingsModule } from './admin-settings/admin-settings.module';
import { AdminReportModule } from './admin-report/admin-report.module';
import { AdminGoodsModule } from './admin-goods/admin-goods/admin-goods.module';
import { AdminTrackingModule } from './admin-tracking/admin-tracking.module';
import { AdminDriverModule } from './admin-user/admin-driver/admin-driver.module';
import { AdminWidgetBlocksModule } from './admin-widget-blocks/admin-widget-blocks.module';
import { AdminContentLayoutModule } from './admin-content-layout/admin-content-layout.module';

@Module({
  imports: [
    AdminAuthModule,
    AdminBusTypeModule,
    BusTypeModule,
    AdminBusProvinceModule,
    AdminBusStationModule,
    AdminBusServiceModule,
    AdminFileModule,
    AdminBusRouteModule,
    AdminBusScheduleModule,
    AdminBusScheduleTemplateModule,
    AdminBusScheduleLayoutModule,
    AdminBusLayoutTemplateModule,
    AdminUserModule,
    AdminBusModule,
    AdminBusTemplateModule,
    AdminSeatTypeModule,
    AdminBookingModule,
    AdminPaymentModule,
    AdminPaymentMethodModule,
    AdminNotificationModule,
    AdminFileFolderModule,
    AdminCounterModule,
    AdminBusScheduleAutogeneratorModule,
    AdminDriverModule,
    AdminGoodsModule,
    AdminGoodsCategoryModule,
    AdminPromotionModule,
    AdminSubscriptionModule,
    AdminTenantModule,
    AdminAuthRescueModule,
    AdminTenantSubscriptionModule,
    AdminSettingsModule,
    AdminReportModule,
    AdminTrackingModule,
    AdminWidgetBlocksModule,
    AdminContentLayoutModule,
  ],
  exports: [
    AdminAuthModule,
    AdminBusTypeModule,
    AdminBusProvinceModule,
    AdminBusStationModule,
    AdminBusServiceModule,
    AdminFileModule,
    AdminBusRouteModule,
    AdminBusScheduleModule,
    AdminBusScheduleTemplateModule,
    AdminBusScheduleLayoutModule,
    AdminBusLayoutTemplateModule,
    AdminUserModule,
    AdminBusModule,
    AdminBusTemplateModule,
    AdminSeatTypeModule,
    AdminBookingModule,
    AdminPaymentModule,
    AdminPaymentMethodModule,
    AdminNotificationModule,
    AdminFileFolderModule,
    AdminCounterModule,
    AdminBusScheduleAutogeneratorModule,
    AdminDriverModule,
    AdminGoodsModule,
    AdminGoodsCategoryModule,
    AdminPromotionModule,
    AdminSubscriptionModule,
    AdminTenantModule,
    AdminAuthRescueModule,
    AdminTenantSubscriptionModule,
    AdminSettingsModule,
    AdminReportModule,
    AdminWidgetBlocksModule,
    AdminContentLayoutModule,
    AdminTrackingModule,
  ],
})
export class AdminModule {}
