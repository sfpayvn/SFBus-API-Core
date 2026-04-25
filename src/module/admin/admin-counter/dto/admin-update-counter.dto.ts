import { PartialType } from '@nestjs/mapped-types';
import { AdminCreateCounterDto } from './admin-create-counter.dto';

export class AdminUpdateCounterDto extends PartialType(AdminCreateCounterDto) {}
