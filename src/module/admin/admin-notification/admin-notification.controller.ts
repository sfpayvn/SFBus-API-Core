import { Controller, Get, Post, Body } from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { AdminNotificationService } from './admin-notification.service';

@Controller('notifications')
export class AdminNotificationController {
  constructor(private readonly AdminNotificationService: AdminNotificationService) {}
}
