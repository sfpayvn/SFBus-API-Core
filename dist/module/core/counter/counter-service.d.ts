import { Model, Types } from 'mongoose';
import { CounterDocument } from './schema/counter.schema';
export declare class CounterService {
    private readonly counterModel;
    constructor(counterModel: Model<CounterDocument>);
    getNextSeatNumber(tenantId: Types.ObjectId): Promise<number>;
}
