"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const admin_module_1 = require("./module/admin/admin.module");
const pos_module_1 = require("./module/pos/pos.module");
const client_module_1 = require("./module/client/client.module");
const driver_module_1 = require("./module/driver/driver.module");
const module_flags_1 = require("./common/module-flags");
const core_module_1 = require("./module/core/core.module");
const enabled = (0, module_flags_1.parseModules)(process.env.APP_MODULES);
const featureModules = [
    enabled.has('admin') ? admin_module_1.AdminModule : null,
    enabled.has('pos') ? pos_module_1.PosModule : null,
    enabled.has('client') ? client_module_1.ClientModule : null,
    enabled.has('driver') ? driver_module_1.DriverModule : null,
].filter(Boolean);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: `.env`,
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    uri: configService.get('MONGODB_URI'),
                }),
                inject: [config_1.ConfigService],
            }),
            core_module_1.CoreModule,
            ...featureModules,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map