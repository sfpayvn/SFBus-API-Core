import { TenantSubscriptionService } from './tenant-subscription.service';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { RegisterSubscriptionDto } from './dto/tenant-subscription.dto';
export declare class TenantSubscriptionController {
    private svc;
    constructor(svc: TenantSubscriptionService);
    register(dto: RegisterSubscriptionDto, user: UserTokenDto): Promise<import("./dto/tenant-subscription.dto").TenantSubscriptionDto>;
}
