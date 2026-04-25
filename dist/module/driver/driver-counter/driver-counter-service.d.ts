import { CounterDocument } from '@/module/core/counter/schema/counter.schema';
import { Model } from 'mongoose';
export declare class DriverCounterService {
    private readonly counterModel;
    constructor(counterModel: Model<CounterDocument>);
}
