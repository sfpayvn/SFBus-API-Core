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
exports.PosAuthRescueService = void 0;
const auth_rescue_service_1 = require("../../../core/auth/auth-rescue/auth-rescue.service");
const auth_rescue_schema_1 = require("../../../core/auth/auth-rescue/schema/auth-rescue.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let PosAuthRescueService = class PosAuthRescueService {
    constructor(authRescueModel, authRescueService) {
        this.authRescueModel = authRescueModel;
        this.authRescueService = authRescueService;
    }
    async requestAuthRescue(identifier, purpose, tenantId) {
        return this.authRescueService.requestAuthRescue(identifier, purpose, tenantId);
    }
    async verifyAuthRescue(identifier, purpose, token, tenantId) {
        return this.authRescueService.verifyAuthRescue(identifier, purpose, token, tenantId);
    }
};
exports.PosAuthRescueService = PosAuthRescueService;
exports.PosAuthRescueService = PosAuthRescueService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(auth_rescue_schema_1.AuthRescueDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_rescue_service_1.AuthRescueService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        auth_rescue_service_1.AuthRescueService])
], PosAuthRescueService);
//# sourceMappingURL=pos-auth-rescue.service.js.map