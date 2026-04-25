// notification.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { NotificationGateway } from './notification.gateway';
import { NotificationDocument, NotificationSchema } from './schema/notificationschema';

@Module({
  imports: [MongooseModule.forFeature([{ name: NotificationDocument.name, schema: NotificationSchema }])],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationGateway],
  exports: [NotificationService], // Export NotificationService để các module khác có thể sử dụng
})
export class NotificationModule {}
