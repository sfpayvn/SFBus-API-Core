"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PosAuthRescueModule = void 0;
const common_1 = require("@nestjs/common");
const pos_auth_rescue_controller_1 = require("./pos-auth-rescue.controller");
const pos_auth_rescue_service_1 = require("./pos-auth-rescue.service");
const auth_rescue_module_1 = require("../../../core/auth/auth-rescue/auth-rescue.module");
let PosAuthRescueModule = class PosAuthRescueModule {
};
exports.PosAuthRescueModule = PosAuthRescueModule;
exports.PosAuthRescueModule = PosAuthRescueModule = __decorate([
    (0, common_1.Module)({
        imports: [(0, common_1.forwardRef)(() => auth_rescue_module_1.AuthRescueModule)],
        providers: [pos_auth_rescue_service_1.PosAuthRescueService],
        controllers: [pos_auth_rescue_controller_1.PosAuthRescueController],
        exports: [pos_auth_rescue_service_1.PosAuthRescueService],
    })
], PosAuthRescueModule);
//# sourceMappingURL=pos-auth-rescue.module.js.map