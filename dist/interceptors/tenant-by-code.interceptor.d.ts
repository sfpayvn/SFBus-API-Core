import { TenantService } from '@/module/core/tenant/tenant.service';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class TenantByCodeInterceptor implements NestInterceptor {
    private readonly clientTenantService;
    constructor(clientTenantService: TenantService);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
}
