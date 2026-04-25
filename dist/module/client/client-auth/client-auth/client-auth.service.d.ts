import { JwtService } from '@nestjs/jwt';
import { ClientUserService } from '../../client-user/client-user-main/client-user.service';
import { ClientUserDto } from '../../client-user/client-user-main/dto/client-user.dto';
import { ClientTenantService } from '../../client-tenant/client-tenant.service';
import { AuthService } from '@/module/core/auth/auth/auth.service';
import { Types } from 'mongoose';
import { ClientAuthRescueService } from '../client-auth-rescue/client-auth-rescue.service';
import { ClientUpdatePasswordUserDto } from '../../client-user/client-user-main/dto/client-update-user.dto';
import { SettingsService } from '@/module/core/settings/settings.service';
export declare class ClientAuthService {
    private readonly clientUserService;
    private readonly clientTenantService;
    private readonly authService;
    private readonly clientAuthRescueService;
    private readonly settingsService;
    private jwtService;
    constructor(clientUserService: ClientUserService, clientTenantService: ClientTenantService, authService: AuthService, clientAuthRescueService: ClientAuthRescueService, settingsService: SettingsService, jwtService: JwtService);
    login(clientUser: ClientUserDto): Promise<{
        access_token: string;
    }>;
    signUp(phoneNumber: string, tenantCode: string): Promise<{
        phoneNumber: string;
    }>;
    verifyPhoneNumber(phoneNumber: string, tenantCode: string): Promise<any>;
    verifyForgotPasswordOtp(identifier: string, tenantCode: string, purpose: string, token: string): Promise<{
        token: string | {
            ok: boolean;
        };
    } | null>;
    forgotPassword(phoneNumber: string, redirectBaseUrl?: string): Promise<{
        ok: string;
    }>;
    resetPassword(token: string, newPassword: string): Promise<{
        ok: boolean;
    }>;
    updatePassword(userId: Types.ObjectId, clientUpdatePasswordUserDto: ClientUpdatePasswordUserDto, tenantId: Types.ObjectId): Promise<ClientUserDto>;
    getCurrentUser(userId: Types.ObjectId, tenantId: Types.ObjectId, tokenVersion?: number): Promise<ClientUserDto>;
}
