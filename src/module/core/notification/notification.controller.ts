import { Controller, Get, Post, Body } from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notificationdto';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async create(
    @Body(ParseObjectIdPipe) createNotificationDto: CreateNotificationDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.notificationService.create(createNotificationDto, tenantId);
  }

  @Get()
  async findAll(@CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.notificationService.findAll(tenantId);
  }
}
