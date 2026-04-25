import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { Types } from 'mongoose';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { SearchSubscriptionQuery } from './dto/subscription.dto';
export declare class SubscriptionController {
    private readonly subscriptionService;
    constructor(subscriptionService: SubscriptionService);
    create(dto: CreateSubscriptionDto, user: UserTokenDto): Promise<import("./dto/subscription.dto").SubscriptionDto>;
    update(dto: UpdateSubscriptionDto, user: UserTokenDto): Promise<import("./dto/subscription.dto").SubscriptionDto>;
    findOne(id: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/subscription.dto").SubscriptionDto>;
    findAll(user: UserTokenDto): Promise<import("./dto/subscription.dto").SubscriptionDto[]>;
    delete(id: Types.ObjectId, user: UserTokenDto): Promise<boolean>;
    search(query: SearchSubscriptionQuery): Promise<import("./dto/subscription.dto").SearchSubscriptionsRes>;
}
