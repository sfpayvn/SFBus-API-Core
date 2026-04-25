// admin-pos.service.ts

import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserDocument } from '@/module/core/user/user/schema/user.schema';
import { CreateUserDto } from '@/module/core/user/user/dto/create-user.dto';
import { UpdateUserProfileDto, UpdatePasswordUserDto } from '@/module/core/user/user/dto/update-user.dto';
import { UserDto } from '@/module/core/user/user/dto/user.dto';
import {
  AdminSearchUserQuerySortFilter,
  AdminSearchUsersRes,
  AdminUserDto,
} from '../admin-user-main/dto/admin-user.dto';
import { UserPosService } from '@/module/core/user/user-pos/user_pos.service';
import { AdminCreateUserDto } from '../admin-user-main/dto/admin-create-user.dto';
import { AdminUpdateUserProfileDto, AdminUpdatePasswordUserDto } from '../admin-user-main/dto/admin-update-user.dto';
import { UserTenantOperatorService } from '@/module/core/user/user-tenant-operator/user-tenant-operator.service';

/**
 * Admin POS Service - Manages POS users from admin panel
 * Reuses POS service CRUD operations with admin-specific features
 */
@Injectable()
export class AdminUserTenantOperatorService {
  constructor(
    @InjectModel(UserDocument.name) private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => UserTenantOperatorService))
    private readonly userTenantOperatorService: UserTenantOperatorService,
  ) {}

  async create(adminCreateUserDto: AdminCreateUserDto, tenantId?: Types.ObjectId): Promise<AdminUserDto> {
    return this.userTenantOperatorService.create(adminCreateUserDto, tenantId);
  }

  // Cập nhật thông tin người dùng
  async update(adminUpdateUserProfileDto: AdminUpdateUserProfileDto, tenantId: Types.ObjectId): Promise<AdminUserDto> {
    return this.userTenantOperatorService.update(adminUpdateUserProfileDto, tenantId);
  }

  async updateUserField(
    userId: Types.ObjectId,
    fieldName: string,
    value: any,
    tenantId: Types.ObjectId,
  ): Promise<AdminUserDto> {
    return this.userTenantOperatorService.updateUserField(userId, fieldName, value, tenantId);
  }

  async updatePassword(
    userId: Types.ObjectId,
    adminUpdatePasswordUserDto: AdminUpdatePasswordUserDto,
    tenantId: Types.ObjectId,
  ): Promise<AdminUserDto> {
    return this.userTenantOperatorService.updatePassword(userId, adminUpdatePasswordUserDto, tenantId);
  }

  async setPasswordAsTemp(
    userId: Types.ObjectId,
    tempPassword: string,
    tenantId: Types.ObjectId,
  ): Promise<boolean> {
    return this.userTenantOperatorService.setPasswordAsTemp(userId, tempPassword, tenantId);
  }

  delete(id: Types.ObjectId) {
    return this.userTenantOperatorService.delete(id);
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: AdminSearchUserQuerySortFilter,
    filters: AdminSearchUserQuerySortFilter[],
    tenantId: Types.ObjectId,
  ): Promise<AdminSearchUsersRes> {
    return this.userTenantOperatorService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
  }
}
