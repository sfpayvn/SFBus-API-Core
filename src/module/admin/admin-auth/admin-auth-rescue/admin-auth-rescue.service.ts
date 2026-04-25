// otp.service.ts
import { AuthRescueService } from '@/module/core/auth/auth-rescue/auth-rescue.service';
import { AuthRescueDocument } from '@/module/core/auth/auth-rescue/schema/auth-rescue.schema';
import { UserService } from '@/module/core/user/user/user.service';
import { Injectable, BadRequestException, ForbiddenException, forwardRef, Inject, Type } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class AdminAuthRescueService {
  constructor(
    @InjectModel(AuthRescueDocument.name) private authRescueModel: Model<AuthRescueDocument>,
    @Inject(forwardRef(() => AuthRescueService)) private readonly authRescueService: AuthRescueService,
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
  ) {}

  async requestAuthRescue(identifier: string, purpose: string, tenantId: Types.ObjectId) {
    return this.authRescueService.requestAuthRescue(identifier, purpose, tenantId);
  }

  async verifyAuthRescue(
    identifier: string,
    purpose: string,
    token: string,
    userId: Types.ObjectId,
    tenantId: Types.ObjectId,
  ) {
    const isAuth = await this.authRescueService.verifyAuthRescue(identifier, purpose, token, tenantId);
    if (!isAuth) {
      throw new ForbiddenException('Xác thực thất bại hoặc token đã được sử dụng.');
    }
    await this.userService.markIdentifierAsVerified(userId, tenantId, identifier);
    return true;
  }
}
