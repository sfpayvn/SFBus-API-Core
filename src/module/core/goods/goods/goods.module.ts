import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GoodsService } from './goods-service';
import { GoodsDocument, GoodsSchema } from './schema/goods.schema';
import { GoodsController } from './goods.controller';
import { GoodsCategoryModule } from '../good-category/goods-category.module';
import { BusScheduleModule } from '../../bus/bus-schedule/bus-schedule.module';
import { BusRouteModule } from '../../bus/bus-route/bus-route.module';
import { GoodsGateway } from './good.gateway';
import { FileModule } from '../../file/file/file.module';
import { PaymentModule } from '../../payment/payment.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: GoodsDocument.name, schema: GoodsSchema }]),
    forwardRef(() => BusScheduleModule),
    forwardRef(() => BusRouteModule),
    forwardRef(() => GoodsCategoryModule),
    forwardRef(() => FileModule),
    forwardRef(() => PaymentModule),
  ],
  providers: [GoodsService, GoodsGateway],
  controllers: [GoodsController],
  exports: [GoodsService],
})
export class GoodsModule {}
