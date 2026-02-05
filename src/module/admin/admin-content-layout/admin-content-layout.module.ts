import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminContentLayoutService } from './admin-content-layout.service';
import { AdminContentLayoutController } from './admin-content-layout.controller';
import { ContentLayoutDocument, ContentLayoutSchema } from '@/module/core/content-layout/schemas/content-layout.schema';
import { ContentLayoutModule } from '@/module/core/content-layout/content-layout.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ContentLayoutDocument.name, schema: ContentLayoutSchema }]),
    forwardRef(() => ContentLayoutModule),
  ],
  providers: [AdminContentLayoutService],
  controllers: [AdminContentLayoutController],
  exports: [AdminContentLayoutService],
})
export class AdminContentLayoutModule {}
