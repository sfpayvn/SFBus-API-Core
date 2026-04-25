import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { ClientUserService } from './client-user.service';
import { UserDto } from '@/module/core/user/user/dto/user.dto';
import { ClientRequestUpdateUserFieldDto } from './dto/client-user.dto';
import { UpdatePasswordUserDto } from '@/module/core/user/user/dto/update-user.dto';
import { ClientUpdateUserProfileDto } from './dto/client-update-user.dto';
export declare class ClientUserController {
    private clientUserService;
    constructor(clientUserService: ClientUserService);
    updateProfile(user: UserTokenDto, clientUpdateUserProfileDto: ClientUpdateUserProfileDto): Promise<import("./dto/client-user.dto").ClientUserDto>;
    updatePassword(user: UserTokenDto, updatePasswordUserDto: UpdatePasswordUserDto): Promise<{
        message: string;
        user: {
            email: string;
            name: string;
        };
    }>;
    findOne(id: string, user: UserTokenDto): Promise<import("./dto/client-user.dto").ClientUserDto>;
    findOneByRole(role: string, user: UserTokenDto): Promise<import("./dto/client-user.dto").ClientUserDto>;
    findAllByRole(role: string, user: UserTokenDto): Promise<import("./dto/client-user.dto").ClientUserDto[]>;
    findAll(user: UserTokenDto): Promise<import("./dto/client-user.dto").ClientUserDto[]>;
    getCurrentUser(user: UserTokenDto): Promise<UserDto>;
    updateUserField(clientRequestUpdateUserFieldDto: ClientRequestUpdateUserFieldDto, user: UserTokenDto): Promise<import("./dto/client-user.dto").ClientUserDto>;
}
