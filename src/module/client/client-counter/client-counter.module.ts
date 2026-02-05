import { CounterDocument, CounterSchema } from '@/module/core/counter/schema/counter.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientCounterService } from './client-counter-service';

@Module({
  imports: [MongooseModule.forFeature([{ name: CounterDocument.name, schema: CounterSchema }])],
  providers: [ClientCounterService],
  exports: [ClientCounterService],
})
export class ClientCounterModule {}
