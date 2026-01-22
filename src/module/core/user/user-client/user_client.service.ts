// tenant-operator.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserService } from '../user/user.service';
import { UserDto, SearchUsersRes, SearchUserQuerySortFilter } from '../user/dto/user.dto';
import { UserDocument } from '../user/schema/user.schema';
import { plainToInstance } from 'class-transformer';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserProfileDto, UpdatePasswordUserDto } from '../user/dto/update-user.dto';

/**
 * Tenant Operator Service - Reuses User CRUD operations
 * Tenant Operator users are stored in the User collection with role: 'tenant_operator'
 */
@Injectable()
export class UserClientService {
  constructor(
    @InjectModel(UserDocument.name) private userModel: Model<UserDocument>,
    private readonly userService: UserService,
  ) {}

  async create(createUserDto: CreateUserDto, tenantId?: Types.ObjectId): Promise<UserDto> {
    createUserDto.roles = [ROLE_CONSTANTS.CLIENT];
    return this.userService.create(createUserDto, tenantId);
  }

  // Cập nhật thông tin người dùng
  async update(updateUserProfileDto: UpdateUserProfileDto, tenantId: Types.ObjectId): Promise<UserDto> {
    return this.userService.update(updateUserProfileDto, tenantId);
  }

  async updateUserField(
    userId: Types.ObjectId,
    fieldName: string,
    value: any,
    tenantId: Types.ObjectId,
  ): Promise<UserDto> {
    return this.userService.updateUserField(userId, fieldName, value, tenantId);
  }

  async updatePassword(
    userId: Types.ObjectId,
    adminUpdatePasswordUserDto: UpdatePasswordUserDto,
    tenantId: Types.ObjectId,
  ): Promise<UserDto> {
    return this.userService.updatePassword(userId, adminUpdatePasswordUserDto, tenantId);
  }

  async setPasswordAsTemp(userId: Types.ObjectId, tempPassword: string, tenantId: Types.ObjectId): Promise<boolean> {
    return this.userService.setPasswordAsTemp(userId, tempPassword, tenantId);
  }

  delete(id: Types.ObjectId) {
    return this.userService.delete(id);
  }

  /**
   * Search POS users with pagination and filters
   */
  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchUserQuerySortFilter,
    filters: SearchUserQuerySortFilter[],
    tenantId: Types.ObjectId,
  ): Promise<SearchUsersRes> {
    // Get base pipeline from UserService
    const pipeline = await this.userService.buildQuerySearch(pageIdx, pageSize, keyword, sortBy, filters, tenantId);

    // Add POS role filter to the pipeline
    // Find the $match stage and add role filter
    const matchStageIndex = pipeline.findIndex((stage: any) => stage.$match);
    if (matchStageIndex !== -1) {
      // Modify existing $match stage to include role filter
      pipeline[matchStageIndex].$match = {
        ...pipeline[matchStageIndex].$match,
        roles: { $in: [ROLE_CONSTANTS.CLIENT] },
      };
    } else {
      // If no $match stage, add one at the beginning
      pipeline.unshift({
        $match: { roles: { $in: [ROLE_CONSTANTS.CLIENT] } },
      });
    }

    // Thực hiện tìm kiếm
    const usersModel = await this.userModel.aggregate(pipeline).exec();

    // Đếm tổng số mục
    const totalItem = await this.userModel.countDocuments({ tenantId, roles: { $in: [ROLE_CONSTANTS.CLIENT] } });

    let users = usersModel.map((user) => plainToInstance(UserDto, user));
    users = await this.userService.mapUserAvatarUrl(users);

    return {
      pageIdx,
      users: users,
      totalPage: Math.ceil(totalItem / pageSize),
      totalItem,
    };
  }
}
