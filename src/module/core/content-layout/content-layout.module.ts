import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentLayoutController } from './content-layout.controller';
import { ContentLayoutService } from './content-layout.service';
import { ContentLayoutDocument, ContentLayoutSchema } from './schemas/content-layout.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: ContentLayoutDocument.name, schema: ContentLayoutSchema }])],
  controllers: [ContentLayoutController],
  providers: [ContentLayoutService],
  exports: [ContentLayoutService],
})
export class ContentLayoutModule {}
