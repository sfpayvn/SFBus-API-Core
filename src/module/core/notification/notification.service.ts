// notification.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { NotificationGateway } from './notification.gateway';
import { NotificationDocument } from './schema/notificationschema';
import { NotificationDto } from './dto/notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(NotificationDocument.name) private notificationModel: Model<NotificationDocument>,
    private readonly notificationGateway: NotificationGateway,
  ) {}

  async create(notificationDto: any, tenantId: Types.ObjectId): Promise<NotificationDto | null> {
    const createdNotification = new this.notificationModel({ ...notificationDto, tenantId });
    const notification = await createdNotification.save();
    this.notificationGateway.notifyChange(notification);
    return null;
  }

  async findAll(tenantId: Types.ObjectId): Promise<Notification[] | null> {
    return null;
    // return this.notificationModel.find({ tenantId }).lean().exec();
  }
}
