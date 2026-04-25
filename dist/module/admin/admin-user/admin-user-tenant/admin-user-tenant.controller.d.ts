import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { Types } from 'mongoose';
import { AdminSearchUsersQuery } from '../admin-user-main/dto/admin-user.dto';
import { AdminUpdateUserProfileDto } from '../admin-user-main/dto/admin-update-user.dto';
import { AdminCreateUserDto } from '../admin-user-main/dto/admin-create-user.dto';
import { AdminUserTenantService } from './admin-user-tenant.service';
export declare class AdminUserTenantController {
    private adminUserTenantService;
    constructor(adminUserTenantService: AdminUserTenantService);
    register(adminCreateUserDto: AdminCreateUserDto): Promise<import("../../../core/user/user/dto/user.dto").UserDto>;
    updateProfile(adminUpdateUserProfileDto: AdminUpdateUserProfileDto): Promise<import("../../../core/user/user/dto/user.dto").UserDto>;
    setPasswordAsTemp(userId: Types.ObjectId, body: any, user: UserTokenDto): Promise<boolean>;
    delete(id: Types.ObjectId, user: UserTokenDto): Promise<boolean>;
    search(query: AdminSearchUsersQuery, user: UserTokenDto): Promise<import("../admin-user-main/dto/admin-user.dto").AdminSearchUsersRes>;
}
