import { Types } from 'mongoose';
import { SubscriptionService } from '../../core/subscription/subscription.service';
import { CreateSubscriptionDto } from '../../core/subscription/dto/create-subscription.dto';
import { UpdateSubscriptionDto } from '../../core/subscription/dto/update-subscription.dto';
import { AdminSearchSubscriptionQuerySortFilter, AdminSearchSubscriptionsRes } from './dto/admin-subscription.dto';
export declare class AdminSubscriptionService {
    private readonly subscriptionService;
    constructor(subscriptionService: SubscriptionService);
    create(createSubscriptionDto: CreateSubscriptionDto): Promise<import("../../core/subscription/dto/subscription.dto").SubscriptionDto>;
    update(updateSubscriptionDto: UpdateSubscriptionDto): Promise<import("../../core/subscription/dto/subscription.dto").SubscriptionDto>;
    delete(id: Types.ObjectId): Promise<boolean>;
    findAllAvailable(): Promise<import("../../core/subscription/dto/subscription.dto").SubscriptionDto[]>;
    findAll(): Promise<import("../../core/subscription/dto/subscription.dto").SubscriptionDto[]>;
    findOne(id: Types.ObjectId): Promise<import("../../core/subscription/dto/subscription.dto").SubscriptionDto>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: AdminSearchSubscriptionQuerySortFilter, filters: AdminSearchSubscriptionQuerySortFilter[]): Promise<AdminSearchSubscriptionsRes>;
}
