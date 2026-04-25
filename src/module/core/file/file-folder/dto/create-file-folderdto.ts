import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateFileFolderDto {
  @IsNotEmpty()
  @Type(() => String)
  name: string;
}
