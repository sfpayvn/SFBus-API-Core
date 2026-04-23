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
exports.ClientAuthRescueController = void 0;
const common_1 = require("@nestjs/common");
const client_auth_rescue_service_1 = require("./client-auth-rescue.service");
const client_auth_rescue_dto_1 = require("./dto/client-auth-rescue.dto");
const parse_objectId_pipe_1 = require("../../../../common/pipes/parse-objectId.pipe");
let ClientAuthRescueController = class ClientAuthRescueController {
    constructor(ClientAuthRescueService) {
        this.ClientAuthRescueService = ClientAuthRescueService;
    }
    async request(ClientRequestAuthRescueDto, tenantCode) {
        const res = await this.ClientAuthRescueService.requestAuthRescue(ClientRequestAuthRescueDto.identifier, tenantCode, ClientRequestAuthRescueDto.purpose);
        return res;
    }
    async verify(ClientVerifyAuthRescueDto, tenantCode) {
        return this.ClientAuthRescueService.verifyAuthRescueAndLogin(ClientVerifyAuthRescueDto.identifier, tenantCode, ClientVerifyAuthRescueDto.purpose, ClientVerifyAuthRescueDto.token);
    }
};
exports.ClientAuthRescueController = ClientAuthRescueController;
__decorate([
    (0, common_1.Post)('request'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Headers)('x-tenant-code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_auth_rescue_dto_1.ClientRequestAuthRescueDto, String]),
    __metadata("design:returntype", Promise)
], ClientAuthRescueController.prototype, "request", null);
__decorate([
    (0, common_1.Post)('verify'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Headers)('x-tenant-code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_auth_rescue_dto_1.ClientVerifyAuthRescueDto, String]),
    __metadata("design:returntype", Promise)
], ClientAuthRescueController.prototype, "verify", null);
exports.ClientAuthRescueController = ClientAuthRescueController = __decorate([
    (0, common_1.Controller)('client/auth/rescue'),
    __metadata("design:paramtypes", [client_auth_rescue_service_1.ClientAuthRescueService])
], ClientAuthRescueController);
//# sourceMappingURL=client-auth-rescue.controller.js.map