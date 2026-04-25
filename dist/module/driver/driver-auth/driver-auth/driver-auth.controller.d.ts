import { DriverForgotPasswordDto, DriverResetPasswordDto } from './dto/driver-auth.dto';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { DriverAuthService } from './driver-auth.service';
import { DriverVerifyAuthRescueDto } from '../driver-auth-rescue/dto/driver-auth-rescue.dto';
import { DriverUpdatePasswordUserDto } from '../../driver-user/driver-user-main/dto/driver-update-user.dto';
export declare class AuthController {
    private driverAuthService;
    constructor(driverAuthService: DriverAuthService);
    login(req: any): Promise<{
        access_token: string;
    }>;
    verifyPhoneNumber(phoneNumber: string): Promise<string>;
    validateToken(req: any): Promise<{
        valid: boolean;
        user: any;
    }>;
    verifyForgotPasswordOtp(driverVerifyAuthRescueDto: DriverVerifyAuthRescueDto): Promise<{
        token: string | {
            ok: boolean;
        };
    } | null>;
    forgotPassword(driverForgotPasswordDto: DriverForgotPasswordDto): Promise<{
        ok: string;
    }>;
    reset(driverResetPasswordDto: DriverResetPasswordDto): Promise<{
        ok: boolean;
    }>;
    updatePassword(user: UserTokenDto, driverUpdatePasswordUserDto: DriverUpdatePasswordUserDto): Promise<{
        message: string;
        user: {
            email: string;
            name: string;
        };
    }>;
    getCurrentUser(user: UserTokenDto): Promise<import("../../driver-user/driver-user-main/dto/driver-user.dto").DriverUserDto>;
}
