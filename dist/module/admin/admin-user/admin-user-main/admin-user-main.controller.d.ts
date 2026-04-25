import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { AdminCreateUserDto } from './dto/admin-create-user.dto';
import { AdminRequestUpdateUserFieldDto, AdminSearchUsersQuery } from './dto/admin-user.dto';
import { AdminUpdateUserProfileDto } from './dto/admin-update-user.dto';
import { Types } from 'mongoose';
import { AdminUserMainService } from './admin-user-main.service';
export declare class AdminUserMainController {
    private adminUserMainService;
    constructor(adminUserMainService: AdminUserMainService);
    register(adminCreateUserDto: AdminCreateUserDto, cUser: UserTokenDto): Promise<import("./dto/admin-user.dto").AdminUserDto>;
    updateProfile(user: UserTokenDto, adminUpdateUserProfileDto: AdminUpdateUserProfileDto): Promise<import("./dto/admin-user.dto").AdminUserDto>;
    updateUserField(adminRequestUpdateUserFieldDto: AdminRequestUpdateUserFieldDto, user: UserTokenDto): Promise<boolean>;
    setPasswordAsTemp(userId: Types.ObjectId, body: any, user: UserTokenDto): Promise<boolean>;
    delete(id: Types.ObjectId): Promise<boolean>;
    findOne(id: string, user: UserTokenDto): Promise<import("./dto/admin-user.dto").AdminUserDto>;
    findOneByRole(role: string, user: UserTokenDto): Promise<import("./dto/admin-user.dto").AdminUserDto>;
    findAllByRole(role: string, user: UserTokenDto): Promise<import("./dto/admin-user.dto").AdminUserDto[]>;
    findAll(user: UserTokenDto): Promise<import("./dto/admin-user.dto").AdminUserDto[]>;
    search(query: AdminSearchUsersQuery, user: UserTokenDto): Promise<import("./dto/admin-user.dto").AdminSearchUsersRes>;
}
