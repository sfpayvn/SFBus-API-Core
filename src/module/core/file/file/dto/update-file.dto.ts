import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateFileDto {
  @IsNotEmpty()
  @Type(() => String)
  _id: string;

  @IsNotEmpty()
  @Type(() => String)
  filename: string;

  @IsOptional()
  @Type(() => String)
  folderId: string;

  @IsOptional()
  @Type(() => Boolean)
  isFavorite: boolean = false;
}
