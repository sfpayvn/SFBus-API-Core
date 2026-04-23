"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoodsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const goods_service_1 = require("./goods-service");
const goods_schema_1 = require("./schema/goods.schema");
const goods_controller_1 = require("./goods.controller");
const goods_category_module_1 = require("../good-category/goods-category.module");
const bus_schedule_module_1 = require("../../bus/bus-schedule/bus-schedule.module");
const bus_route_module_1 = require("../../bus/bus-route/bus-route.module");
const good_gateway_1 = require("./good.gateway");
const file_module_1 = require("../../file/file/file.module");
const payment_module_1 = require("../../payment/payment.module");
let GoodsModule = class GoodsModule {
};
exports.GoodsModule = GoodsModule;
exports.GoodsModule = GoodsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: goods_schema_1.GoodsDocument.name, schema: goods_schema_1.GoodsSchema }]),
            (0, common_1.forwardRef)(() => bus_schedule_module_1.BusScheduleModule),
            (0, common_1.forwardRef)(() => bus_route_module_1.BusRouteModule),
            (0, common_1.forwardRef)(() => goods_category_module_1.GoodsCategoryModule),
            (0, common_1.forwardRef)(() => file_module_1.FileModule),
            (0, common_1.forwardRef)(() => payment_module_1.PaymentModule),
        ],
        providers: [goods_service_1.GoodsService, good_gateway_1.GoodsGateway],
        controllers: [goods_controller_1.GoodsController],
        exports: [goods_service_1.GoodsService],
    })
], GoodsModule);
//# sourceMappingURL=goods.module.js.map