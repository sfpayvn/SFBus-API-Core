// auth.service.ts

import { BadRequestException, forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientUserService } from '../../client-user/client-user-main/client-user.service';
import { ClientUserDto } from '../../client-user/client-user-main/dto/client-user.dto';
import { ClientTenantService } from '../../client-tenant/client-tenant.service';
import { ClientCreateUserDto } from '../../client-user/client-user-main/dto/client-create-user.dto';
import { AuthService } from '@/module/core/auth/auth/auth.service';
import { Types } from 'mongoose';
import * as crypto from 'crypto';
import { ClientAuthRescueService } from '../client-auth-rescue/client-auth-rescue.service';
import { ClientUpdatePasswordUserDto } from '../../client-user/client-user-main/dto/client-update-user.dto';
import { plainToInstance } from 'class-transformer';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Injectable()
export class ClientAuthService {
  constructor(
    @Inject(forwardRef(() => ClientUserService)) private readonly clientUserService: ClientUserService,
    @Inject(forwardRef(() => ClientTenantService)) private readonly clientTenantService: ClientTenantService,
    @Inject(forwardRef(() => AuthService)) private readonly authService: AuthService,
    @Inject(forwardRef(() => AuthService)) private readonly clientAuthRescueService: ClientAuthRescueService,
    private jwtService: JwtService,
  ) {}

  // Đăng nhập và trả về JWT token
  async login(clientUser: ClientUserDto) {
    const payload = {
      _id: clientUser._id.toString(),
      roles: clientUser.roles,
      tenantId: clientUser.tenantId?.toString(),
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(phoneNumber: string, tenantCode: string) {
    const tenant = await this.clientTenantService.findByCode(tenantCode);

    if (!tenant) {
      throw new UnauthorizedException('Tenant không tồn tại.');
    }

    const user2Create: ClientCreateUserDto = {
      name: '',
      phoneNumber: phoneNumber,
      password: crypto.randomBytes(32).toString('hex'),
      roles: [ROLE_CONSTANTS.CLIENT],
      tenantId: tenant._id,
      avatarId: '',
      gender: 'other',
      email: '',
      isTempPassWord: true,
      isEmailVerified: false,
      isPhoneNumberVerified: false,
      resetTokenVersion: 0,
    };

    const user = await this.clientUserService.create(user2Create);

    if (!user) {
      throw new UnauthorizedException('Đăng ký không thành công.');
    }

    return { phoneNumber: user.phoneNumber };
  }

  // Xác thực người dùng khi đăng nhập
  async verifyPhoneNumber(phoneNumber: string, tenantCode: string): Promise<any> {
    const tenant = await this.clientTenantService.findByCode(tenantCode);

    if (!tenant) {
      throw new UnauthorizedException('Tenant không tồn tại.');
    }

    const user = await this.clientUserService.findByPhoneNumber(phoneNumber, tenant._id);

    if (!user) {
      return null;
    }

    return {
      name: user.name,
      isTempPassWord: user.isTempPassWord,
    };
  }

  async verifyForgotPasswordOtp(identifier: string, tenantCode: string, purpose: string, token: string) {
    const result = await this.clientAuthRescueService.verifyAuthRescue(identifier, tenantCode, purpose, token);
    if (result) {
      const tokenForgotPassword = await this.authService.createForgotPasswordToken(identifier, tenantCode);
      return { token: tokenForgotPassword };
    }

    return null;
  }

  async forgotPassword(phoneNumber: string, redirectBaseUrl?: string) {
    const tenant = await this.clientTenantService.findByPhoneNumber(phoneNumber);

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
    clientUpdatePasswordUserDto: ClientUpdatePasswordUserDto,
    tenantId: Types.ObjectId,
  ) {
    return this.clientUserService.updatePassword(userId, clientUpdatePasswordUserDto, tenantId);
  }

  async getCurrentUser(userId: Types.ObjectId, tenantId: Types.ObjectId): Promise<ClientUserDto> {
    const foundUser = await this.clientUserService.findById(userId, tenantId);
    if (!foundUser) {
      throw new BadRequestException('User not found.');
    }
    return plainToInstance(ClientUserDto, foundUser);
  }
}
