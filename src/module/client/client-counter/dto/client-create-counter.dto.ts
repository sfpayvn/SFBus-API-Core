import { Types } from 'mongoose';
import { OmitType } from '@nestjs/mapped-types';
import { ClientFileDto } from '../../client-file/client-file-main/dto/client-file.dto';

export class ClientCreateCounterDto extends OmitType(ClientFileDto, [
  '_id',
  'createdAt',
  'updatedAt',
  '__v',
] as const) {}
