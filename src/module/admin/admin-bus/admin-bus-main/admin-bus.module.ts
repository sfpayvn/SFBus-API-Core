import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminBusController } from './admin-bus.controller';
import { AdminBusService } from './admin-bus.service';
import { BusDocument, BusSchema } from '@/module/core/bus/bus/schema/bus.schema';
import { BusModule } from '@/module/core/bus/bus/bus.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: BusDocument.name, schema: BusSchema }]), forwardRef(() => BusModule)],
  controllers: [AdminBusController],
  providers: [AdminBusService],
  exports: [AdminBusService],
})
export class AdminBusModule {}
