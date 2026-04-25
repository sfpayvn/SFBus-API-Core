import { PartialType } from '@nestjs/mapped-types';
import { ClientCreateCounterDto } from './client-create-counter.dto';

export class ClientUpdateCounterDto extends PartialType(ClientCreateCounterDto) {}
