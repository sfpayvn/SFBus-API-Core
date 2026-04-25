import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { AdminCounterService } from './admin-counter-service';

@Controller('admin/counter')
export class AdminCounterController {
  constructor(private readonly AdminCounterService: AdminCounterService) {}
}
