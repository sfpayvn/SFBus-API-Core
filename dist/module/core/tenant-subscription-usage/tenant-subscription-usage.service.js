"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantSubscriptionUsageService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const tenant_subscription_usage_schema_1 = require("./schema/tenant-subscription-usage.schema");
const utils_1 = require("../../../utils/utils");
const status_constants_1 = require("../../../common/constants/status.constants");
const tenant_subscription_service_1 = require("../tenant-subscription/tenant-subscription.service");
let TenantSubscriptionUsageService = class TenantSubscriptionUsageService {
    constructor(usageModel, tenantSubscriptionService) {
        this.usageModel = usageModel;
        this.tenantSubscriptionService = tenantSubscriptionService;
    }
    getWindow(now, unit, size = 1) {
        const s = new Date(now), e = new Date(now);
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
                const d = s.getDay(), m = (d + 6) % 7;
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
    resolveRule(subscription, moduleKey, functionKey) {
        const lim = subscription?.limitationSnapshot;
        const mod = lim?.modules?.find((m) => m.key === moduleKey);
        if (!mod)
            return null;
        if (functionKey) {
            const fn = mod.functions?.find((f) => f.key === functionKey);
            if (fn)
                return fn;
            if (mod.moduleRule)
                return mod.moduleRule;
            return null;
        }
        return mod.moduleRule ?? null;
    }
    async checkAndConsume(params) {
        const moduleKey = params.moduleKey.toLowerCase().trim();
        const functionKey = params.functionKey ? params.functionKey.toLowerCase().trim() : null;
        const sub = await this.tenantSubscriptionService.getActive(params.subjectId);
        if (!sub) {
            await this.tenantSubscriptionService.registerPopularSubscription(params.subjectId).catch(() => { });
            return this.checkAndConsume(params);
        }
        const now = new Date();
        if (sub.endAt < now || sub.status === status_constants_1.COMMON_STATUS.EXPIRED || sub.status === status_constants_1.COMMON_STATUS.CANCELLED) {
            await this.tenantSubscriptionService.registerPopularSubscription(params.subjectId).catch(() => { });
            return this.checkAndConsume(params);
        }
        const rule = this.resolveRule(sub, moduleKey, functionKey);
        if (!rule) {
            const def = sub.limitationSnapshot?.defaultAction ?? 'block';
            return def === 'allow' ? { allowed: true } : { allowed: false, reason: 'no_rule' };
        }
        if (rule.type === 'unlimited')
            return { allowed: true };
        const { start, end } = this.getWindow(now, rule.windowUnit ?? 'month', rule.windowSize ?? 1);
        const filter = {
            subjectId: params.subjectId,
            subscriptionId: sub._id,
            moduleKey,
            functionKey,
            windowStart: start,
            windowEnd: end,
        };
        const inc = await this.usageModel
            .findOneAndUpdate({ ...filter, used: { $lt: rule.quota ?? 0 } }, {
            $inc: { used: 1 },
            $set: {
                windowType: rule.windowType ?? 'calendar',
                windowUnit: rule.windowUnit ?? 'month',
                windowSize: rule.windowSize ?? 1,
                quota: rule.quota ?? 0,
            },
        }, { new: true })
            .exec();
        if (inc) {
            const remaining = Math.max(0, (inc.quota ?? 0) - inc.used);
            return { allowed: true, remaining, resetAt: end };
        }
        const existing = await this.usageModel.findOne(filter).lean().exec();
        if (existing) {
            return { allowed: false, reason: 'quota_exceeded' };
        }
        if ((rule.quota ?? 0) < 1)
            return { allowed: false, reason: 'quota_zero' };
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
        }
        catch (e) {
            if (e?.code === 11000) {
                return { allowed: false, reason: 'quota_exceeded' };
            }
            return { allowed: false, reason: 'quota_exceeded' };
        }
    }
    async buildCapabilities(subjectIdRaw) {
        const subjectId = new mongoose_2.Types.ObjectId(subjectIdRaw);
        const isRootMatch = (0, utils_1.eqObjectId)(subjectId, process.env.ROOT_TENANT_ID);
        if (isRootMatch) {
            return { defaultAction: 'allow', items: [] };
        }
        const sub = await this.tenantSubscriptionService.getActive(subjectId);
        if (!sub) {
            await this.tenantSubscriptionService.registerPopularSubscription(subjectId).catch(() => { });
            return this.buildCapabilities(subjectId);
        }
        const now = new Date();
        if (sub.endAt < now || sub.status === status_constants_1.COMMON_STATUS.EXPIRED || sub.status === status_constants_1.COMMON_STATUS.CANCELLED) {
            await this.tenantSubscriptionService.registerPopularSubscription(subjectId).catch(() => { });
            return this.buildCapabilities(subjectId);
        }
        const items = [];
        for (const m of sub.limitationSnapshot?.modules ?? []) {
            if (m.moduleRule) {
                const { windowUnit = 'month', windowSize = 1, type = 'count', quota = 0 } = m.moduleRule;
                const { start, end } = this.getWindow(now, windowUnit, windowSize);
                let remaining = null;
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
            for (const f of m.functions ?? []) {
                const { windowUnit = 'month', windowSize = 1, type = 'count', quota = 0 } = f;
                const { start, end } = this.getWindow(now, windowUnit, windowSize);
                let remaining = null;
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
    async releaseQuota(params) {
        const moduleKey = params.moduleKey.toLowerCase().trim();
        const functionKey = params.functionKey ? params.functionKey.toLowerCase().trim() : null;
        const sub = await this.tenantSubscriptionService.getActive(params.subjectId);
        if (!sub)
            return { success: false };
        const rule = this.resolveRule(sub, moduleKey, functionKey);
        if (!rule || rule.type === 'unlimited')
            return { success: true };
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
        const updated = await this.usageModel.findOneAndUpdate(filter, { $inc: { used: -1 } }, { new: true }).exec();
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
};
exports.TenantSubscriptionUsageService = TenantSubscriptionUsageService;
exports.TenantSubscriptionUsageService = TenantSubscriptionUsageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(tenant_subscription_usage_schema_1.TenantSubscriptionUsageDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => tenant_subscription_service_1.TenantSubscriptionService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        tenant_subscription_service_1.TenantSubscriptionService])
], TenantSubscriptionUsageService);
//# sourceMappingURL=tenant-subscription-usage.service.js.map