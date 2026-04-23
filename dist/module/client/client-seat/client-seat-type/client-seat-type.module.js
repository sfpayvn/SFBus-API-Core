"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientSeatTypeModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const client_seat_type_controller_1 = require("./client-seat-type.controller");
const client_seat_type_service_1 = require("./client-seat-type.service");
const seat_type_schema_1 = require("../../../core/seat/seat-type/schema/seat-type.schema");
const seat_type_module_1 = require("../../../core/seat/seat-type/seat-type.module");
const client_tenant_module_1 = require("../../client-tenant/client-tenant.module");
const tenant_module_1 = require("../../../core/tenant/tenant.module");
let ClientSeatTypeModule = class ClientSeatTypeModule {
};
exports.ClientSeatTypeModule = ClientSeatTypeModule;
exports.ClientSeatTypeModule = ClientSeatTypeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: seat_type_schema_1.SeatTypeDocument.name, schema: seat_type_schema_1.SeatTypeSchema }]),
            (0, common_1.forwardRef)(() => seat_type_module_1.SeatTypeModule),
            (0, common_1.forwardRef)(() => client_tenant_module_1.ClientTenantModule),
            (0, common_1.forwardRef)(() => tenant_module_1.TenantModule),
        ],
        controllers: [client_seat_type_controller_1.ClientSeatTypeController],
        providers: [client_seat_type_service_1.ClientSeatTypeService],
        exports: [client_seat_type_service_1.ClientSeatTypeService],
    })
], ClientSeatTypeModule);
//# sourceMappingURL=client-seat-type.module.js.map