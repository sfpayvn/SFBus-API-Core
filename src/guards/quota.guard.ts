// src/common/guards/quota.guard.ts
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Types } from 'mongoose';
import { TenantSubscriptionUsageService } from '@/module/core/tenant-subscription-usage/tenant-subscription-usage.service';
import { FEATURE_META_KEY } from '@/decorators/feature.decorator';
import { ACTIONQUOTA_KEYS, CRUD_OPERATIONS, FUNCTION_KEYS } from '@/common/constants/module-function-keys';

@Injectable()
export class QuotaGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private tenantSubscriptionUsageService: TenantSubscriptionUsageService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const feature = this.reflector.get<{ moduleKey: string; functionKey: string | null; actionQuotaKey?: string }>(
      FEATURE_META_KEY,
      ctx.getHandler(),
    );
    if (!feature) return true;

    const req = ctx.switchToHttp().getRequest<any>();
    const method = req.method?.toUpperCase();

    const subscriptionId = new Types.ObjectId(req.user.subscriptionId);
    const subjectId = new Types.ObjectId(req.user.tenantId ?? req.user._id);

    // Store feature info for interceptor to handle
    req.quotaInfo = {
      method,
      subscriptionId,
      subjectId,
      moduleKey: feature.moduleKey,
      functionKey: feature.functionKey,
    };

    // DELETE request: Skip quota check, will release in interceptor
    if (feature.actionQuotaKey === ACTIONQUOTA_KEYS.RELEASED) {
      const subscriptionId = new Types.ObjectId(req.user.subscriptionId);
      const subjectId = new Types.ObjectId(req.user.tenantId ?? req.user._id);

      // Release quota after successful deletion and get remaining info
      const result = await this.tenantSubscriptionUsageService.releaseQuota({
        subscriptionId,
        subjectId,
        moduleKey: feature.moduleKey,
        functionKey: feature.functionKey,
      });

      req.quota = {
        allowed: true,
        remaining: result.remaining ?? null,
        resetAt: result.resetAt?.getTime?.() ?? result.resetAt?.valueOf?.() ?? null,
      };
      return true;
    }

    // Other methods (POST, PUT, etc.): Check and consume quota
    const r = await this.tenantSubscriptionUsageService.checkAndConsume({
      subscriptionId,
      subjectId,
      moduleKey: feature.moduleKey,
      functionKey: feature.functionKey,
    });

    if (!r.allowed) {
      if (r.reason === 'subscription_not_found') throw new UnauthorizedException('No subscription');
      // Store quota info for interceptor
      req.quota = {
        allowed: false,
        reason: r.reason,
        remaining: 0,
        resetAt: r.resetAt?.getTime?.() ?? r.resetAt?.valueOf?.(),
      };
      return true;
    }

    // Store quota info for interceptor
    req.quota = { allowed: true, remaining: r.remaining, resetAt: r.resetAt?.getTime?.() ?? r.resetAt?.valueOf?.() };
    return true;
  }
}
