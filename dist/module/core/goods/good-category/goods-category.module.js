"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoodsCategoryModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const goods_category_service_1 = require("./goods-category-service");
const goods__categoryschema_1 = require("./schema/goods.-categoryschema");
const goods_category_controller_1 = require("./goods-category.controller");
let GoodsCategoryModule = class GoodsCategoryModule {
};
exports.GoodsCategoryModule = GoodsCategoryModule;
exports.GoodsCategoryModule = GoodsCategoryModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: goods__categoryschema_1.GoodsCategoryDocument.name, schema: goods__categoryschema_1.GoodsCategorySchema }])],
        providers: [goods_category_service_1.GoodsCategoryService],
        controllers: [goods_category_controller_1.GoodsCategoryController],
        exports: [goods_category_service_1.GoodsCategoryService],
    })
], GoodsCategoryModule);
//# sourceMappingURL=goods-category.module.js.map