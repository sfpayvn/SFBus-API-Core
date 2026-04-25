"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PosSettingsModule = void 0;
const common_1 = require("@nestjs/common");
const pos_settings_controller_1 = require("./pos-settings.controller");
const settings_module_1 = require("../../core/settings/settings.module");
const app_version_service_1 = require("./services/app-version.service");
let PosSettingsModule = class PosSettingsModule {
};
exports.PosSettingsModule = PosSettingsModule;
exports.PosSettingsModule = PosSettingsModule = __decorate([
    (0, common_1.Module)({
        imports: [settings_module_1.SettingsModule],
        controllers: [pos_settings_controller_1.PosSettingsController],
        providers: [app_version_service_1.PosAppVersionService],
        exports: [app_version_service_1.PosAppVersionService],
    })
], PosSettingsModule);
//# sourceMappingURL=pos-settings.module.js.map