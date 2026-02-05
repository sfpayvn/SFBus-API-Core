import { GoodsDocument, GoodsSchema } from '@/module/core/goods/goods/schema/goods.schema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminGoodsService } from './admin-goods-service';
import { AdminGoodsController } from './admin-goods.controller';
import { GoodsModule } from '@/module/core/goods/goods/goods.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: GoodsDocument.name, schema: GoodsSchema }]),
    forwardRef(() => GoodsModule),
  ],
  providers: [AdminGoodsService],
  controllers: [AdminGoodsController],
  exports: [AdminGoodsService],
})
export class AdminGoodsModule {}
