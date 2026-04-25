import { DriverAuthRescueService } from './driver-auth-rescue.service';
import { DriverRequestAuthRescueDto, DriverVerifyAuthRescueDto } from './dto/driver-auth-rescue.dto';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
export declare class DriverAuthRescueController {
    private readonly driverAuthRescueService;
    constructor(driverAuthRescueService: DriverAuthRescueService);
    request(user: UserTokenDto, driverRequestAuthRescueDto: DriverRequestAuthRescueDto): Promise<{
        expiresAt: Date;
        debugToken: string;
    }>;
    verify(user: UserTokenDto, driverVerifyAuthRescueDto: DriverVerifyAuthRescueDto): Promise<boolean>;
}
