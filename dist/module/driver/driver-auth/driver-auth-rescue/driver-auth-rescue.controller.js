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
exports.DriverAuthRescueController = void 0;
const common_1 = require("@nestjs/common");
const driver_auth_rescue_service_1 = require("./driver-auth-rescue.service");
const driver_auth_rescue_dto_1 = require("./dto/driver-auth-rescue.dto");
const parse_objectId_pipe_1 = require("../../../../common/pipes/parse-objectId.pipe");
const user_token_dto_1 = require("../../../../jwt/dto/user-token.dto");
const current_user_decorator_1 = require("../../../../decorators/current-user.decorator");
let DriverAuthRescueController = class DriverAuthRescueController {
    constructor(driverAuthRescueService) {
        this.driverAuthRescueService = driverAuthRescueService;
    }
    async request(user, driverRequestAuthRescueDto) {
        const { tenantId } = user;
        const res = await this.driverAuthRescueService.requestAuthRescue(driverRequestAuthRescueDto.identifier, driverRequestAuthRescueDto.purpose, tenantId);
        return res;
    }
    async verify(user, driverVerifyAuthRescueDto) {
        const { tenantId } = user;
        return this.driverAuthRescueService.verifyAuthRescue(driverVerifyAuthRescueDto.identifier, driverVerifyAuthRescueDto.purpose, driverVerifyAuthRescueDto.token, tenantId);
    }
};
exports.DriverAuthRescueController = DriverAuthRescueController;
__decorate([
    (0, common_1.Post)('request'),
    __param(0, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.UserTokenDto,
        driver_auth_rescue_dto_1.DriverRequestAuthRescueDto]),
    __metadata("design:returntype", Promise)
], DriverAuthRescueController.prototype, "request", null);
__decorate([
    (0, common_1.Post)('verify'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.UserTokenDto,
        driver_auth_rescue_dto_1.DriverVerifyAuthRescueDto]),
    __metadata("design:returntype", Promise)
], DriverAuthRescueController.prototype, "verify", null);
exports.DriverAuthRescueController = DriverAuthRescueController = __decorate([
    (0, common_1.Controller)('driver/auth/rescue'),
    __metadata("design:paramtypes", [driver_auth_rescue_service_1.DriverAuthRescueService])
], DriverAuthRescueController);
//# sourceMappingURL=driver-auth-rescue.controller.js.map