"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoJobModule = void 0;
const common_1 = require("@nestjs/common");
const auto_job_service_1 = require("./auto-job.service");
const auto_job_controller_1 = require("./auto-job.controller");
const auto_job_tracking_module_1 = require("../auto-job-tracking/auto-job-tracking.module");
const tenant_subscription_module_1 = require("../tenant-subscription/tenant-subscription.module");
const bus_schedule_autogenerator_module_1 = require("../bus/bus-schedule-autogenerator/bus-schedule-autogenerator.module");
let AutoJobModule = class AutoJobModule {
};
exports.AutoJobModule = AutoJobModule;
exports.AutoJobModule = AutoJobModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => auto_job_tracking_module_1.AutoJobTrackingModule),
            (0, common_1.forwardRef)(() => tenant_subscription_module_1.TenantSubscriptionModule),
            (0, common_1.forwardRef)(() => bus_schedule_autogenerator_module_1.BusScheduleAutogeneratorModule),
        ],
        controllers: [auto_job_controller_1.AutoJobController],
        providers: [auto_job_service_1.AutoJobService],
        exports: [auto_job_service_1.AutoJobService],
    })
], AutoJobModule);
//# sourceMappingURL=auto-job.module.js.map