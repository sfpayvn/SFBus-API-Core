import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { AdminRegisterSubscriptionDto, AdminRegisterSubscriptionForTenantDto, AdminSearchTenantSubscriptionQuery } from './dto/admin-tenant-subscription.dto';
import { AdminTenantSubscriptionService } from './admin-tenant-subscription.service';
export declare class AdminTenantSubscriptionController {
    private adminTenantSubscriptionService;
    constructor(adminTenantSubscriptionService: AdminTenantSubscriptionService);
    register(adminRegisterSubscriptionDto: AdminRegisterSubscriptionDto, user: UserTokenDto): Promise<import("./dto/admin-tenant-subscription.dto").AdminTenantSubscriptionDto>;
    registerForTenant(dto: AdminRegisterSubscriptionForTenantDto): Promise<import("./dto/admin-tenant-subscription.dto").AdminTenantSubscriptionDto>;
    search(query: AdminSearchTenantSubscriptionQuery): Promise<import("./dto/admin-tenant-subscription.dto").AdminSearchTenantSubscriptionRes>;
    searchMySubscriptions(query: AdminSearchTenantSubscriptionQuery, user: UserTokenDto): Promise<import("./dto/admin-tenant-subscription.dto").AdminSearchTenantSubscriptionRes>;
}
