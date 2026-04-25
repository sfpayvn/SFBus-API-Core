import {
  GoodsCategoryDocument,
  GoodsCategorySchema,
} from '@/module/core/goods/good-category/schema/goods.-categoryschema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminGoodsCategoryService } from './admin-goods-category-service';
import { AdminGoodsCategoryController } from './admin-goods-category.controller';
import { GoodsCategoryModule } from '@/module/core/goods/good-category/goods-category.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: GoodsCategoryDocument.name, schema: GoodsCategorySchema }]),
    forwardRef(() => GoodsCategoryModule),
  ],
  providers: [AdminGoodsCategoryService],
  controllers: [AdminGoodsCategoryController],
  exports: [AdminGoodsCategoryService],
})
export class AdminGoodsCategoryModule {}
