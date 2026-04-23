"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverSeatTypeModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const driver_seat_type_controller_1 = require("./driver-seat-type.controller");
const driver_seat_type_service_1 = require("./driver-seat-type.service");
const seat_type_schema_1 = require("../../../core/seat/seat-type/schema/seat-type.schema");
const seat_type_module_1 = require("../../../core/seat/seat-type/seat-type.module");
let DriverSeatTypeModule = class DriverSeatTypeModule {
};
exports.DriverSeatTypeModule = DriverSeatTypeModule;
exports.DriverSeatTypeModule = DriverSeatTypeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: seat_type_schema_1.SeatTypeDocument.name, schema: seat_type_schema_1.SeatTypeSchema }]),
            (0, common_1.forwardRef)(() => seat_type_module_1.SeatTypeModule),
        ],
        controllers: [driver_seat_type_controller_1.DriverSeatTypeController],
        providers: [driver_seat_type_service_1.DriverSeatTypeService],
        exports: [driver_seat_type_service_1.DriverSeatTypeService],
    })
], DriverSeatTypeModule);
//# sourceMappingURL=driver-seat-type.module.js.map