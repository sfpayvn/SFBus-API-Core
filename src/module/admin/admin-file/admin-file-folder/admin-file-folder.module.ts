import { FileFolderDocument, FileFolderSchema } from '@/module/core/file/file-folder/schema/file-folder.schema';
import { FileFolderModule } from '@/module/core/file/file-folder/file-folder.module';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminFileFolderController } from './admin-file-folder.controller';
import { AdminFileFolderService } from './admin-file-folder.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: FileFolderDocument.name, schema: FileFolderSchema }]),
    forwardRef(() => FileFolderModule),
  ],
  controllers: [AdminFileFolderController],
  providers: [AdminFileFolderService],
  exports: [AdminFileFolderService],
})
export class AdminFileFolderModule {}
