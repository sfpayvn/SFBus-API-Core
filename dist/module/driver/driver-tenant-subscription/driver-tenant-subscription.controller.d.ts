import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { DriverRegisterSubscriptionDto, DriverRegisterSubscriptionForTenantDto, DriverSearchTenantSubscriptionQuery } from './dto/driver-tenant-subscription.dto';
import { DriverTenantSubscriptionService } from './driver-tenant-subscription.service';
export declare class DriverTenantSubscriptionController {
    private DriverTenantSubscriptionService;
    constructor(DriverTenantSubscriptionService: DriverTenantSubscriptionService);
    register(DriverRegisterSubscriptionDto: DriverRegisterSubscriptionDto, user: UserTokenDto): Promise<import("./dto/driver-tenant-subscription.dto").DriverTenantSubscriptionDto>;
    registerForTenant(dto: DriverRegisterSubscriptionForTenantDto): Promise<import("./dto/driver-tenant-subscription.dto").DriverTenantSubscriptionDto>;
    search(query: DriverSearchTenantSubscriptionQuery): Promise<import("./dto/driver-tenant-subscription.dto").DriverSearchTenantSubscriptionRes>;
}
