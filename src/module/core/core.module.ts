import { Module } from '@nestjs/common';
import { BookingModule } from './booking/booking.module';
import { PaymentModule } from './payment/payment.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { InterceptorModule } from '@/interceptors/interceptors.module';
import { AuthModule } from './auth/auth/auth.module';
import { BusLayoutTemplateModule } from './bus/bus-layout-template/bus-layout-template.module';
import { BusProvinceModule } from './bus/bus-province/bus-province.module';
import { BusRouteModule } from './bus/bus-route/bus-route.module';
import { BusScheduleAutogeneratorModule } from './bus/bus-schedule-autogenerator/bus-schedule-autogenerator.module';
import { BusScheduleLayoutModule } from './bus/bus-schedule-layout/bus-schedule-layout.module';
import { BusScheduleTemplateModule } from './bus/bus-schedule-template/bus-schedule-template.module';
import { BusScheduleModule } from './bus/bus-schedule/bus-schedule.module';
import { BusServiceModule } from './bus/bus-service/bus-service.module';
import { BusStationModule } from './bus/bus-station/bus-station.module';
import { BusTemplateModule } from './bus/bus-template/bus-template.module';
import { BusTypeModule } from './bus/bus-type/bus-type.module';
import { BusModule } from './bus/bus/bus.module';
import { CounterModule } from './counter/counter.module';
import { FileFolderModule } from './file/file-folder/file-folder.module';
import { FileModule } from './file/file/file.module';
import { GoodsCategoryModule } from './goods/good-category/goods-category.module';
import { GoodsModule } from './goods/goods/goods.module';
import { NotificationModule } from './notification/notification.module';
import { PromotionModule } from './promotion/promotion.module';
import { SeatTypeModule } from './seat/seat-type/seat-type.module';
import { UserModule } from './user/user/user.module';
import { TenantModule } from './tenant/tenant.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { TenantSubscriptionModule } from './tenant-subscription/tenant-subscription.module';
import { TenantSubscriptionUsageModule } from './tenant-subscription-usage/tenant-subscription-usage.module';
import { SettingsModule } from './settings/settings.module';
import { ReportModule } from './report/report.module';
import { TrackingModule } from './tracking/tracking.module';
import { AutoJobTrackingModule } from './auto-job-tracking';
import { WidgetBlocksModule } from './widget-blocks/widget-blocks.module';
import { DriverModule } from './user/driver/driver.module';

@Module({
  imports: [
    BusTypeModule,
    BusProvinceModule,
    BusStationModule,
    BusServiceModule,
    FileModule,
    BusRouteModule,
    BusScheduleModule,
    BusScheduleTemplateModule,
    BusScheduleLayoutModule,
    BusLayoutTemplateModule,
    UserModule,
    AuthModule,
    BusModule,
    BusTemplateModule,
    SeatTypeModule,
    BookingModule,
    PaymentModule,
    PaymentMethodModule,
    NotificationModule,
    FileFolderModule,
    CounterModule,
    BusScheduleAutogeneratorModule,
    DriverModule,
    GoodsModule,
    GoodsCategoryModule,
    InterceptorModule,
    PromotionModule,
    SubscriptionModule,
    TenantModule,
    TenantSubscriptionModule,
    TenantSubscriptionUsageModule,
    SettingsModule,
    ReportModule,
    TrackingModule,
    AutoJobTrackingModule,
    WidgetBlocksModule,
  ],
  exports: [
    BusTypeModule,
    BusProvinceModule,
    BusStationModule,
    BusServiceModule,
    FileModule,
    BusRouteModule,
    BusScheduleModule,
    BusScheduleTemplateModule,
    BusScheduleLayoutModule,
    BusLayoutTemplateModule,
    UserModule,
    AuthModule,
    BusModule,
    BusTemplateModule,
    SeatTypeModule,
    BookingModule,
    PaymentModule,
    PaymentMethodModule,
    NotificationModule,
    FileFolderModule,
    CounterModule,
    BusScheduleAutogeneratorModule,
    DriverModule,
    GoodsModule,
    GoodsCategoryModule,
    InterceptorModule,
    PromotionModule,
    SubscriptionModule,
    TenantModule,
    TenantSubscriptionModule,
    TenantSubscriptionUsageModule,
    SettingsModule,
    ReportModule,
    TrackingModule,
    AutoJobTrackingModule,
    WidgetBlocksModule,
  ],
})
export class CoreModule {}
