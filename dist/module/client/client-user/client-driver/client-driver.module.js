"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientDriverModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const client_driver_service_1 = require("./client-driver.service");
const client_driver_controller_1 = require("./client-driver.controller");
const client_user_module_1 = require("../client-user-main/client-user.module");
const driver_module_1 = require("../../../core/user/driver/driver.module");
const driver_schema_1 = require("../../../core/user/driver/schema/driver.schema");
let ClientDriverModule = class ClientDriverModule {
};
exports.ClientDriverModule = ClientDriverModule;
exports.ClientDriverModule = ClientDriverModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => driver_module_1.DriverModule),
            (0, common_1.forwardRef)(() => client_user_module_1.ClientUserModule),
            mongoose_1.MongooseModule.forFeature([{ name: driver_schema_1.DriverDocument.name, schema: driver_schema_1.DriverSchema }]),
        ],
        providers: [client_driver_service_1.ClientDriverService],
        controllers: [client_driver_controller_1.ClientDriverController],
        exports: [client_driver_service_1.ClientDriverService],
    })
], ClientDriverModule);
//# sourceMappingURL=client-driver.module.js.map