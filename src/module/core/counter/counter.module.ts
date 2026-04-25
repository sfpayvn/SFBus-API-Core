import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CounterService } from './counter-service';
import { CounterDocument, CounterSchema } from './schema/counter.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: CounterDocument.name, schema: CounterSchema }])],
  providers: [CounterService],
  exports: [CounterService],
})
export class CounterModule {}
