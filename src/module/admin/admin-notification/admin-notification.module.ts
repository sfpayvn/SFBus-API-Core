// notification.module.ts
import { NotificationDocument, NotificationSchema } from '@/module/core/notification/schema/notificationschema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminNotificationController } from './admin-notification.controller';
import { AdminNotificationGateway } from './admin-notification.gateway';
import { AdminNotificationService } from './admin-notification.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: NotificationDocument.name, schema: NotificationSchema }])],
  controllers: [AdminNotificationController],
  providers: [AdminNotificationService, AdminNotificationGateway],
  exports: [AdminNotificationService], // Export AdminNotificationService để các module khác có thể sử dụng
})
export class AdminNotificationModule {}
