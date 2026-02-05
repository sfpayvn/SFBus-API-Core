// user.service.ts

import { UserDocument } from '@/module/core/user/user/schema/user.schema';
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserService } from '@/module/core/user/user/user.service';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { ClientRequestUpdateUserFieldDto, ClientSearchUsersRes, ClientUserDto } from './dto/client-user.dto';
import { ClientCreateUserDto } from './dto/client-create-user.dto';
import {
  ClientUpdatePasswordUserDto,
  ClientUpdateUserDto,
  ClientUpdateUserProfileDto,
} from './dto/client-update-user.dto';

@Injectable()
export class ClientUserService {
  constructor(
    @InjectModel(UserDocument.name) private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
  ) {}

  async create(ClientCreateUserDto: ClientCreateUserDto, tenantId?: Types.ObjectId): Promise<ClientUserDto> {
    return this.userService.create(ClientCreateUserDto, tenantId);
  }

  // Cập nhật thông tin người dùng
  async updateUserProfile(
    clientUpdateUserProfileDto: ClientUpdateUserProfileDto,
    tenantId: Types.ObjectId,
  ): Promise<ClientUserDto> {
    return this.userService.updateUserProfile(clientUpdateUserProfileDto, tenantId);
  }

  async updateUserField(
    userId: Types.ObjectId,
    fieldName: string,
    value: any,
    tenantId: Types.ObjectId,
  ): Promise<ClientUserDto> {
    return this.userService.updateUserField(userId, fieldName, value, tenantId);
  }

  async updatePassword(
    userId: Types.ObjectId,
    ClientUpdatePasswordUserDto: ClientUpdatePasswordUserDto,
    tenantId: Types.ObjectId,
  ): Promise<ClientUserDto> {
    return this.userService.updatePassword(userId, ClientUpdatePasswordUserDto, tenantId);
  }

  markIdentifierAsVerified(userId: Types.ObjectId, tenantId: Types.ObjectId, identifier: string) {
    return this.userService.markIdentifierAsVerified(userId, tenantId, identifier);
  }

  // T�m ngu?i d�ng theo ID
  async findById(userId: Types.ObjectId, tenantId: Types.ObjectId): Promise<ClientUserDto | null> {
    return this.userService.findById(userId, tenantId);
  }

  async findByIds(userIds: Types.ObjectId[], tenantId: Types.ObjectId): Promise<ClientUserDto[] | null> {
    return this.userService.findByIds(userIds, tenantId);
  }

  async findByPhoneNumber(phoneNumber: string, tenantId?: Types.ObjectId): Promise<ClientUserDto | null> {
    return this.userService.findByPhoneNumber(phoneNumber, tenantId);
  }

  async findAll(tenantId: Types.ObjectId): Promise<ClientUserDto[]> {
    return this.userService.findAll(tenantId);
  }

  async findAllByRole(role: string, tenantId: Types.ObjectId): Promise<ClientUserDto[]> {
    return this.userService.findAllByRole(role, tenantId);
  }

  async findOne(id: string, tenantId: Types.ObjectId): Promise<ClientUserDto> {
    return this.userService.findOne(id, tenantId);
  }

  async findByPhone(phoneNumber: string, tenantId: Types.ObjectId): Promise<ClientUserDto> {
    return this.userService.findByPhone(phoneNumber, tenantId);
  }

  async findByEmail(email: string, tenantId: Types.ObjectId): Promise<ClientUserDto> {
    return this.userService.findByEmail(email, tenantId);
  }

  async findOneByRole(role: string, tenantId: Types.ObjectId): Promise<ClientUserDto> {
    return this.userService.findOneByRole(role, tenantId);
  }
}
