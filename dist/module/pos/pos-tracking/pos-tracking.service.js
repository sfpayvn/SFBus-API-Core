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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PosTrackingService = void 0;
const common_1 = require("@nestjs/common");
const tracking_service_1 = require("../../core/tracking/tracking.service");
const roles_constants_1 = require("../../../common/constants/roles.constants");
let PosTrackingService = class PosTrackingService {
    constructor(trackingService) {
        this.trackingService = trackingService;
    }
    async create(createTrackingDto, tenantId) {
        return this.trackingService.create({ ...createTrackingDto, platform: roles_constants_1.ROLE_CONSTANTS.POS }, tenantId);
    }
    async findAll(tenantId) {
        return this.trackingService.findAll(tenantId);
    }
    async findOne(id, tenantId) {
        return this.trackingService.findOne(id, tenantId);
    }
    async findByType(type, tenantId) {
        return this.trackingService.findByType(type, tenantId);
    }
    async update(updateTrackingDto, tenantId) {
        return this.trackingService.update(updateTrackingDto, tenantId);
    }
    async remove(id, tenantId) {
        return this.trackingService.remove(id, tenantId);
    }
    async searchTracking(pageIdx, pageSize, keyword, sortBy, filters, tenantId) {
        return this.trackingService.searchTracking(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
    }
};
exports.PosTrackingService = PosTrackingService;
exports.PosTrackingService = PosTrackingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tracking_service_1.TrackingService])
], PosTrackingService);
//# sourceMappingURL=pos-tracking.service.js.map