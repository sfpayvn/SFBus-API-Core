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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var AutoJobTrackingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoJobTrackingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const utils_1 = require("../../../utils/utils");
let AutoJobTrackingService = AutoJobTrackingService_1 = class AutoJobTrackingService {
    constructor(trackingModel) {
        this.trackingModel = trackingModel;
        this.ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';
        this.logger = new common_1.Logger(AutoJobTrackingService_1.name);
        this.trackingModel.collection.createIndex({ tenantId: 1, jobName: 1, runDate: 1 }, { unique: true }).catch(err => this.logger.warn('Index creation warning:', err.message));
    }
    async tryRunToday(tenantId, jobName = 'auto_schedule', timezoneOffset = 25200000) {
        const offsetMinutes = timezoneOffset / 60000;
        const today = (0, moment_timezone_1.default)().utcOffset(offsetMinutes).format('YYYY-MM-DD');
        try {
            const rootTenantId = (0, utils_1.toObjectId)(this.ROOT_TENANT_ID);
            if (tenantId == rootTenantId)
                return false;
            try {
                await this.trackingModel.deleteMany({ tenantId, runDate: { $lt: today } }).exec();
            }
            catch (cleanupErr) {
            }
            const result = await this.trackingModel.findOneAndUpdate({
                tenantId,
                jobName,
                runDate: today,
            }, {
                $setOnInsert: {
                    tenantId,
                    jobName,
                    runDate: today,
                    createdAt: new Date(),
                },
            }, {
                upsert: true,
                new: false,
            });
            if (!result) {
                return true;
            }
            else {
                this.logger.debug(`Job '${jobName}' already ran today for tenant ${tenantId}`);
                return false;
            }
        }
        catch (err) {
            if (err.code === 11000) {
                this.logger.debug(`Job '${jobName}' race condition handled for tenant ${tenantId}`);
                return false;
            }
            this.logger.error(`Error in tryRunToday for tenant ${tenantId}, job '${jobName}':`, err);
            return false;
        }
    }
};
exports.AutoJobTrackingService = AutoJobTrackingService;
exports.AutoJobTrackingService = AutoJobTrackingService = AutoJobTrackingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('AutoJobTracking')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AutoJobTrackingService);
//# sourceMappingURL=auto-job-tracking.service.js.map