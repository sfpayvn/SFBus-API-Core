import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CounterDocument } from './schema/counter.schema';

@Injectable()
export class CounterService {
  constructor(@InjectModel(CounterDocument.name) private readonly counterModel: Model<CounterDocument>) {}

  async getNextSeatNumber(tenantId: Types.ObjectId): Promise<number> {
    const counter = await this.counterModel
      .findOneAndUpdate({ tenantId }, { $inc: { seatCounter: 1 } }, { new: true, upsert: true })
      .lean()
      .exec();

    if (!counter) {
      throw new NotFoundException('Counter not found.');
    }

    return counter.seatCounter;
  }
}
