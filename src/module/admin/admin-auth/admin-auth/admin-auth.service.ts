// auth.service.ts

import { BadRequestException, forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminUserMainService } from '../../admin-user/admin-user-main/admin-user-main.service';
import { AdminUserDto } from '../../admin-user/admin-user-main/dto/admin-user.dto';
import { AdminTenantService } from '../../admin-tenant/admin-tenant.service';
import { AdminCreateTenantDto } from '../../admin-tenant/dto/admin-create-tenant.dto';
import { AdminTenantSettingDto } from '../../admin-tenant/dto/admin-tenant.dto';
import { AdminCreateUserDto } from '../../admin-user/admin-user-main/dto/admin-create-user.dto';
import { AuthService } from '@/module/core/auth/auth/auth.service';
import { Types } from 'mongoose';
import { AdminSignUpDto } from './dto/admin-auth.dto';
import { plainToInstance } from 'class-transformer';
import { AdminUpdatePasswordUserDto } from '../../admin-user/admin-user-main/dto/admin-update-user.dto';
import { AutoJobTrackingService } from '@/module/core/auto-job-tracking';
import { AdminBusScheduleAutogeneratorService } from '../../admin-bus/admin-bus-schedule-autogenerator/admin-bus-schedule-autogenerator.service';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Injectable()
export class AdminAuthService {
  constructor(
    @Inject(forwardRef(() => AdminUserMainService)) private readonly adminUserMainService: AdminUserMainService,
    @Inject(forwardRef(() => AdminTenantService)) private readonly adminTenantService: AdminTenantService,
    @Inject(forwardRef(() => AuthService)) private readonly authService: AuthService,
    @Inject(forwardRef(() => AutoJobTrackingService)) private readonly autoJobTrackingService: AutoJobTrackingService,
    @Inject(forwardRef(() => AdminBusScheduleAutogeneratorService))
    private readonly adminBusScheduleAutogeneratorService: AdminBusScheduleAutogeneratorService,

    private jwtService: JwtService,
  ) {}

  async tryAutoScheduleJobs(adminUser: AdminUserDto, timezoneOffset: number) {
    const isRun = await this.autoJobTrackingService.tryRunToday(adminUser.tenantId, 'auto_schedule', timezoneOffset);
    if (isRun) {
      this.adminBusScheduleAutogeneratorService
        .generateSchedulesForToday(adminUser.tenantId, timezoneOffset)
        .catch((err) => {
          // Silent fail - don't disrupt login
        });
    }
  }

  // Đăng nhập và trả về JWT token
  async login(adminUser: AdminUserDto) {
    const allowedRoles = [ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR, ROLE_CONSTANTS.ADMIN];
    if (!adminUser.roles.some((role) => allowedRoles.includes(role))) {
      throw new UnauthorizedException('Tài khoản của bạn không đủ quyền để đăng nhập vào ứng dụng này.');
    }

    const payload = {
      _id: adminUser._id.toString(),
      roles: adminUser.roles,
      tenantId: adminUser.tenantId?.toString(),
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(adminSignUpDto: AdminSignUpDto) {
    const valid = await this.adminTenantService.validateTenant(adminSignUpDto.phoneNumber);
    if (valid) {
      throw new UnauthorizedException('Tenant đã tồn tại.');
    }

    const tenantId = new Types.ObjectId();

    const user2Create: AdminCreateUserDto = {
      name: adminSignUpDto.tenantName,
      phoneNumber: adminSignUpDto.phoneNumber,
      password: adminSignUpDto.password,
      roles: ['tenant'],
      tenantId: tenantId,
      avatarId: '',
      gender: 'other',
      email: '',
      isTempPassWord: true,
      isEmailVerified: false,
      isPhoneNumberVerified: false,
      resetTokenVersion: 0,
    };

    const user = await this.adminUserMainService.create(user2Create);

    const tenant2Create: AdminCreateTenantDto = {
      name: adminSignUpDto.tenantName,
      code: adminSignUpDto.tenantCode,
      phoneNumber: adminSignUpDto.phoneNumber,
      setting: {
        appearance: 'default',
        timezone: 'UTC',
      } as AdminTenantSettingDto,
      status: 'active',
    };

    const tenant = await this.adminTenantService.create({
      ...tenant2Create,
      _id: tenantId,
    } as any);

    if (!tenant) {
      throw new UnauthorizedException('Đăng ký không thành công.');
    }

    if (!user) {
      throw new UnauthorizedException('Đăng ký không thành công.');
    }

    return this.login(user);
  }

  // Xác thực người dùng khi đăng nhập
  async verifyPhoneNumber(phoneNumber: string): Promise<any> {
    const user = await this.adminUserMainService.findByPhoneNumber(phoneNumber);
    if (user) {
      return user.name;
    }
    return null;
  }

  async forgotPassword(phoneNumber: string, redirectBaseUrl?: string) {
    const tenant = await this.adminTenantService.findByPhoneNumber(phoneNumber);

    if (!tenant || !tenant.code) {
      throw new UnauthorizedException('Số điện thoại không tồn tại.');
    }

    return this.authService.forgotPassword(phoneNumber, tenant.code, redirectBaseUrl);
  }

  resetPassword(token: string, newPassword: string) {
    return this.authService.resetPassword(token, newPassword);
  }

  async updatePassword(
    userId: Types.ObjectId,
    adminUpdatePasswordUserDto: AdminUpdatePasswordUserDto,
    tenantId: Types.ObjectId,
  ) {
    return this.adminUserMainService.updatePassword(userId, adminUpdatePasswordUserDto, tenantId);
  }

  async getCurrentUser(userId: Types.ObjectId, tenantId: Types.ObjectId): Promise<AdminUserDto> {
    const foundUser = await this.adminUserMainService.findById(userId, tenantId);
    if (!foundUser) {
      throw new BadRequestException('User not found.');
    }

    const tenant = await this.adminTenantService.findOne(tenantId);

    if (!tenant) {
      throw new UnauthorizedException('Tenant không tồn tại.');
    }

    Object.assign(foundUser, { tenant: tenant });

    return plainToInstance(AdminUserDto, foundUser);
  }
}
