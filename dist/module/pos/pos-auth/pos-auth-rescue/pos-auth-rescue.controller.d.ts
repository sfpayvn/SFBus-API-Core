import { PosAuthRescueService } from './pos-auth-rescue.service';
import { PosRequestAuthRescueDto, PosVerifyAuthRescueDto } from './dto/pos-auth-rescue.dto';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
export declare class PosAuthRescueController {
    private readonly PosAuthRescueService;
    constructor(PosAuthRescueService: PosAuthRescueService);
    request(user: UserTokenDto, PosRequestAuthRescueDto: PosRequestAuthRescueDto): Promise<{
        expiresAt: Date;
        debugToken: string;
    }>;
    verify(user: UserTokenDto, PosVerifyAuthRescueDto: PosVerifyAuthRescueDto): Promise<boolean>;
}
