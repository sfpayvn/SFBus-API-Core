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
var AutoJobService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoJobService = void 0;
const common_1 = require("@nestjs/common");
const auto_job_tracking_service_1 = require("../auto-job-tracking/auto-job-tracking.service");
const tenant_subscription_service_1 = require("../tenant-subscription/tenant-subscription.service");
const bus_schedule_autogenerator_service_1 = require("../bus/bus-schedule-autogenerator/bus-schedule-autogenerator.service");
let AutoJobService = AutoJobService_1 = class AutoJobService {
    constructor(autoJobTrackingService, tenantSubscriptionService, busScheduleAutogeneratorService) {
        this.autoJobTrackingService = autoJobTrackingService;
        this.tenantSubscriptionService = tenantSubscriptionService;
        this.busScheduleAutogeneratorService = busScheduleAutogeneratorService;
        this.logger = new common_1.Logger(AutoJobService_1.name);
    }
    async tryRunTodayForEligibleTenants(moduleKey, jobName = 'auto_schedule', timezoneOffset = 25200000) {
        const now = new Date();
        const subs = await this.tenantSubscriptionService.findAllRawActiveSubscriptions(now);
        const eligibleTenantIds = subs
            .filter((sub) => {
            const modules = sub.limitationSnapshot?.modules ?? [];
            const mod = modules.find((m) => m.key === moduleKey);
            if (!mod)
                return true;
            const rule = mod.moduleRule;
            if (!rule)
                return true;
            return !(rule.type === 'block' && (rule.quota ?? 0) === 0);
        })
            .map((sub) => sub.tenantId);
        for (const tenantId of eligibleTenantIds) {
            const shouldRun = await this.autoJobTrackingService.tryRunToday(tenantId, jobName, timezoneOffset);
            if (shouldRun) {
                this.busScheduleAutogeneratorService.generateSchedulesForToday(tenantId, timezoneOffset).catch((err) => {
                    this.logger.error(`generateSchedulesForToday failed for tenant ${tenantId}:`, err);
                });
            }
        }
    }
};
exports.AutoJobService = AutoJobService;
exports.AutoJobService = AutoJobService = AutoJobService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => auto_job_tracking_service_1.AutoJobTrackingService))),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => tenant_subscription_service_1.TenantSubscriptionService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => bus_schedule_autogenerator_service_1.BusScheduleAutogeneratorService))),
    __metadata("design:paramtypes", [auto_job_tracking_service_1.AutoJobTrackingService,
        tenant_subscription_service_1.TenantSubscriptionService,
        bus_schedule_autogenerator_service_1.BusScheduleAutogeneratorService])
], AutoJobService);
//# sourceMappingURL=auto-job.service.js.map