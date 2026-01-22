import { PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';
import { CreateFileFolderDto } from './create-file-folderdto';

export class UpdateFileFolderDto extends PartialType(CreateFileFolderDto) {
  readonly _id: Types.ObjectId;
}
