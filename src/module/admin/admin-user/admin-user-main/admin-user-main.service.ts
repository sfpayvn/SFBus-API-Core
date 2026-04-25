// user.service.ts

import { UserDocument } from '@/module/core/user/user/schema/user.schema';
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserService } from '@/module/core/user/user/user.service';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { AdminSearchUserQuerySortFilter, AdminSearchUsersRes, AdminUserDto } from './dto/admin-user.dto';
import { AdminCreateUserDto } from './dto/admin-create-user.dto';
import { AdminUpdatePasswordUserDto, AdminUpdateUserDto, AdminUpdateUserProfileDto } from './dto/admin-update-user.dto';

@Injectable()
export class AdminUserMainService {
  constructor(
    @InjectModel(UserDocument.name) private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
  ) {}

  async create(adminCreateUserDto: AdminCreateUserDto, tenantId?: Types.ObjectId): Promise<AdminUserDto> {
    return this.userService.create(adminCreateUserDto, tenantId);
  }

  // Cập nhật thông tin người dùng
  async update(adminUpdateUserProfileDto: AdminUpdateUserProfileDto, tenantId: Types.ObjectId): Promise<AdminUserDto> {
    return this.userService.update(adminUpdateUserProfileDto, tenantId);
  }

  async updateUserField(
    userId: Types.ObjectId,
    fieldName: string,
    value: any,
    tenantId: Types.ObjectId,
  ): Promise<boolean> {
    const result = await this.userService.updateUserField(userId, fieldName, value, tenantId);
    return result != null;
  }

  async updatePassword(
    userId: Types.ObjectId,
    adminUpdatePasswordUserDto: AdminUpdatePasswordUserDto,
    tenantId: Types.ObjectId,
  ): Promise<boolean> {
    const result = await this.userService.updatePassword(userId, adminUpdatePasswordUserDto, tenantId);
    return result != null;
  }

  async setPasswordAsTemp(userId: Types.ObjectId, tempPassword: string, tenantId: Types.ObjectId): Promise<boolean> {
    return this.userService.setPasswordAsTemp(userId, tempPassword, tenantId);
  }

  delete(id: Types.ObjectId) {
    return this.userService.delete(id);
  }

  // Tìm người dùng theo ID
  async findById(userId: Types.ObjectId, tenantId: Types.ObjectId): Promise<AdminUserDto | null> {
    return this.userService.findById(userId, tenantId);
  }

  async findByIds(userIds: Types.ObjectId[], tenantId: Types.ObjectId): Promise<AdminUserDto[] | null> {
    return this.userService.findByIds(userIds, tenantId);
  }

  // Tìm người dùng theo tên đăng nhập
  async findByPhoneNumber(phoneNumber: string, tenantId?: Types.ObjectId): Promise<AdminUserDto | null> {
    return this.userService.findByPhoneNumber(phoneNumber, tenantId);
  }

  async findAll(tenantId: Types.ObjectId): Promise<AdminUserDto[]> {
    return this.userService.findAll(tenantId);
  }

  async findAllByRole(role: string, tenantId: Types.ObjectId): Promise<AdminUserDto[]> {
    return this.userService.findAllByRole(role, tenantId);
  }

  async findOne(id: string, tenantId: Types.ObjectId): Promise<AdminUserDto> {
    return this.userService.findOne(id, tenantId);
  }

  async findByPhone(phoneNumber: string, tenantId: Types.ObjectId): Promise<AdminUserDto> {
    return this.userService.findByPhone(phoneNumber, tenantId);
  }

  async findByEmail(email: string, tenantId: Types.ObjectId): Promise<AdminUserDto> {
    return this.userService.findByEmail(email, tenantId);
  }

  async findOneByRole(role: string, tenantId: Types.ObjectId): Promise<AdminUserDto> {
    return this.userService.findOneByRole(role, tenantId);
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: AdminSearchUserQuerySortFilter,
    filters: AdminSearchUserQuerySortFilter[],
    tenantId: Types.ObjectId,
  ): Promise<AdminSearchUsersRes> {
    return this.userService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
  }
}
