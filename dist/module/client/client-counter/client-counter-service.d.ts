import { CounterDocument } from '@/module/core/counter/schema/counter.schema';
import { Model } from 'mongoose';
export declare class ClientCounterService {
    private readonly counterModel;
    constructor(counterModel: Model<CounterDocument>);
}
