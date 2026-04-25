// src/common/interceptors/quota-headers.interceptor.ts
import { CallHandler, ExecutionContext, Injectable, NestInterceptor, BadRequestException } from '@nestjs/common';
import { Observable, tap, throwError } from 'rxjs';
import type { FastifyReply } from 'fastify';

/**
 * Helper cho Fastify (không tách file).
 */
function setHdr(reply: FastifyReply, name: string, value?: string | number | null) {
  if (value === undefined || value === null) return;
  reply.header(name, String(value));
}

function exposeRateHdrs(reply: FastifyReply) {
  setHdr(reply, 'Access-Control-Expose-Headers', 'X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset');
}

@Injectable()
export class QuotaHeadersInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const reply = ctx.switchToHttp().getResponse<FastifyReply>();
    const req = ctx.switchToHttp().getRequest<any>();

    const applyHeaders = () => {
      const q = req.quota as { allowed?: boolean; remaining?: number | null; resetAt?: number | null; reason?: string } | undefined;

      if (!q) return; // không có thông tin quota => không set

      exposeRateHdrs(reply);

      if (q.allowed) {
        if (q.remaining != null) setHdr(reply, 'X-RateLimit-Remaining', q.remaining);
        if (q.resetAt != null) setHdr(reply, 'X-RateLimit-Reset', q.resetAt);
      } else {
        // quota exceeded => throw exception với headers
        setHdr(reply, 'X-RateLimit-Remaining', '0');
        if (q.resetAt != null) setHdr(reply, 'X-RateLimit-Reset', q.resetAt);
      }
    };

    const handleError = (error: any) => {
      applyHeaders();
      const q = req.quota as { allowed?: boolean; reason?: string } | undefined;
      if (q && !q.allowed) {
        // throw exception từ guard/interceptor
        throw new BadRequestException({ reason: q.reason || error.message });
      }
      throw error;
    };

    // Check quota before handle
    const q = req.quota as { allowed?: boolean } | undefined;
    if (q && !q.allowed) {
      applyHeaders();
      return throwError(() => new BadRequestException({ reason: req.quota.reason }));
    }

    return next.handle().pipe(tap({ next: applyHeaders, error: applyHeaders }));
  }
}
