import { AdminForgotPasswordDto, AdminResetPasswordDto, AdminSignUpDto } from './dto/admin-auth.dto';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { AdminAuthService } from './admin-auth.service';
import { AdminUpdatePasswordUserDto } from '../../admin-user/admin-user-main/dto/admin-update-user.dto';
export declare class AuthController {
    private adminAuthService;
    constructor(adminAuthService: AdminAuthService);
    login(req: any, timezoneOffset: number): Promise<{
        access_token: string;
    }>;
    signUp(adminSignUpDto: AdminSignUpDto): Promise<{
        access_token: string;
    }>;
    verifyPhoneNumber(phoneNumber: string): Promise<string>;
    validateToken(req: any): Promise<{
        valid: boolean;
        user: any;
    }>;
    forgotPassword(adminForgotPasswordDto: AdminForgotPasswordDto): Promise<{
        ok: string;
    }>;
    reset(adminResetPasswordDto: AdminResetPasswordDto): Promise<{
        ok: boolean;
    }>;
    updatePassword(user: UserTokenDto, adminUpdatePasswordUserDto: AdminUpdatePasswordUserDto): Promise<boolean>;
    getCurrentUser(user: UserTokenDto): Promise<import("../../admin-user/admin-user-main/dto/admin-user.dto").AdminUserDto>;
}
