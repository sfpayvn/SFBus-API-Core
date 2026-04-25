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

/**
 * Admin POS Service - Manages POS users from admin panel
 * Reuses POS service CRUD operations with admin-specific features
 */
@Injectable()
export class AdminUserPosService {
  constructor(
    @InjectModel(UserDocument.name) private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => UserPosService)) private readonly userPosService: UserPosService,
  ) {}

  async create(adminCreateUserDto: AdminCreateUserDto, tenantId?: Types.ObjectId): Promise<AdminUserDto> {
    return this.userPosService.create(adminCreateUserDto, tenantId);
  }

  // Cập nhật thông tin người dùng
  async update(adminUpdateUserProfileDto: AdminUpdateUserProfileDto, tenantId: Types.ObjectId): Promise<boolean> {
    const result = await this.userPosService.update(adminUpdateUserProfileDto, tenantId);
    return result != null;
  }

  async updateUserField(
    userId: Types.ObjectId,
    fieldName: string,
    value: any,
    tenantId: Types.ObjectId,
  ): Promise<boolean> {
    const result = await this.userPosService.updateUserField(userId, fieldName, value, tenantId);
    return result != null;
  }

  async updatePassword(
    userId: Types.ObjectId,
    adminUpdatePasswordUserDto: AdminUpdatePasswordUserDto,
    tenantId: Types.ObjectId,
  ): Promise<boolean> {
    const result = await this.userPosService.updatePassword(userId, adminUpdatePasswordUserDto, tenantId);
    return result != null;
  }

  async setPasswordAsTemp(userId: Types.ObjectId, tempPassword: string, tenantId: Types.ObjectId): Promise<boolean> {
    return this.userPosService.setPasswordAsTemp(userId, tempPassword, tenantId);
  }

  delete(id: Types.ObjectId) {
    return this.userPosService.delete(id);
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: AdminSearchUserQuerySortFilter,
    filters: AdminSearchUserQuerySortFilter[],
    tenantId: Types.ObjectId,
  ): Promise<AdminSearchUsersRes> {
    return this.userPosService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
  }
}
