// notification.module.ts
import { NotificationDocument, NotificationSchema } from '@/module/core/notification/schema/notificationschema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientNotificationController } from './client-notification.controller';
import { ClientNotificationGateway } from './client-notification.gateway';
import { ClientNotificationService } from './client-notification.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: NotificationDocument.name, schema: NotificationSchema }])],
  controllers: [ClientNotificationController],
  providers: [ClientNotificationService, ClientNotificationGateway],
  exports: [ClientNotificationService], // Export ClientNotificationService d? c�c module kh�c c� th? s? d?ng
})
export class ClientNotificationModule {}
