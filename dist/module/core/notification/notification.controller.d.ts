import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notificationdto';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    create(createNotificationDto: CreateNotificationDto, user: UserTokenDto): Promise<import("./dto/notification.dto").NotificationDto | null>;
    findAll(user: UserTokenDto): Promise<Notification[] | null>;
}
