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
import { UserDriverService } from '@/module/core/user/user-driver/user-driver.service';
import { UserClientService } from '@/module/core/user/user-client/user_client.service';

@Injectable()
export class AdminUserClientService {
  constructor(
    @InjectModel(UserDocument.name) private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => UserClientService)) private readonly userClientService: UserClientService,
  ) {}

  async create(adminCreateUserDto: AdminCreateUserDto, tenantId?: Types.ObjectId): Promise<AdminUserDto> {
    return this.userClientService.create(adminCreateUserDto, tenantId);
  }

  // Cập nhật thông tin người dùng
  async update(adminUpdateUserProfileDto: AdminUpdateUserProfileDto, tenantId: Types.ObjectId): Promise<boolean> {
    const result = await this.userClientService.update(adminUpdateUserProfileDto, tenantId);
    return result != null;
  }

  async updateUserField(
    userId: Types.ObjectId,
    fieldName: string,
    value: any,
    tenantId: Types.ObjectId,
  ): Promise<AdminUserDto> {
    return this.userClientService.updateUserField(userId, fieldName, value, tenantId);
  }

  async updatePassword(
    userId: Types.ObjectId,
    adminUpdatePasswordUserDto: AdminUpdatePasswordUserDto,
    tenantId: Types.ObjectId,
  ): Promise<boolean> {
    const result = this.userClientService.updatePassword(userId, adminUpdatePasswordUserDto, tenantId);
    return result != null;
  }

  async setPasswordAsTemp(userId: Types.ObjectId, tempPassword: string, tenantId: Types.ObjectId): Promise<boolean> {
    return this.userClientService.setPasswordAsTemp(userId, tempPassword, tenantId);
  }

  delete(id: Types.ObjectId) {
    return this.userClientService.delete(id);
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: AdminSearchUserQuerySortFilter,
    filters: AdminSearchUserQuerySortFilter[],
    tenantId: Types.ObjectId,
  ): Promise<AdminSearchUsersRes> {
    return this.userClientService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
  }
}
