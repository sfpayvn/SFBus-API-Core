import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { PosUserService } from './pos-user.service';
import { PosRequestUpdateUserFieldDto } from './dto/pos-user.dto';
import { PosUpdatePasswordUserDto, PosUpdateUserProfileDto } from './dto/pos-update-user.dto';
export declare class PosUserController {
    private posUserService;
    constructor(posUserService: PosUserService);
    updateProfile(user: UserTokenDto, posUpdateUserProfileDto: PosUpdateUserProfileDto): Promise<import("./dto/pos-user.dto").PosUserDto>;
    updatePassword(user: UserTokenDto, updatePasswordUserDto: PosUpdatePasswordUserDto): Promise<{
        message: string;
        user: {
            email: string;
            name: string;
        };
    }>;
    updateUserField(PosRequestUpdateUserFieldDto: PosRequestUpdateUserFieldDto, user: UserTokenDto): Promise<import("./dto/pos-user.dto").PosUserDto>;
}
