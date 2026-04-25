"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverDriverModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const driver_driver_service_1 = require("./driver-driver.service");
const driver_driver_controller_1 = require("./driver-driver.controller");
const driver_user_module_1 = require("../driver-user-main/driver-user.module");
const driver_schema_1 = require("../../../core/user/driver/schema/driver.schema");
const driver_module_1 = require("../../../core/user/driver/driver.module");
let DriverDriverModule = class DriverDriverModule {
};
exports.DriverDriverModule = DriverDriverModule;
exports.DriverDriverModule = DriverDriverModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => driver_module_1.DriverModule),
            (0, common_1.forwardRef)(() => driver_user_module_1.DriverUserModule),
            mongoose_1.MongooseModule.forFeature([{ name: driver_schema_1.DriverDocument.name, schema: driver_schema_1.DriverSchema }]),
        ],
        providers: [driver_driver_service_1.DriverDriverService],
        controllers: [driver_driver_controller_1.DriverDriverController],
        exports: [driver_driver_service_1.DriverDriverService],
    })
], DriverDriverModule);
//# sourceMappingURL=driver-driver.module.js.map