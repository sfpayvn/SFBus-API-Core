import { Types } from 'mongoose';
import { CreateSubscriptionDto } from '../../core/subscription/dto/create-subscription.dto';
import { UpdateSubscriptionDto } from '../../core/subscription/dto/update-subscription.dto';
import { AdminSubscriptionService } from './admin-subscription.service';
import { AdminSearchSubscriptionQuery } from './dto/admin-subscription.dto';
export declare class AdminSubscriptionController {
    private readonly adminSubscriptionService;
    constructor(adminSubscriptionService: AdminSubscriptionService);
    create(createSubscriptionDto: CreateSubscriptionDto): Promise<import("../../core/subscription/dto/subscription.dto").SubscriptionDto>;
    update(updateSubscriptionDto: UpdateSubscriptionDto): Promise<import("../../core/subscription/dto/subscription.dto").SubscriptionDto>;
    remove(id: Types.ObjectId): Promise<boolean>;
    findOne(id: Types.ObjectId): Promise<import("../../core/subscription/dto/subscription.dto").SubscriptionDto>;
    findAll(): Promise<import("../../core/subscription/dto/subscription.dto").SubscriptionDto[]>;
    findAllAvailable(): Promise<import("../../core/subscription/dto/subscription.dto").SubscriptionDto[]>;
    search(query: AdminSearchSubscriptionQuery): Promise<import("./dto/admin-subscription.dto").AdminSearchSubscriptionsRes>;
}
