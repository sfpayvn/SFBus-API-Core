// admin-tenant.service.ts

import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserDocument } from '@/module/core/user/user/schema/user.schema';
import { CreateUserDto } from '@/module/core/user/user/dto/create-user.dto';
import { UpdateUserProfileDto, UpdatePasswordUserDto } from '@/module/core/user/user/dto/update-user.dto';
import { UserDto } from '@/module/core/user/user/dto/user.dto';
import { AdminSearchUserQuerySortFilter, AdminSearchUsersRes } from '../admin-user-main/dto/admin-user.dto';
import { UserTenantService } from '@/module/core/user/user-tenant/user-tenant.service';

/**
 * Admin Tenant Service - Manages Tenant users from admin panel
 * Reuses Tenant service CRUD operations with admin-specific features
 */
@Injectable()
export class AdminUserTenantService {
  constructor(
    @InjectModel(UserDocument.name) private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => UserTenantService)) private readonly userTenantService: UserTenantService,
  ) {}

  /**
   * Create new Tenant user
   */
  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userTenantService.create(createUserDto);
  }

  /**
   * Update Tenant user
   */
  async update(updateUserDto: UpdateUserProfileDto): Promise<UserDto> {
    return this.userTenantService.update(updateUserDto);
  }

  /**
   * Get Tenant user by ID
   */
  async findById(userId: Types.ObjectId): Promise<UserDto | null> {
    return this.userTenantService.findById(userId);
  }

  /**
   * Get all Tenant users for a tenant
   */
  async findAll(): Promise<UserDto[]> {
    return this.userTenantService.findAll();
  }

  /**
   * Get Tenant user by phone number
   */
  async findByPhoneNumber(phoneNumber: string): Promise<UserDto | null> {
    return this.userTenantService.findByPhoneNumber(phoneNumber);
  }

  /**
   * Get Tenant user by email
   */
  async findByEmail(email: string): Promise<UserDto | null> {
    return this.userTenantService.findByEmail(email);
  }

  /**
   * Update Tenant user password
   */
  async updatePassword(userId: Types.ObjectId, updatePasswordUserDto: UpdatePasswordUserDto): Promise<boolean> {
    const result = await this.userTenantService.updatePassword(userId, updatePasswordUserDto);
    return result != null;
  }

  /**
   * Set temporary password for Tenant user
   */
  async setPasswordAsTemp(userId: Types.ObjectId, tempPassword: string): Promise<boolean> {
    return this.userTenantService.setPasswordAsTemp(userId, tempPassword);
  }

  /**
   * Delete Tenant user
   */
  async delete(id: Types.ObjectId): Promise<boolean> {
    return this.userTenantService.delete(id);
  }

  /**
   * Update user profile
   */
  async updateUserProfile(updateUserDto: UpdateUserProfileDto): Promise<UserDto> {
    return this.userTenantService.updateUserProfile(updateUserDto);
  }

  /**
   * Get multiple Tenant users by IDs
   */
  async findByIds(userIds: Types.ObjectId[]): Promise<UserDto[] | null> {
    return this.userTenantService.findByIds(userIds);
  }

  /**
   * Admin search Tenant users with pagination and filters
   */
  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: AdminSearchUserQuerySortFilter,
    filters: AdminSearchUserQuerySortFilter[],
  ): Promise<AdminSearchUsersRes> {
    return this.userTenantService.search(pageIdx, pageSize, keyword, sortBy, filters);
  }
}
