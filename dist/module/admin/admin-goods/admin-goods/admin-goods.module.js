"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGoodsModule = void 0;
const goods_schema_1 = require("../../../core/goods/goods/schema/goods.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const admin_goods_service_1 = require("./admin-goods-service");
const admin_goods_controller_1 = require("./admin-goods.controller");
const goods_module_1 = require("../../../core/goods/goods/goods.module");
let AdminGoodsModule = class AdminGoodsModule {
};
exports.AdminGoodsModule = AdminGoodsModule;
exports.AdminGoodsModule = AdminGoodsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: goods_schema_1.GoodsDocument.name, schema: goods_schema_1.GoodsSchema }]),
            (0, common_1.forwardRef)(() => goods_module_1.GoodsModule),
        ],
        providers: [admin_goods_service_1.AdminGoodsService],
        controllers: [admin_goods_controller_1.AdminGoodsController],
        exports: [admin_goods_service_1.AdminGoodsService],
    })
], AdminGoodsModule);
//# sourceMappingURL=admin-goods.module.js.map