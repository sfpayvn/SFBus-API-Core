"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PosDriverModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const pos_driver_service_1 = require("./pos-driver.service");
const pos_driver_controller_1 = require("./pos-driver.controller");
const pos_user_module_1 = require("../pos-user-main/pos-user.module");
const driver_module_1 = require("../../../core/user/driver/driver.module");
const driver_schema_1 = require("../../../core/user/driver/schema/driver.schema");
let PosDriverModule = class PosDriverModule {
};
exports.PosDriverModule = PosDriverModule;
exports.PosDriverModule = PosDriverModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => driver_module_1.DriverModule),
            (0, common_1.forwardRef)(() => pos_user_module_1.PosUserModule),
            mongoose_1.MongooseModule.forFeature([{ name: driver_schema_1.DriverDocument.name, schema: driver_schema_1.DriverSchema }]),
        ],
        providers: [pos_driver_service_1.PosDriverService],
        controllers: [pos_driver_controller_1.PosDriverController],
        exports: [pos_driver_service_1.PosDriverService],
    })
], PosDriverModule);
//# sourceMappingURL=pos-driver.module.js.map