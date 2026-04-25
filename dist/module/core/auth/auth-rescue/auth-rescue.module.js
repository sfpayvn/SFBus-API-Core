"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRescueModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const auth_rescue_controller_1 = require("./auth-rescue.controller");
const auth_rescue_service_1 = require("./auth-rescue.service");
const auth_rescue_schema_1 = require("./schema/auth-rescue.schema");
let AuthRescueModule = class AuthRescueModule {
};
exports.AuthRescueModule = AuthRescueModule;
exports.AuthRescueModule = AuthRescueModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: auth_rescue_schema_1.AuthRescueDocument.name, schema: auth_rescue_schema_1.AuthRescueSchema }])],
        providers: [auth_rescue_service_1.AuthRescueService],
        controllers: [auth_rescue_controller_1.AuthRescueController],
        exports: [auth_rescue_service_1.AuthRescueService, mongoose_1.MongooseModule],
    })
], AuthRescueModule);
//# sourceMappingURL=auth-rescue.module.js.map