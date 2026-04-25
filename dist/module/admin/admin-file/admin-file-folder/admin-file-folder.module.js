"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminFileFolderModule = void 0;
const file_folder_schema_1 = require("../../../core/file/file-folder/schema/file-folder.schema");
const file_folder_module_1 = require("../../../core/file/file-folder/file-folder.module");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const admin_file_folder_controller_1 = require("./admin-file-folder.controller");
const admin_file_folder_service_1 = require("./admin-file-folder.service");
let AdminFileFolderModule = class AdminFileFolderModule {
};
exports.AdminFileFolderModule = AdminFileFolderModule;
exports.AdminFileFolderModule = AdminFileFolderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: file_folder_schema_1.FileFolderDocument.name, schema: file_folder_schema_1.FileFolderSchema }]),
            (0, common_1.forwardRef)(() => file_folder_module_1.FileFolderModule),
        ],
        controllers: [admin_file_folder_controller_1.AdminFileFolderController],
        providers: [admin_file_folder_service_1.AdminFileFolderService],
        exports: [admin_file_folder_service_1.AdminFileFolderService],
    })
], AdminFileFolderModule);
//# sourceMappingURL=admin-file-folder.module.js.map