import { Model, Types, Connection } from 'mongoose';
import { TenantSubscriptionDocument } from './schema/tenant-subscription.schema';
import { RegisterSubscriptionDto, SearchTenantSubscriptionQuerySortFilter, SearchTenantSubscriptionRes, TenantSubscriptionDto } from './dto/tenant-subscription.dto';
import { SubscriptionService } from '../subscription/subscription.service';
export declare class TenantSubscriptionService {
    private readonly tenantSubModel;
    private readonly subscriptionService;
    private readonly connection;
    constructor(tenantSubModel: Model<TenantSubscriptionDocument>, subscriptionService: SubscriptionService, connection: Connection);
    registerForTenant(tenantId: Types.ObjectId, dto: RegisterSubscriptionDto): Promise<TenantSubscriptionDto>;
    registerPopularSubscription(tenantId: Types.ObjectId): Promise<TenantSubscriptionDto>;
    getActive(tenantId: Types.ObjectId): Promise<(import("mongoose").Document<unknown, {}, TenantSubscriptionDocument> & TenantSubscriptionDocument & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    findByTenantId(tenantId: Types.ObjectId): Promise<TenantSubscriptionDto | null>;
    findAllByTenantId(tenantId: Types.ObjectId): Promise<TenantSubscriptionDto[]>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: SearchTenantSubscriptionQuerySortFilter, filters: SearchTenantSubscriptionQuerySortFilter[]): Promise<SearchTenantSubscriptionRes>;
    buildQuerySearchTenantSubscriptions(pageIdx: number, pageSize: number, keyword: string, sortBy: SearchTenantSubscriptionQuerySortFilter, filters: SearchTenantSubscriptionQuerySortFilter[]): Promise<any>;
}
