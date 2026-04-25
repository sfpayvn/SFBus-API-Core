import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { ClientCounterService } from './client-counter-service';

@Controller('client/counter')
export class ClientCounterController {
  constructor(private readonly ClientCounterService: ClientCounterService) {}
}
