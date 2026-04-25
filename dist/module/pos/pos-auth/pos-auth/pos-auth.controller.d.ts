import { PosForgotPasswordDto, PosResetPasswordDto } from './dto/pos-auth.dto';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { PosAuthService } from './pos-auth.service';
import { PosVerifyAuthRescueDto } from '../pos-auth-rescue/dto/pos-auth-rescue.dto';
import { PosUpdatePasswordUserDto } from '../../pos-user/pos-user-main/dto/pos-update-user.dto';
import { Types } from 'mongoose';
export declare class AuthController {
    private posAuthService;
    constructor(posAuthService: PosAuthService);
    login(req: any, timezoneOffset: number): Promise<{
        access_token: string;
    }>;
    verifyPhoneNumber(phoneNumber: string): Promise<string>;
    validateToken(req: any): Promise<{
        valid: boolean;
        user: any;
    }>;
    verifyForgotPasswordOtp(posVerifyAuthRescueDto: PosVerifyAuthRescueDto): Promise<{
        token: string | {
            ok: boolean;
        };
    } | null>;
    forgotPassword(posForgotPasswordDto: PosForgotPasswordDto): Promise<{
        ok: string;
    }>;
    reset(PosResetPasswordDto: PosResetPasswordDto): Promise<{
        ok: boolean;
    }>;
    updatePassword(user: UserTokenDto, posUpdatePasswordUserDto: PosUpdatePasswordUserDto): Promise<{
        message: string;
        user: {
            email: string;
            name: string;
        };
    }>;
    getCurrentUser(user: UserTokenDto): Promise<import("../../pos-user/pos-user-main/dto/pos-user.dto").PosUserDto>;
    logout(user: UserTokenDto): Promise<{
        ok: boolean;
    }>;
    forceLogout(userId: Types.ObjectId, user: UserTokenDto): Promise<{
        ok: boolean;
        message?: string;
    }>;
}
