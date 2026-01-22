import { Module } from '@nestjs/common';
import { FileFolderService } from './file-folder.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FileFolderController } from './file-folder.controller';
import { FileFolderDocument, FileFolderSchema } from './schema/file-folder.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: FileFolderDocument.name, schema: FileFolderSchema }])],
  controllers: [FileFolderController],
  providers: [FileFolderService],
  exports: [FileFolderService],
})
export class FileFolderModule {}
