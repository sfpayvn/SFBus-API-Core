import { JwtService } from '@nestjs/jwt';
import { DriverUserService } from '../../driver-user/driver-user-main/driver-user.service';
import { DriverUserDto } from '../../driver-user/driver-user-main/dto/driver-user.dto';
import { DriverTenantService } from '../../driver-tenant/driver-tenant.service';
import { AuthService } from '@/module/core/auth/auth/auth.service';
import { Types } from 'mongoose';
import { DriverAuthRescueService } from '../driver-auth-rescue/driver-auth-rescue.service';
import { DriverUpdatePasswordUserDto } from '../../driver-user/driver-user-main/dto/driver-update-user.dto';
import { SettingsService } from '@/module/core/settings/settings.service';
export declare class DriverAuthService {
    private readonly driverUserService;
    private readonly driverTenantService;
    private readonly authService;
    private readonly driverAuthRescueService;
    private readonly settingsService;
    private jwtService;
    constructor(driverUserService: DriverUserService, driverTenantService: DriverTenantService, authService: AuthService, driverAuthRescueService: DriverAuthRescueService, settingsService: SettingsService, jwtService: JwtService);
    login(driverUser: DriverUserDto): Promise<{
        access_token: string;
    }>;
    verifyPhoneNumber(phoneNumber: string): Promise<any>;
    verifyForgotPasswordOtp(identifier: string, tenantCode: string, purpose: string, token: string): Promise<{
        token: string | {
            ok: boolean;
        };
    } | null>;
    forgotPassword(phoneNumber: string, tenantCode: string, redirectBaseUrl?: string): Promise<{
        ok: string;
    }>;
    resetPassword(token: string, newPassword: string): Promise<{
        ok: boolean;
    }>;
    updatePassword(userId: Types.ObjectId, driverUpdatePasswordUserDto: DriverUpdatePasswordUserDto, tenantId: Types.ObjectId): Promise<DriverUserDto>;
    getCurrentUser(userId: Types.ObjectId, tenantId: Types.ObjectId, tokenVersion?: number): Promise<DriverUserDto>;
}
