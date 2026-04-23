import { UserDocument } from '@/module/core/user/user/schema/user.schema';
import { Model, Types } from 'mongoose';
import { UserService } from '@/module/core/user/user/user.service';
import { AdminSearchUserQuerySortFilter, AdminSearchUsersRes, AdminUserDto } from './dto/admin-user.dto';
import { AdminCreateUserDto } from './dto/admin-create-user.dto';
import { AdminUpdatePasswordUserDto, AdminUpdateUserProfileDto } from './dto/admin-update-user.dto';
export declare class AdminUserMainService {
    private userModel;
    private readonly userService;
    constructor(userModel: Model<UserDocument>, userService: UserService);
    create(adminCreateUserDto: AdminCreateUserDto, tenantId?: Types.ObjectId): Promise<AdminUserDto>;
    update(adminUpdateUserProfileDto: AdminUpdateUserProfileDto, tenantId: Types.ObjectId): Promise<AdminUserDto>;
    updateUserField(userId: Types.ObjectId, fieldName: string, value: any, tenantId: Types.ObjectId): Promise<boolean>;
    updatePassword(userId: Types.ObjectId, adminUpdatePasswordUserDto: AdminUpdatePasswordUserDto, tenantId: Types.ObjectId): Promise<boolean>;
    setPasswordAsTemp(userId: Types.ObjectId, tempPassword: string, tenantId: Types.ObjectId): Promise<boolean>;
    delete(id: Types.ObjectId): Promise<boolean>;
    findById(userId: Types.ObjectId, tenantId: Types.ObjectId): Promise<AdminUserDto | null>;
    findByIds(userIds: Types.ObjectId[], tenantId: Types.ObjectId): Promise<AdminUserDto[] | null>;
    findByPhoneNumber(phoneNumber: string, tenantId?: Types.ObjectId): Promise<AdminUserDto | null>;
    findAll(tenantId: Types.ObjectId): Promise<AdminUserDto[]>;
    findAllByRole(role: string, tenantId: Types.ObjectId): Promise<AdminUserDto[]>;
    findOne(id: string, tenantId: Types.ObjectId): Promise<AdminUserDto>;
    findByPhone(phoneNumber: string, tenantId: Types.ObjectId): Promise<AdminUserDto>;
    findByEmail(email: string, tenantId: Types.ObjectId): Promise<AdminUserDto>;
    findOneByRole(role: string, tenantId: Types.ObjectId): Promise<AdminUserDto>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: AdminSearchUserQuerySortFilter, filters: AdminSearchUserQuerySortFilter[], tenantId: Types.ObjectId): Promise<AdminSearchUsersRes>;
}
