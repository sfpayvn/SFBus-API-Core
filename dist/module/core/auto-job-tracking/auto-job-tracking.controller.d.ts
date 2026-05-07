import { AutoJobTrackingService } from './auto-job-tracking.service';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
export declare class AutoJobTrackingController {
    private readonly autoJobTrackingService;
    constructor(autoJobTrackingService: AutoJobTrackingService);
    tryRun(user: UserTokenDto, jobName: string | undefined, timezoneOffset: number): Promise<{
        ran: boolean;
    }>;
    reset(user: UserTokenDto, jobName: string, timezoneOffset: number): Promise<{
        ok: boolean;
    }>;
    status(user: UserTokenDto, jobName: string, timezoneOffset: number): Promise<{
        jobName: string;
        ranToday: boolean;
    }>;
}
