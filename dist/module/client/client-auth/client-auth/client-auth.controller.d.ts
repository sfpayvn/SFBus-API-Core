import { ClientForgotPasswordDto, ClientResetPasswordDto } from './dto/client-auth.dto';
import { ClientAuthService } from './client-auth.service';
import { ClientVerifyAuthRescueDto } from '../client-auth-rescue/dto/client-auth-rescue.dto';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { ClientUpdatePasswordUserDto } from '../../client-user/client-user-main/dto/client-update-user.dto';
export declare class AuthController {
    private clientAuthService;
    constructor(clientAuthService: ClientAuthService);
    login(req: any): Promise<{
        access_token: string;
    }>;
    signUp(phoneNumber: string, tenantCode: string): Promise<{
        phoneNumber: string;
    }>;
    verifyPhoneNumber(phoneNumber: string, tenantCode: string): Promise<any>;
    validateToken(req: any): Promise<{
        valid: boolean;
        user: any;
    }>;
    verifyForgotPasswordOtp(clientVerifyAuthRescueDto: ClientVerifyAuthRescueDto, tenantCode: string): Promise<{
        token: string | {
            ok: boolean;
        };
    } | null>;
    forgotPassword(ClientForgotPasswordDto: ClientForgotPasswordDto): Promise<{
        ok: string;
    }>;
    reset(ClientResetPasswordDto: ClientResetPasswordDto): Promise<{
        ok: boolean;
    }>;
    updatePassword(user: UserTokenDto, clientUpdatePasswordUserDto: ClientUpdatePasswordUserDto): Promise<{
        message: string;
        user: {
            email: string;
            name: string;
        };
    }>;
    getCurrentUser(user: UserTokenDto): Promise<import("../../client-user/client-user-main/dto/client-user.dto").ClientUserDto>;
}
