import { AuthRescueService } from '@/module/core/auth/auth-rescue/auth-rescue.service';
import { AuthRescueDocument } from '@/module/core/auth/auth-rescue/schema/auth-rescue.schema';
import { Model, Types } from 'mongoose';
import { DriverTenantService } from '../../driver-tenant/driver-tenant.service';
import { DriverUserService } from '../../driver-user/driver-user-main/driver-user.service';
import { JwtService } from '@nestjs/jwt';
export declare class DriverAuthRescueService {
    private authRescueModel;
    private readonly authRescueService;
    private readonly driverTenantService;
    private readonly driverUserService;
    private jwtService;
    constructor(authRescueModel: Model<AuthRescueDocument>, authRescueService: AuthRescueService, driverTenantService: DriverTenantService, driverUserService: DriverUserService, jwtService: JwtService);
    requestAuthRescue(identifier: string, purpose: string, tenantId: Types.ObjectId): Promise<{
        expiresAt: Date;
        debugToken: string;
    }>;
    verifyAuthRescue(identifier: string, purpose: string, token: string, tenantId: Types.ObjectId): Promise<boolean>;
}
