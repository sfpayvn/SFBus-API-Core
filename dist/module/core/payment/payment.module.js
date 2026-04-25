"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModule = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("./payment-service");
const mongoose_1 = require("@nestjs/mongoose");
const payment_schema_1 = require("./schema/payment.schema");
const payment_controller_1 = require("./payment.controller");
const booking_module_1 = require("../booking/booking.module");
const bus_schedule_layout_module_1 = require("../bus/bus-schedule-layout/bus-schedule-layout.module");
const goods_module_1 = require("../goods/goods/goods.module");
let PaymentModule = class PaymentModule {
};
exports.PaymentModule = PaymentModule;
exports.PaymentModule = PaymentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: payment_schema_1.PaymentDocument.name, schema: payment_schema_1.PaymentSchema }]),
            (0, common_1.forwardRef)(() => booking_module_1.BookingModule),
            (0, common_1.forwardRef)(() => goods_module_1.GoodsModule),
            (0, common_1.forwardRef)(() => bus_schedule_layout_module_1.BusScheduleLayoutModule),
        ],
        controllers: [payment_controller_1.PaymentController],
        providers: [payment_service_1.PaymentService],
        exports: [payment_service_1.PaymentService],
    })
], PaymentModule);
//# sourceMappingURL=payment.module.js.map