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
exports.AutoJobController = void 0;
const common_1 = require("@nestjs/common");
const auto_job_service_1 = require("./auto-job.service");
const timezone_decorator_1 = require("../../../decorators/timezone.decorator");
let AutoJobController = class AutoJobController {
    constructor(autoJobService) {
        this.autoJobService = autoJobService;
    }
    async runEligibleTenants(moduleKey = 'bus-schedule-autogenerators', jobName = 'auto_schedule', timezoneOffset, secret) {
        console.log('🚀 ~ AutoJobController ~ runEligibleTenants ~ secret:', secret);
        if (secret !== process.env.CRON_SECRET) {
            throw new common_1.UnauthorizedException();
        }
        await this.autoJobService.tryRunTodayForEligibleTenants(moduleKey, jobName, timezoneOffset);
        return { ok: true };
    }
};
exports.AutoJobController = AutoJobController;
__decorate([
    (0, common_1.Post)('run-eligible-tenants-cron'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Query)('moduleKey')),
    __param(1, (0, common_1.Query)('jobName')),
    __param(2, (0, timezone_decorator_1.TimezoneOffset)()),
    __param(3, (0, common_1.Headers)('x-cron-secret')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, String]),
    __metadata("design:returntype", Promise)
], AutoJobController.prototype, "runEligibleTenants", null);
exports.AutoJobController = AutoJobController = __decorate([
    (0, common_1.Controller)('core/auto-job'),
    __metadata("design:paramtypes", [auto_job_service_1.AutoJobService])
], AutoJobController);
//# sourceMappingURL=auto-job.controller.js.map