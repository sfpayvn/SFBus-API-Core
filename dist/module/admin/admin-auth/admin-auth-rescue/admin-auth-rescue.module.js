"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAuthRescueModule = void 0;
const common_1 = require("@nestjs/common");
const admin_auth_rescue_controller_1 = require("./admin-auth-rescue.controller");
const admin_auth_rescue_service_1 = require("./admin-auth-rescue.service");
const auth_rescue_module_1 = require("../../../core/auth/auth-rescue/auth-rescue.module");
const user_module_1 = require("../../../core/user/user/user.module");
let AdminAuthRescueModule = class AdminAuthRescueModule {
};
exports.AdminAuthRescueModule = AdminAuthRescueModule;
exports.AdminAuthRescueModule = AdminAuthRescueModule = __decorate([
    (0, common_1.Module)({
        imports: [(0, common_1.forwardRef)(() => auth_rescue_module_1.AuthRescueModule), (0, common_1.forwardRef)(() => user_module_1.UserModule)],
        providers: [admin_auth_rescue_service_1.AdminAuthRescueService],
        controllers: [admin_auth_rescue_controller_1.AdminAuthRescueController],
        exports: [admin_auth_rescue_service_1.AdminAuthRescueService],
    })
], AdminAuthRescueModule);
//# sourceMappingURL=admin-auth-rescue.module.js.map