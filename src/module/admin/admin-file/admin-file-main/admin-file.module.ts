import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminFileService } from './admin-file.service';
import { AdminUploadController } from './admin-file.controller';
import { FileDocument, FileSchema } from '@/module/core/file/file/schema/file.schema';
import { FileModule } from '@/module/core/file/file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forFeature([{ name: FileDocument.name, schema: FileSchema }]),
    forwardRef(() => FileModule),
  ],
  providers: [AdminFileService],
  controllers: [AdminUploadController],
})
export class AdminFileModule {}
