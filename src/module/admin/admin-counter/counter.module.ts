import { CounterDocument, CounterSchema } from '@/module/core/counter/schema/counter.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminCounterService } from './admin-counter-service';

@Module({
  imports: [MongooseModule.forFeature([{ name: CounterDocument.name, schema: CounterSchema }])],
  providers: [AdminCounterService],
  exports: [AdminCounterService],
})
export class AdminCounterModule {}
