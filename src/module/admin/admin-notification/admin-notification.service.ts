// notification.service.ts
import { NotificationDocument } from '@/module/core/notification/schema/notificationschema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminNotificationGateway } from './admin-notification.gateway';

@Injectable()
export class AdminNotificationService {
  constructor(
    @InjectModel(NotificationDocument.name) private notificationModel: Model<NotificationDocument>,
    private readonly AdminNotificationGateway: AdminNotificationGateway,
  ) {}
}
