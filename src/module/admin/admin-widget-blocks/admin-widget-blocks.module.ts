import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminWidgetBlocksService } from './admin-widget-blocks.service';
import { AdminWidgetBlocksController } from './admin-widget-blocks.controller';
import { WidgetBlockDocument, WidgetBlockSchema } from '@/module/core/widget-blocks/schemas/widget-block.schema';
import { WidgetBlocksModule } from '@/module/core/widget-blocks/widget-blocks.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: WidgetBlockDocument.name, schema: WidgetBlockSchema }]),
    forwardRef(() => WidgetBlocksModule),
  ],
  providers: [AdminWidgetBlocksService],
  controllers: [AdminWidgetBlocksController],
  exports: [AdminWidgetBlocksService],
})
export class AdminWidgetBlocksModule {}
