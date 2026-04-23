import { AuthRescueService } from '@/module/core/auth/auth-rescue/auth-rescue.service';
import { AuthRescueDocument } from '@/module/core/auth/auth-rescue/schema/auth-rescue.schema';
import { Model } from 'mongoose';
import { ClientUserService } from '../../client-user/client-user-main/client-user.service';
import { JwtService } from '@nestjs/jwt';
import { ClientTenantService } from '../../client-tenant/client-tenant.service';
export declare class ClientAuthRescueService {
    private authRescueModel;
    private readonly authRescueService;
    private readonly clientUserService;
    private readonly clientTenantService;
    private jwtService;
    constructor(authRescueModel: Model<AuthRescueDocument>, authRescueService: AuthRescueService, clientUserService: ClientUserService, clientTenantService: ClientTenantService, jwtService: JwtService);
    requestAuthRescue(identifier: string, tenantCode: string, purpose: string): Promise<{
        expiresAt: Date;
        debugToken: string;
    }>;
    verifyAuthRescueAndLogin(identifier: string, tenantCode: string, purpose: string, token: string): Promise<{
        access_token: string;
    } | undefined>;
    verifyAuthRescue(identifier: string, tenantCode: string, purpose: string, token: string): Promise<boolean>;
}
