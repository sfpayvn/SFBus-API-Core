import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GoodsCategoryService } from './goods-category-service';
import { GoodsCategoryDocument, GoodsCategorySchema } from './schema/goods.-categoryschema';
import { GoodsCategoryController } from './goods-category.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: GoodsCategoryDocument.name, schema: GoodsCategorySchema }])],
  providers: [GoodsCategoryService],
  controllers: [GoodsCategoryController],
  exports: [GoodsCategoryService],
})
export class GoodsCategoryModule {}
