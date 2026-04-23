import { Model, Types } from 'mongoose';
import { UserDocument } from '@/module/core/user/user/schema/user.schema';
import { AdminSearchUserQuerySortFilter, AdminSearchUsersRes, AdminUserDto } from '../admin-user-main/dto/admin-user.dto';
import { AdminCreateUserDto } from '../admin-user-main/dto/admin-create-user.dto';
import { AdminUpdateUserProfileDto, AdminUpdatePasswordUserDto } from '../admin-user-main/dto/admin-update-user.dto';
import { UserTenantOperatorService } from '@/module/core/user/user-tenant-operator/user-tenant-operator.service';
export declare class AdminUserTenantOperatorService {
    private userModel;
    private readonly userTenantOperatorService;
    constructor(userModel: Model<UserDocument>, userTenantOperatorService: UserTenantOperatorService);
    create(adminCreateUserDto: AdminCreateUserDto, tenantId?: Types.ObjectId): Promise<AdminUserDto>;
    update(adminUpdateUserProfileDto: AdminUpdateUserProfileDto, tenantId: Types.ObjectId): Promise<AdminUserDto>;
    updateUserField(userId: Types.ObjectId, fieldName: string, value: any, tenantId: Types.ObjectId): Promise<AdminUserDto>;
    updatePassword(userId: Types.ObjectId, adminUpdatePasswordUserDto: AdminUpdatePasswordUserDto, tenantId: Types.ObjectId): Promise<AdminUserDto>;
    setPasswordAsTemp(userId: Types.ObjectId, tempPassword: string, tenantId: Types.ObjectId): Promise<boolean>;
    delete(id: Types.ObjectId): Promise<boolean>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: AdminSearchUserQuerySortFilter, filters: AdminSearchUserQuerySortFilter[], tenantId: Types.ObjectId): Promise<AdminSearchUsersRes>;
}
