"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminSeatTypeModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const admin_seat_type_controller_1 = require("./admin-seat-type.controller");
const admin_seat_type_service_1 = require("./admin-seat-type.service");
const seat_type_schema_1 = require("../../../core/seat/seat-type/schema/seat-type.schema");
const seat_type_module_1 = require("../../../core/seat/seat-type/seat-type.module");
let AdminSeatTypeModule = class AdminSeatTypeModule {
};
exports.AdminSeatTypeModule = AdminSeatTypeModule;
exports.AdminSeatTypeModule = AdminSeatTypeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: seat_type_schema_1.SeatTypeDocument.name, schema: seat_type_schema_1.SeatTypeSchema }]),
            (0, common_1.forwardRef)(() => seat_type_module_1.SeatTypeModule),
        ],
        controllers: [admin_seat_type_controller_1.AdminSeatTypeController],
        providers: [admin_seat_type_service_1.AdminSeatTypeService],
        exports: [admin_seat_type_service_1.AdminSeatTypeService],
    })
], AdminSeatTypeModule);
//# sourceMappingURL=admin-seat-type.module.js.map