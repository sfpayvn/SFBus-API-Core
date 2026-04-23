import { AdminUserPosService } from './admin-user-pos.service';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { Types } from 'mongoose';
import { AdminSearchUsersQuery } from '../admin-user-main/dto/admin-user.dto';
import { AdminUpdateUserProfileDto } from '../admin-user-main/dto/admin-update-user.dto';
import { AdminCreateUserDto } from '../admin-user-main/dto/admin-create-user.dto';
export declare class AdminUserPosController {
    private adminUserPosService;
    constructor(adminUserPosService: AdminUserPosService);
    register(adminCreateUserDto: AdminCreateUserDto, cUser: UserTokenDto): Promise<import("../admin-user-main/dto/admin-user.dto").AdminUserDto>;
    updateProfile(user: UserTokenDto, adminUpdateUserProfileDto: AdminUpdateUserProfileDto): Promise<boolean>;
    setPasswordAsTemp(userId: Types.ObjectId, body: any, user: UserTokenDto): Promise<boolean>;
    delete(id: Types.ObjectId, user: UserTokenDto): Promise<boolean>;
    search(query: AdminSearchUsersQuery, user: UserTokenDto): Promise<import("../admin-user-main/dto/admin-user.dto").AdminSearchUsersRes>;
}
