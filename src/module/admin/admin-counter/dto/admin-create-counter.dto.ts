import { Types } from 'mongoose';
import { OmitType } from '@nestjs/mapped-types';
import { AdminFileDto } from '../../admin-file/admin-file-main/dto/admin-file.dto';

export class AdminCreateCounterDto extends OmitType(AdminFileDto, ['_id', 'createdAt', 'updatedAt', '__v'] as const) {}
