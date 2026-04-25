// driver.module.ts

import { forwardRef, Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller'; // Thêm dòng này
import { MongooseModule } from '@nestjs/mongoose';
import { DriverDocument, DriverSchema } from './schema/driver.schema';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DriverDocument.name, schema: DriverSchema }]),
    forwardRef(() => UserModule),
  ],
  providers: [DriverService],
  controllers: [DriverController],
  exports: [DriverService, MongooseModule],
})
export class DriverModule {}
