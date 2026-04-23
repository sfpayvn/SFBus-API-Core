import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';
import { UserDto } from '../../user/user/dto/user.dto';
import { UserService } from '../../user/user/user.service';
import { TenantService } from '../../tenant/tenant.service';
import { AuthRescueService } from '../auth-rescue/auth-rescue.service';
import { SettingsService } from '../../settings/settings.service';
export declare class AuthService {
    private readonly userService;
    private readonly tenantService;
    private readonly authRescueService;
    private readonly settingsService;
    private jwtService;
    private readonly resetJwt;
    private FRONTEND_RESET_URL;
    constructor(userService: UserService, tenantService: TenantService, authRescueService: AuthRescueService, settingsService: SettingsService, jwtService: JwtService, resetJwt: JwtService);
    validateUser(phoneNumber: string, password: string, tenantCode: string): Promise<any>;
    login(user: UserDto): Promise<{
        access_token: string;
    }>;
    verifyPhoneNumber(phoneNumber: string): Promise<any>;
    validateOtp(userId: Types.ObjectId, tenantId: Types.ObjectId, otp: string): Promise<boolean>;
    forgotPassword(phoneNumber: string, tenantCode: string, redirectBaseUrl?: string): Promise<{
        ok: string;
    }>;
    createForgotPasswordToken(identifier: string, tenantCode: string): Promise<string | {
        ok: boolean;
    }>;
    resetPassword(token: string, newPassword: string): Promise<{
        ok: boolean;
    }>;
    logout(userId: Types.ObjectId, tenantId: Types.ObjectId): Promise<{
        ok: boolean;
    }>;
    forceLogoutUser(userId: Types.ObjectId, tenantId: Types.ObjectId): Promise<{
        ok: boolean;
        message?: string;
    }>;
}
