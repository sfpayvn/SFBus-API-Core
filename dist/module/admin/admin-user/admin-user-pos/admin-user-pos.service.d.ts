import { Model, Types } from 'mongoose';
import { UserDocument } from '@/module/core/user/user/schema/user.schema';
import { AdminSearchUserQuerySortFilter, AdminSearchUsersRes, AdminUserDto } from '../admin-user-main/dto/admin-user.dto';
import { UserPosService } from '@/module/core/user/user-pos/user_pos.service';
import { AdminCreateUserDto } from '../admin-user-main/dto/admin-create-user.dto';
import { AdminUpdateUserProfileDto, AdminUpdatePasswordUserDto } from '../admin-user-main/dto/admin-update-user.dto';
export declare class AdminUserPosService {
    private userModel;
    private readonly userPosService;
    constructor(userModel: Model<UserDocument>, userPosService: UserPosService);
    create(adminCreateUserDto: AdminCreateUserDto, tenantId?: Types.ObjectId): Promise<AdminUserDto>;
    update(adminUpdateUserProfileDto: AdminUpdateUserProfileDto, tenantId: Types.ObjectId): Promise<boolean>;
    updateUserField(userId: Types.ObjectId, fieldName: string, value: any, tenantId: Types.ObjectId): Promise<boolean>;
    updatePassword(userId: Types.ObjectId, adminUpdatePasswordUserDto: AdminUpdatePasswordUserDto, tenantId: Types.ObjectId): Promise<boolean>;
    setPasswordAsTemp(userId: Types.ObjectId, tempPassword: string, tenantId: Types.ObjectId): Promise<boolean>;
    delete(id: Types.ObjectId): Promise<boolean>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: AdminSearchUserQuerySortFilter, filters: AdminSearchUserQuerySortFilter[], tenantId: Types.ObjectId): Promise<AdminSearchUsersRes>;
}
