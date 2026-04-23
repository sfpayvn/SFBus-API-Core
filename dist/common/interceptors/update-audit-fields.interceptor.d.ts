import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
export interface UpdateAuditFieldsOptions {
    updateCreatedBy?: boolean;
    updateUpdatedBy?: boolean;
}
export declare class UpdateAuditFieldsInterceptor implements NestInterceptor {
    private readonly options;
    constructor(options?: UpdateAuditFieldsOptions);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    private updateAuditFields;
}
