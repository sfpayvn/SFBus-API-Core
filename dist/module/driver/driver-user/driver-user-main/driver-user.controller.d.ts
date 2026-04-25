import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { DriverUserService } from './driver-user.service';
import { DriverRequestUpdateUserFieldDto } from './dto/driver-user.dto';
import { DriverUpdateUserProfileDto } from './dto/driver-update-user.dto';
export declare class DriverUserController {
    private driverUserService;
    constructor(driverUserService: DriverUserService);
    updateProfile(user: UserTokenDto, driverUpdateUserProfileDto: DriverUpdateUserProfileDto): Promise<import("./dto/driver-user.dto").DriverUserDto>;
    updateUserField(DriverRequestUpdateUserFieldDto: DriverRequestUpdateUserFieldDto, user: UserTokenDto): Promise<import("./dto/driver-user.dto").DriverUserDto>;
}
