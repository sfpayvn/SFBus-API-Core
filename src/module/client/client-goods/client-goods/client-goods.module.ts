import { GoodsDocument, GoodsSchema } from '@/module/core/goods/goods/schema/goods.schema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientGoodsService } from './client-goods-service';
import { ClientGoodsController } from './client-goods.controller';
import { GoodsModule } from '@/module/core/goods/goods/goods.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: GoodsDocument.name, schema: GoodsSchema }]),
    forwardRef(() => GoodsModule),
  ],
  providers: [ClientGoodsService],
  controllers: [ClientGoodsController],
  exports: [ClientGoodsService],
})
export class ClientGoodsModule {}
