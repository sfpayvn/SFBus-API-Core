// notification.service.ts
import { NotificationDocument } from '@/module/core/notification/schema/notificationschema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientNotificationGateway } from './client-notification.gateway';

@Injectable()
export class ClientNotificationService {
  constructor(
    @InjectModel(NotificationDocument.name) private notificationModel: Model<NotificationDocument>,
    private readonly ClientNotificationGateway: ClientNotificationGateway,
  ) {}
}
