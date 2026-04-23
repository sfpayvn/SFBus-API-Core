"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeatTypeModule = void 0;
const common_1 = require("@nestjs/common");
const seat_type_service_1 = require("./seat-type.service");
const mongoose_1 = require("@nestjs/mongoose");
const seat_type_controller_1 = require("./seat-type.controller");
const seat_type_schema_1 = require("./schema/seat-type.schema");
let SeatTypeModule = class SeatTypeModule {
};
exports.SeatTypeModule = SeatTypeModule;
exports.SeatTypeModule = SeatTypeModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: seat_type_schema_1.SeatTypeDocument.name, schema: seat_type_schema_1.SeatTypeSchema }])],
        controllers: [seat_type_controller_1.SeatTypeController],
        providers: [seat_type_service_1.SeatTypeService],
        exports: [seat_type_service_1.SeatTypeService],
    })
], SeatTypeModule);
//# sourceMappingURL=seat-type.module.js.map