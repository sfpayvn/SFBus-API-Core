import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { TenantSubscriptionUsageDocument } from './schema/tenant-subscription-usage.schema';
import { eqObjectId } from '@/utils/utils';
import { COMMON_STATUS } from '@/common/constants/status.constants';
import { TenantSubscriptionDocument } from '../tenant-subscription/schema/tenant-subscription.schema';
import { TenantSubscriptionService } from '../tenant-subscription/tenant-subscription.service';

type ConsumeParams = {
  subscriptionId: Types.ObjectId;
  subjectId: Types.ObjectId;
  moduleKey: string;
  functionKey?: string | null;
};

@Injectable()
export class TenantSubscriptionUsageService {
  constructor(
    @InjectModel(TenantSubscriptionUsageDocument.name)
    private readonly usageModel: Model<TenantSubscriptionUsageDocument>,
    @Inject(forwardRef(() => TenantSubscriptionService))
    private readonly tenantSubscriptionService: TenantSubscriptionService,
  ) {}

  private getWindow(now: Date, unit: string, size = 1) {
    const s = new Date(now),
      e = new Date(now);
    switch (unit) {
      case 'minute':
        s.setSeconds(0, 0);
        e.setSeconds(0, 0);
        e.setMinutes(e.getMinutes() + size);
        break;
      case 'hour':
        s.setMinutes(0, 0, 0);
        e.setMinutes(0, 0, 0);
        e.setHours(e.getHours() + size);
        break;
      case 'day':
        s.setHours(0, 0, 0, 0);
        e.setHours(0, 0, 0, 0);
        e.setDate(e.getDate() + size);
        break;
      case 'week': {
        const d = s.getDay(),
          m = (d + 6) % 7;
        s.setHours(0, 0, 0, 0);
        s.setDate(s.getDate() - m);
        e.setHours(0, 0, 0, 0);
        e.setDate(s.getDate() + 7 * size);
        break;
      }
      case 'month':
        s.setDate(1);
        s.setHours(0, 0, 0, 0);
        e.setDate(1);
        e.setHours(0, 0, 0, 0);
        e.setMonth(e.getMonth() + size);
        break;
      case 'lifetime':
        return { start: new Date(0), end: new Date(8640000000000000) };
      default:
        throw new Error('Unsupported window unit');
    }
    return { start: s, end: e };
  }

  private resolveRule(subscription: any, moduleKey: string, functionKey?: string | null) {
    const lim = subscription?.limitationSnapshot;
    const mod = lim?.modules?.find((m: any) => m.key === moduleKey);
    if (!mod) return null;

    if (functionKey) {
      const fn = mod.functions?.find((f: any) => f.key === functionKey);
      if (fn) return fn;
      if (mod.moduleRule) return mod.moduleRule;
      return null;
    }
    return mod.moduleRule ?? null; // module-level
  }

  async checkAndConsume(params: ConsumeParams) {
    const moduleKey = params.moduleKey.toLowerCase().trim();
    const functionKey = params.functionKey ? params.functionKey.toLowerCase().trim() : null;

    const sub = await this.tenantSubscriptionService.getActive(params.subjectId);
    if (!sub) {
      await this.tenantSubscriptionService.registerPopularSubscription(params.subjectId).catch(() => {});
      return this.checkAndConsume(params);
    }

    // Check if subscription is expired
    const now = new Date();
    if (sub.endAt < now || sub.status === COMMON_STATUS.EXPIRED || sub.status === COMMON_STATUS.CANCELLED) {
      await this.tenantSubscriptionService.registerPopularSubscription(params.subjectId).catch(() => {});
      return this.checkAndConsume(params);
    }

    const rule = this.resolveRule(sub, moduleKey, functionKey);
    if (!rule) {
      const def = sub.limitationSnapshot?.defaultAction ?? 'block';
      return def === 'allow' ? { allowed: true } : { allowed: false, reason: 'no_rule' };
    }
    if (rule.type === 'unlimited') return { allowed: true };

    const { start, end } = this.getWindow(now, rule.windowUnit ?? 'month', rule.windowSize ?? 1);

    const filter = {
      subjectId: params.subjectId,
      subscriptionId: sub._id,
      moduleKey,
      functionKey, // null = module-level
      windowStart: start,
      windowEnd: end,
    };

    // tăng used nếu đã có doc và còn quota
    const inc = await this.usageModel
      .findOneAndUpdate(
        { ...filter, used: { $lt: rule.quota ?? 0 } },
        {
          $inc: { used: 1 },
          $set: {
            windowType: rule.windowType ?? 'calendar',
            windowUnit: rule.windowUnit ?? 'month',
            windowSize: rule.windowSize ?? 1,
            quota: rule.quota ?? 0,
          },
        },
        { new: true },
      )
      .exec();

    if (inc) {
      const remaining = Math.max(0, (inc.quota ?? 0) - inc.used);
      return { allowed: true, remaining, resetAt: end };
    }

    // nếu không tìm được, check xem đã vượt quota hay chưa
    const existing = await this.usageModel.findOne(filter).lean().exec();
    if (existing) {
      // doc tồn tại nhưng đã vượt quota
      return { allowed: false, reason: 'quota_exceeded' };
    }

    if ((rule.quota ?? 0) < 1) return { allowed: false, reason: 'quota_zero' };

    // tạo doc mới (used=1)
    try {
      const created = await this.usageModel.create({
        ...filter,
        windowType: rule.windowType ?? 'calendar',
        windowUnit: rule.windowUnit ?? 'month',
        windowSize: rule.windowSize ?? 1,
        used: 1,
        quota: rule.quota,
      });
      const remaining = Math.max(0, (created.quota ?? 0) - created.used);
      return { allowed: true, remaining, resetAt: end };
    } catch (e: any) {
      if (e?.code === 11000) {
        // doc được tạo bởi request khác, check xem đã vượt quota
        return { allowed: false, reason: 'quota_exceeded' };
      }
      return { allowed: false, reason: 'quota_exceeded' };
    }
  }

