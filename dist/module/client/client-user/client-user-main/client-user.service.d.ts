import { UserDocument } from '@/module/core/user/user/schema/user.schema';
import { Model, Types } from 'mongoose';
import { UserService } from '@/module/core/user/user/user.service';
import { ClientUserDto } from './dto/client-user.dto';
import { ClientCreateUserDto } from './dto/client-create-user.dto';
import { ClientUpdatePasswordUserDto, ClientUpdateUserProfileDto } from './dto/client-update-user.dto';
export declare class ClientUserService {
    private userModel;
    private readonly userService;
    constructor(userModel: Model<UserDocument>, userService: UserService);
    create(ClientCreateUserDto: ClientCreateUserDto, tenantId?: Types.ObjectId): Promise<ClientUserDto>;
    updateUserProfile(clientUpdateUserProfileDto: ClientUpdateUserProfileDto, tenantId: Types.ObjectId): Promise<ClientUserDto>;
    updateUserField(userId: Types.ObjectId, fieldName: string, value: any, tenantId: Types.ObjectId): Promise<ClientUserDto>;
    updatePassword(userId: Types.ObjectId, ClientUpdatePasswordUserDto: ClientUpdatePasswordUserDto, tenantId: Types.ObjectId): Promise<ClientUserDto>;
    markIdentifierAsVerified(userId: Types.ObjectId, tenantId: Types.ObjectId, identifier: string): Promise<import("../../../core/user/user/dto/user.dto").UserDto>;
    findById(userId: Types.ObjectId, tenantId: Types.ObjectId): Promise<ClientUserDto | null>;
    findByIds(userIds: Types.ObjectId[], tenantId: Types.ObjectId): Promise<ClientUserDto[] | null>;
    findByPhoneNumber(phoneNumber: string, tenantId?: Types.ObjectId): Promise<ClientUserDto | null>;
    findAll(tenantId: Types.ObjectId): Promise<ClientUserDto[]>;
    findAllByRole(role: string, tenantId: Types.ObjectId): Promise<ClientUserDto[]>;
    findOne(id: string, tenantId: Types.ObjectId): Promise<ClientUserDto>;
    findByPhone(phoneNumber: string, tenantId: Types.ObjectId): Promise<ClientUserDto>;
    findByEmail(email: string, tenantId: Types.ObjectId): Promise<ClientUserDto>;
    findOneByRole(role: string, tenantId: Types.ObjectId): Promise<ClientUserDto>;
}
