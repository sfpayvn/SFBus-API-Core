"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGoodsCategoryModule = void 0;
const goods__categoryschema_1 = require("../../../core/goods/good-category/schema/goods.-categoryschema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const admin_goods_category_service_1 = require("./admin-goods-category-service");
const admin_goods_category_controller_1 = require("./admin-goods-category.controller");
const goods_category_module_1 = require("../../../core/goods/good-category/goods-category.module");
let AdminGoodsCategoryModule = class AdminGoodsCategoryModule {
};
exports.AdminGoodsCategoryModule = AdminGoodsCategoryModule;
exports.AdminGoodsCategoryModule = AdminGoodsCategoryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: goods__categoryschema_1.GoodsCategoryDocument.name, schema: goods__categoryschema_1.GoodsCategorySchema }]),
            (0, common_1.forwardRef)(() => goods_category_module_1.GoodsCategoryModule),
        ],
        providers: [admin_goods_category_service_1.AdminGoodsCategoryService],
        controllers: [admin_goods_category_controller_1.AdminGoodsCategoryController],
        exports: [admin_goods_category_service_1.AdminGoodsCategoryService],
    })
], AdminGoodsCategoryModule);
//# sourceMappingURL=admin-goods-category.module.js.map