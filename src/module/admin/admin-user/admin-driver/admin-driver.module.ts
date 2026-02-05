// driver.module.ts

import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminDriverService } from './admin-driver.service';
import { AdminDriverController } from './admin-driver.controller';
import { DriverDocument, DriverSchema } from '@/module/core/user/driver/schema/driver.schema';
import { AdminUserMainModule } from '../admin-user-main/admin-user-main.module';
import { DriverModule } from '@/module/core/user/driver/driver.module';

@Module({
  imports: [
    forwardRef(() => DriverModule),
    forwardRef(() => AdminUserMainModule),
    forwardRef(() => DriverModule),
    MongooseModule.forFeature([{ name: DriverDocument.name, schema: DriverSchema }]),
  ],
  providers: [AdminDriverService],
  controllers: [AdminDriverController],
  exports: [AdminDriverService],
})
export class AdminDriverModule {}
