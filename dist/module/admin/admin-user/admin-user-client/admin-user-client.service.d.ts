import { Model, Types } from 'mongoose';
import { UserDocument } from '@/module/core/user/user/schema/user.schema';
import { AdminSearchUserQuerySortFilter, AdminSearchUsersRes, AdminUserDto } from '../admin-user-main/dto/admin-user.dto';
import { AdminCreateUserDto } from '../admin-user-main/dto/admin-create-user.dto';
import { AdminUpdateUserProfileDto, AdminUpdatePasswordUserDto } from '../admin-user-main/dto/admin-update-user.dto';
import { UserClientService } from '@/module/core/user/user-client/user_client.service';
export declare class AdminUserClientService {
    private userModel;
    private readonly userClientService;
    constructor(userModel: Model<UserDocument>, userClientService: UserClientService);
    create(adminCreateUserDto: AdminCreateUserDto, tenantId?: Types.ObjectId): Promise<AdminUserDto>;
    update(adminUpdateUserProfileDto: AdminUpdateUserProfileDto, tenantId: Types.ObjectId): Promise<boolean>;
    updateUserField(userId: Types.ObjectId, fieldName: string, value: any, tenantId: Types.ObjectId): Promise<AdminUserDto>;
    updatePassword(userId: Types.ObjectId, adminUpdatePasswordUserDto: AdminUpdatePasswordUserDto, tenantId: Types.ObjectId): Promise<boolean>;
    setPasswordAsTemp(userId: Types.ObjectId, tempPassword: string, tenantId: Types.ObjectId): Promise<boolean>;
    delete(id: Types.ObjectId): Promise<boolean>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: AdminSearchUserQuerySortFilter, filters: AdminSearchUserQuerySortFilter[], tenantId: Types.ObjectId): Promise<AdminSearchUsersRes>;
}
