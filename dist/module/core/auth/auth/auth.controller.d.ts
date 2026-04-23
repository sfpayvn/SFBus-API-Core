import { AuthService } from './auth.service';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { ForgotPasswordDto, ResetPasswordDto } from './dto/auth.dto';
import { Types } from 'mongoose';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        access_token: string;
    }>;
    verifyPhoneNumber(phoneNumber: string): Promise<string>;
    validateToken(req: any): Promise<{
        valid: boolean;
        user: any;
    }>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        ok: string;
    }>;
    reset(resetPasswordDto: ResetPasswordDto): Promise<{
        ok: boolean;
    }>;
    logout(user: UserTokenDto): Promise<{
        ok: boolean;
    }>;
    forceLogout(userId: Types.ObjectId, user: UserTokenDto): Promise<{
        ok: boolean;
        message?: string;
    }>;
}
