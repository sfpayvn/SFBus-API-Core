// otp.service.ts
import { AuthRescueService } from '@/module/core/auth/auth-rescue/auth-rescue.service';
import { AuthRescueDocument } from '@/module/core/auth/auth-rescue/schema/auth-rescue.schema';
import { Injectable, BadRequestException, ForbiddenException, forwardRef, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientUserService } from '../../client-user/client-user-main/client-user.service';
import { JwtService } from '@nestjs/jwt';
import { ClientTenantService } from '../../client-tenant/client-tenant.service';

@Injectable()
export class ClientAuthRescueService {
  constructor(
    @InjectModel(AuthRescueDocument.name) private authRescueModel: Model<AuthRescueDocument>,
    @Inject(forwardRef(() => AuthRescueService)) private readonly authRescueService: AuthRescueService,
    @Inject(forwardRef(() => ClientUserService)) private readonly clientUserService: ClientUserService,
    @Inject(forwardRef(() => ClientTenantService)) private readonly clientTenantService: ClientTenantService,
    private jwtService: JwtService,
  ) {}

  async requestAuthRescue(identifier: string, tenantCode: string, purpose: string) {
    const tenant = await this.clientTenantService.findByCode(tenantCode);
    if (!tenant) {
      throw new ForbiddenException('Tenant not found');
    }
    return this.authRescueService.requestAuthRescue(identifier, purpose, tenant._id);
  }

  async verifyAuthRescueAndLogin(identifier: string, tenantCode: string, purpose: string, token: string) {
    const tenant = await this.clientTenantService.findByCode(tenantCode);
    if (!tenant) {
      throw new ForbiddenException('Tenant not found');
    }

    const isValid = await this.authRescueService.verifyAuthRescue(identifier, purpose, token, tenant._id);
    if (isValid) {
      const user = await this.clientUserService.findByPhoneNumber(identifier, tenant._id);

      if (!user) {
        throw new ForbiddenException('User not found');
      }

      const payload = {
        _id: user._id.toString(),
        roles: user.roles,
        tenantId: user.tenantId?.toString(),
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }

  async verifyAuthRescue(identifier: string, tenantCode: string, purpose: string, token: string) {
    const tenant = await this.clientTenantService.findByCode(tenantCode);
    if (!tenant) {
      throw new ForbiddenException('Tenant not found');
    }
    return this.authRescueService.verifyAuthRescue(identifier, purpose, token, tenant._id);
  }
}
