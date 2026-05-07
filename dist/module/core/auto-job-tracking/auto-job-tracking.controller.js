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
exports.AutoJobTrackingController = void 0;
const common_1 = require("@nestjs/common");
const auto_job_tracking_service_1 = require("./auto-job-tracking.service");
const jwt_auth_guard_1 = require("../../../guards/jwt-auth.guard");
const roles_guard_1 = require("../../../guards/roles.guard");
const current_user_decorator_1 = require("../../../decorators/current-user.decorator");
const parse_objectId_pipe_1 = require("../../../common/pipes/parse-objectId.pipe");
const user_token_dto_1 = require("../../../jwt/dto/user-token.dto");
const timezone_decorator_1 = require("../../../decorators/timezone.decorator");
let AutoJobTrackingController = class AutoJobTrackingController {
    constructor(autoJobTrackingService) {
        this.autoJobTrackingService = autoJobTrackingService;
    }
    async tryRun(user, jobName = 'auto_schedule', timezoneOffset) {
        const ran = await this.autoJobTrackingService.tryRunToday(user.tenantId, jobName, timezoneOffset);
        return { ran };
    }
    async reset(user, jobName, timezoneOffset) {
        await this.autoJobTrackingService.resetToday(user.tenantId, jobName, timezoneOffset);
        return { ok: true };
    }
    async status(user, jobName, timezoneOffset) {
        const ranToday = await this.autoJobTrackingService.hasRanToday(user.tenantId, jobName, timezoneOffset);
        return { jobName, ranToday };
    }
};
exports.AutoJobTrackingController = AutoJobTrackingController;
__decorate([
    (0, common_1.Post)('try-run'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Query)('jobName')),
    __param(2, (0, timezone_decorator_1.TimezoneOffset)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.UserTokenDto, String, Number]),
    __metadata("design:returntype", Promise)
], AutoJobTrackingController.prototype, "tryRun", null);
__decorate([
    (0, common_1.Delete)('reset/:jobName'),
    __param(0, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Param)('jobName')),
    __param(2, (0, timezone_decorator_1.TimezoneOffset)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.UserTokenDto, String, Number]),
    __metadata("design:returntype", Promise)
], AutoJobTrackingController.prototype, "reset", null);
__decorate([
    (0, common_1.Get)('status/:jobName'),
    __param(0, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Param)('jobName')),
    __param(2, (0, timezone_decorator_1.TimezoneOffset)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.UserTokenDto, String, Number]),
    __metadata("design:returntype", Promise)
], AutoJobTrackingController.prototype, "status", null);
exports.AutoJobTrackingController = AutoJobTrackingController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('auto-job-tracking'),
    __metadata("design:paramtypes", [auto_job_tracking_service_1.AutoJobTrackingService])
], AutoJobTrackingController);
//# sourceMappingURL=auto-job-tracking.controller.js.map