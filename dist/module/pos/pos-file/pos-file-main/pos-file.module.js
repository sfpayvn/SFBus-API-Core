"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PosFileModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const pos_file_service_1 = require("./pos-file.service");
const pos_file_controller_1 = require("./pos-file.controller");
const file_schema_1 = require("../../../core/file/file/schema/file.schema");
const file_module_1 = require("../../../core/file/file/file.module");
let PosFileModule = class PosFileModule {
};
exports.PosFileModule = PosFileModule;
exports.PosFileModule = PosFileModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forFeature([{ name: file_schema_1.FileDocument.name, schema: file_schema_1.FileSchema }]),
            (0, common_1.forwardRef)(() => file_module_1.FileModule),
        ],
        providers: [pos_file_service_1.PosFileService],
        controllers: [pos_file_controller_1.PosUploadController],
    })
], PosFileModule);
//# sourceMappingURL=pos-file.module.js.map