"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PosUserModule = void 0;
const common_1 = require("@nestjs/common");
const pos_user_controller_1 = require("./pos-user.controller");
const pos_user_service_1 = require("./pos-user.service");
const user_module_1 = require("../../../core/user/user/user.module");
let PosUserModule = class PosUserModule {
};
exports.PosUserModule = PosUserModule;
exports.PosUserModule = PosUserModule = __decorate([
    (0, common_1.Module)({
        imports: [(0, common_1.forwardRef)(() => user_module_1.UserModule)],
        providers: [pos_user_service_1.PosUserService],
        controllers: [pos_user_controller_1.PosUserController],
        exports: [pos_user_service_1.PosUserService],
    })
], PosUserModule);
//# sourceMappingURL=pos-user.module.js.map