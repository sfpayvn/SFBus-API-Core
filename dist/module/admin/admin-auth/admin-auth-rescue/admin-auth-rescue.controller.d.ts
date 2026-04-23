import { AdminAuthRescueService } from './admin-auth-rescue.service';
import { AdminRequestAuthRescueDto, AdminVerifyAuthRescueDto } from './dto/admin-auth-rescue.dto';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
export declare class AdminAuthRescueController {
    private readonly adminAuthRescueService;
    constructor(adminAuthRescueService: AdminAuthRescueService);
    request(user: UserTokenDto, adminRequestAuthRescueDto: AdminRequestAuthRescueDto): Promise<{
        expiresAt: Date;
        debugToken: string;
    }>;
    verify(user: UserTokenDto, adminVerifyAuthRescueDto: AdminVerifyAuthRescueDto): Promise<boolean>;
}
