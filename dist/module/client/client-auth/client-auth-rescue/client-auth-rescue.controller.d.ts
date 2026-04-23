import { ClientAuthRescueService } from './client-auth-rescue.service';
import { ClientRequestAuthRescueDto, ClientVerifyAuthRescueDto } from './dto/client-auth-rescue.dto';
export declare class ClientAuthRescueController {
    private readonly ClientAuthRescueService;
    constructor(ClientAuthRescueService: ClientAuthRescueService);
    request(ClientRequestAuthRescueDto: ClientRequestAuthRescueDto, tenantCode: string): Promise<{
        expiresAt: Date;
        debugToken: string;
    }>;
    verify(ClientVerifyAuthRescueDto: ClientVerifyAuthRescueDto, tenantCode: string): Promise<{
        access_token: string;
    } | undefined>;
}
