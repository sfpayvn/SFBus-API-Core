// driver.module.ts

import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientDriverService } from './client-driver.service';
import { ClientDriverController } from './client-driver.controller';
import { ClientUserModule } from '../client-user-main/client-user.module';
import { DriverModule } from '@/module/core/user/driver/driver.module';
import { DriverDocument, DriverSchema } from '@/module/core/user/driver/schema/driver.schema';

@Module({
  imports: [
    forwardRef(() => DriverModule),
    forwardRef(() => ClientUserModule),
    MongooseModule.forFeature([{ name: DriverDocument.name, schema: DriverSchema }]),
  ],
  providers: [ClientDriverService],
  controllers: [ClientDriverController],
  exports: [ClientDriverService],
})
export class ClientDriverModule {}
