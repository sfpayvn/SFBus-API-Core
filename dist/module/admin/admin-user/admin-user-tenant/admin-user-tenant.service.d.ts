import { Model, Types } from 'mongoose';
import { UserDocument } from '@/module/core/user/user/schema/user.schema';
import { CreateUserDto } from '@/module/core/user/user/dto/create-user.dto';
import { UpdateUserProfileDto, UpdatePasswordUserDto } from '@/module/core/user/user/dto/update-user.dto';
import { UserDto } from '@/module/core/user/user/dto/user.dto';
import { AdminSearchUserQuerySortFilter, AdminSearchUsersRes } from '../admin-user-main/dto/admin-user.dto';
import { UserTenantService } from '@/module/core/user/user-tenant/user-tenant.service';
export declare class AdminUserTenantService {
    private userModel;
    private readonly userTenantService;
    constructor(userModel: Model<UserDocument>, userTenantService: UserTenantService);
    create(createUserDto: CreateUserDto): Promise<UserDto>;
    update(updateUserDto: UpdateUserProfileDto): Promise<UserDto>;
    findById(userId: Types.ObjectId): Promise<UserDto | null>;
    findAll(): Promise<UserDto[]>;
    findByPhoneNumber(phoneNumber: string): Promise<UserDto | null>;
    findByEmail(email: string): Promise<UserDto | null>;
    updatePassword(userId: Types.ObjectId, updatePasswordUserDto: UpdatePasswordUserDto): Promise<boolean>;
    setPasswordAsTemp(userId: Types.ObjectId, tempPassword: string): Promise<boolean>;
    delete(id: Types.ObjectId): Promise<boolean>;
    updateUserProfile(updateUserDto: UpdateUserProfileDto): Promise<UserDto>;
    findByIds(userIds: Types.ObjectId[]): Promise<UserDto[] | null>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: AdminSearchUserQuerySortFilter, filters: AdminSearchUserQuerySortFilter[]): Promise<AdminSearchUsersRes>;
}
