"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminFileFolderService = void 0;
const file_folder_schema_1 = require("../../../core/file/file-folder/schema/file-folder.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const file_folder_service_1 = require("../../../core/file/file-folder/file-folder.service");
let AdminFileFolderService = class AdminFileFolderService {
    constructor(fileFolderModel, fileFolderService) {
        this.fileFolderModel = fileFolderModel;
        this.fileFolderService = fileFolderService;
    }
    async create(adminCreateFileFolderDto, tenantId) {
        return this.fileFolderService.create(adminCreateFileFolderDto, tenantId);
    }
    async findAll(tenantId) {
        return this.fileFolderService.findAll(tenantId);
    }
    async findOne(id, tenantId) {
        return this.fileFolderService.findOne(id, tenantId);
    }
    async update(adminUpdateFileFolderDto, tenantId) {
        return this.fileFolderService.update(adminUpdateFileFolderDto, tenantId);
    }
    async delete(id, tenantId) {
        return this.fileFolderService.delete(id, tenantId);
    }
};
exports.AdminFileFolderService = AdminFileFolderService;
exports.AdminFileFolderService = AdminFileFolderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(file_folder_schema_1.FileFolderDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => file_folder_service_1.FileFolderService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        file_folder_service_1.FileFolderService])
], AdminFileFolderService);
//# sourceMappingURL=admin-file-folder.service.js.map