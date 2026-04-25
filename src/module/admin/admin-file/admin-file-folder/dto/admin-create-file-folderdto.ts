import { OmitType } from '@nestjs/mapped-types';
import { AdminFileFolderDto } from './admin-file-folder.dto';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class AdminCreateFileFolderDto {
  @IsNotEmpty()
  @Type(() => String)
  name: string;
}
