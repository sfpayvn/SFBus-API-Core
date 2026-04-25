import { Model, Types } from 'mongoose';
import { SubscriptionDto, SearchSubscriptionsRes, SearchSubscriptionQuerySortFilter } from './dto/subscription.dto';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { SubscriptionDocument } from './schema/subscription.schema';
export declare class SubscriptionService {
    private readonly subscriptionModel;
    constructor(subscriptionModel: Model<SubscriptionDocument>);
    create(dto: CreateSubscriptionDto): Promise<SubscriptionDto>;
    findAll(): Promise<SubscriptionDto[]>;
    findAllAvailable(): Promise<SubscriptionDto[]>;
    findOne(id: Types.ObjectId): Promise<SubscriptionDto>;
    findPopular(): Promise<SubscriptionDto>;
    update(dto: UpdateSubscriptionDto): Promise<SubscriptionDto>;
    delete(id: Types.ObjectId): Promise<boolean>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: SearchSubscriptionQuerySortFilter, filters: SearchSubscriptionQuerySortFilter[]): Promise<SearchSubscriptionsRes>;
    buildQuerySearchSubscriptions(pageIdx: number, pageSize: number, keyword: string, sortBy: SearchSubscriptionQuerySortFilter, filters: SearchSubscriptionQuerySortFilter[]): Promise<any>;
}
