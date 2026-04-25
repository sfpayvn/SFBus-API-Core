import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WidgetBlocksController } from './widget-blocks.controller';
import { WidgetBlocksService } from './widget-blocks.service';
import { WidgetBlockDocument, WidgetBlockSchema } from './schemas/widget-block.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: WidgetBlockDocument.name, schema: WidgetBlockSchema }])],
  controllers: [WidgetBlocksController],
  providers: [WidgetBlocksService],
  exports: [WidgetBlocksService],
})
export class WidgetBlocksModule {}
