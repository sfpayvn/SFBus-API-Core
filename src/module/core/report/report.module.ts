import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { BookingDocument, BookingSchema } from '../booking/schema/booking.schema';
import { TrackingDocument, TrackingSchema } from '../tracking/schema/tracking.schema';
import { PaymentMethodDocument, PaymentMethodSchema } from '../payment-method/schema/payment-method.schema';
import { BusRouteDocument, BusRouteSchema } from '../bus/bus-route/schema/bus-route.schema';
import { BusScheduleDocument, BusScheduleSchema } from '../bus/bus-schedule/schema/bus-schedule.schema';
import { GoodsDocument, GoodsSchema } from '../goods/goods/schema/goods.schema';
import { PaymentDocument, PaymentSchema } from '../payment/schema/payment.schema';
import { BusScheduleModule } from '../bus/bus-schedule/bus-schedule.module';
import { BusRouteModule } from '../bus/bus-route/bus-route.module';
import { ReportDateHelperService } from './helpers/report-date-helper.service';
import { ReportComparisonHelperService } from './helpers/report-comparison-helper.service';
import { ReportDetailHelperService } from './helpers/report-detail-helper.service';
import { ReportChartHelperService } from './helpers/report-chart-helper.service';
import { ReportBookingService } from './services/report-booking.service';
import { ReportGoodsService } from './services/report-goods.service';
import { ReportPaymentService } from './services/report-payment.service';
import { ReportScheduleService } from './services/report-schedule.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BookingDocument.name, schema: BookingSchema },
      { name: TrackingDocument.name, schema: TrackingSchema },
      { name: PaymentMethodDocument.name, schema: PaymentMethodSchema },
      { name: BusRouteDocument.name, schema: BusRouteSchema },
      { name: BusScheduleDocument.name, schema: BusScheduleSchema },
      { name: GoodsDocument.name, schema: GoodsSchema },
      { name: PaymentDocument.name, schema: PaymentSchema },
    ]),
    forwardRef(() => BusScheduleModule),
    forwardRef(() => BusRouteModule),
  ],
  controllers: [ReportController],
  providers: [
    ReportService,
    // Helper services
    ReportDateHelperService,
    ReportComparisonHelperService,
    ReportDetailHelperService,
    ReportChartHelperService,
    // Module services
    ReportBookingService,
    ReportScheduleService,
    ReportGoodsService,
    ReportPaymentService,
  ],
  exports: [ReportService],
})
export class ReportModule {}
