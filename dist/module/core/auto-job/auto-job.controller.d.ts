import { AutoJobService } from './auto-job.service';
export declare class AutoJobController {
    private readonly autoJobService;
    constructor(autoJobService: AutoJobService);
    runEligibleTenants(moduleKey: string | undefined, jobName: string | undefined, timezoneOffset: number, secret: string): Promise<{
        ok: boolean;
    }>;
}