  async buildCapabilities(subjectIdRaw: any) {
    const subjectId = new Types.ObjectId(subjectIdRaw);

    const isRootMatch = eqObjectId(subjectId, process.env.ROOT_TENANT_ID);

    if (isRootMatch) {
      return { defaultAction: 'allow', items: [] as CapabilityItem[] };
    }

    const sub = await this.tenantSubscriptionService.getActive(subjectId);
    if (!sub) {
      await this.tenantSubscriptionService.registerPopularSubscription(subjectId).catch(() => {});
      return this.buildCapabilities(subjectId);
    }

    // Check if subscription is expired
    const now = new Date();
    if (sub.endAt < now || sub.status === COMMON_STATUS.EXPIRED || sub.status === COMMON_STATUS.CANCELLED) {
      await this.tenantSubscriptionService.registerPopularSubscription(subjectId).catch(() => {});
      return this.buildCapabilities(subjectId);
    }

    const items: CapabilityItem[] = [];

    for (const m of sub.limitationSnapshot?.modules ?? []) {
      // module-level rule
      if (m.moduleRule) {
        const { windowUnit = 'month', windowSize = 1, type = 'count', quota = 0 } = m.moduleRule;
        const { start, end } = this.getWindow(now, windowUnit, windowSize);
        let remaining: number | null = null;
        if (type === 'count') {
          const usage = await this.usageModel
            .findOne({
              subjectId,
              moduleKey: m.key,
              functionKey: null,
              windowStart: start,
              windowEnd: end,
            })
            .lean()
            .exec();
          const used = usage?.used ?? 0;
          remaining = Math.max(0, (quota ?? 0) - used);
        }
        items.push({
          moduleKey: m.key,
          functionKey: null,
          type,
          quota: type === 'unlimited' ? null : (quota ?? 0),
          remaining: type === 'unlimited' ? null : remaining,
          resetAt: type === 'unlimited' ? null : end.toISOString(),
        });
      }
      // function-level rules
      for (const f of m.functions ?? []) {
        const { windowUnit = 'month', windowSize = 1, type = 'count', quota = 0 } = f;
        const { start, end } = this.getWindow(now, windowUnit, windowSize);
        let remaining: number | null = null;
        if (type === 'count') {
          const usage = await this.usageModel
            .findOne({
              subjectId,
              moduleKey: m.key,
              functionKey: f.key,
              windowStart: start,
              windowEnd: end,
            })
            .lean()
            .exec();
          const used = usage?.used ?? 0;
          remaining = Math.max(0, (quota ?? 0) - used);
        }
        items.push({
          moduleKey: m.key,
          functionKey: f.key,
          type,
          quota: type === 'unlimited' ? null : (quota ?? 0),
          remaining: type === 'unlimited' ? null : remaining,
          resetAt: type === 'unlimited' ? null : end.toISOString(),
        });
      }
    }

    return {
      defaultAction: sub.limitationSnapshot?.defaultAction ?? 'block',
      items,
    };
  }

  /**
   * Release quota when deleting a resource
   * Decrements the usage count by 1
   */
  async releaseQuota(params: ConsumeParams): Promise<{ success: boolean; remaining?: number; resetAt?: Date }> {
    const moduleKey = params.moduleKey.toLowerCase().trim();
    const functionKey = params.functionKey ? params.functionKey.toLowerCase().trim() : null;

    const sub = await this.tenantSubscriptionService.getActive(params.subjectId);
    if (!sub) return { success: false };

    const rule = this.resolveRule(sub, moduleKey, functionKey);
    if (!rule || rule.type === 'unlimited') return { success: true };

    const now = new Date();
    const { start, end } = this.getWindow(now, rule.windowUnit ?? 'month', rule.windowSize ?? 1);

    const filter = {
      subjectId: params.subjectId,
      subscriptionId: sub._id,
      moduleKey,
      functionKey,
      windowStart: start,
      windowEnd: end,
    };

    // Decrement used by 1, but not below 0
    const updated = await this.usageModel.findOneAndUpdate(filter, { $inc: { used: -1 } }, { new: true }).exec();

    // Ensure used doesn't go below 0
    if (updated && updated.used < 0) {
      await this.usageModel.updateOne({ _id: updated._id }, { $set: { used: 0 } }).exec();
      const remaining = Math.max(0, updated.quota ?? 0);
      return { success: true, remaining, resetAt: end };
    }

    if (updated) {
      const remaining = Math.max(0, (updated.quota ?? 0) - updated.used);
      return { success: true, remaining, resetAt: end };
    }

    return { success: true };
  }
}
