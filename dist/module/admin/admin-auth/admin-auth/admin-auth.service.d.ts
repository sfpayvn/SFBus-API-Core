import { JwtService } from '@nestjs/jwt';
import { AdminUserMainService } from '../../admin-user/admin-user-main/admin-user-main.service';
import { AdminUserDto } from '../../admin-user/admin-user-main/dto/admin-user.dto';
import { AdminTenantService } from '../../admin-tenant/admin-tenant.service';
import { AuthService } from '@/module/core/auth/auth/auth.service';
import { Types } from 'mongoose';
import { AdminSignUpDto } from './dto/admin-auth.dto';
import { AdminUpdatePasswordUserDto } from '../../admin-user/admin-user-main/dto/admin-update-user.dto';
import { AutoJobTrackingService } from '@/module/core/auto-job-tracking';
import { AdminBusScheduleAutogeneratorService } from '../../admin-bus/admin-bus-schedule-autogenerator/admin-bus-schedule-autogenerator.service';
import { SettingsService } from '@/module/core/settings/settings.service';
export declare class AdminAuthService {
    private readonly adminUserMainService;
    private readonly adminTenantService;
    private readonly authService;
    private readonly autoJobTrackingService;
    private readonly adminBusScheduleAutogeneratorService;
    private readonly settingsService;
    private jwtService;
    constructor(adminUserMainService: AdminUserMainService, adminTenantService: AdminTenantService, authService: AuthService, autoJobTrackingService: AutoJobTrackingService, adminBusScheduleAutogeneratorService: AdminBusScheduleAutogeneratorService, settingsService: SettingsService, jwtService: JwtService);
    tryAutoScheduleJobs(adminUser: AdminUserDto, timezoneOffset: number): Promise<void>;
    login(adminUser: AdminUserDto): Promise<{
        access_token: string;
    }>;
    signUp(adminSignUpDto: AdminSignUpDto): Promise<{
        access_token: string;
    }>;
    verifyPhoneNumber(phoneNumber: string): Promise<any>;
    forgotPassword(phoneNumber: string, redirectBaseUrl?: string): Promise<{
        ok: string;
    }>;
    resetPassword(token: string, newPassword: string): Promise<{
        ok: boolean;
    }>;
    updatePassword(userId: Types.ObjectId, adminUpdatePasswordUserDto: AdminUpdatePasswordUserDto, tenantId: Types.ObjectId): Promise<boolean>;
    getCurrentUser(userId: Types.ObjectId, tenantId: Types.ObjectId, tokenVersion?: number): Promise<AdminUserDto>;
}
