import { JwtService } from '@nestjs/jwt';
import { PosUserService } from '../../pos-user/pos-user-main/pos-user.service';
import { PosUserDto } from '../../pos-user/pos-user-main/dto/pos-user.dto';
import { AuthService } from '@/module/core/auth/auth/auth.service';
import { Types } from 'mongoose';
import { PosAuthRescueService } from '../pos-auth-rescue/pos-auth-rescue.service';
import { PosUpdatePasswordUserDto } from '../../pos-user/pos-user-main/dto/pos-update-user.dto';
import { PosTenantService } from '../../pos-tenant/pos-tenant.service';
import { AutoJobTrackingService } from '@/module/core/auto-job-tracking';
import { PosBusScheduleAutogeneratorService } from '../../pos-bus/pos-bus-schedule-autogenerator/pos-bus-schedule-autogenerator.service';
import { SettingsService } from '@/module/core/settings/settings.service';
export declare class PosAuthService {
    private readonly posUserService;
    private readonly posTenantService;
    private readonly authService;
    private readonly autoJobTrackingService;
    private readonly posBusScheduleAutogeneratorService;
    private readonly settingsService;
    private readonly posAuthRescueService;
    private jwtService;
    constructor(posUserService: PosUserService, posTenantService: PosTenantService, authService: AuthService, autoJobTrackingService: AutoJobTrackingService, posBusScheduleAutogeneratorService: PosBusScheduleAutogeneratorService, settingsService: SettingsService, posAuthRescueService: PosAuthRescueService, jwtService: JwtService);
    tryAutoScheduleJobs(posUser: PosUserDto, timezoneOffset: number): Promise<void>;
    login(posUser: PosUserDto): Promise<{
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
    updatePassword(userId: Types.ObjectId, posUpdatePasswordUserDto: PosUpdatePasswordUserDto, tenantId: Types.ObjectId): Promise<PosUserDto>;
    getCurrentUser(userId: Types.ObjectId, tenantId: Types.ObjectId, tokenVersion?: number): Promise<PosUserDto>;
    logout(userId: Types.ObjectId, tenantId: Types.ObjectId): Promise<{
        ok: boolean;
    }>;
    forceLogoutUser(userId: Types.ObjectId, tenantId: Types.ObjectId): Promise<{
        ok: boolean;
        message?: string;
    }>;
}
