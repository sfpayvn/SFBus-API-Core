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
exports.AdminFileService = void 0;
const file_service_1 = require("../../../core/file/file/file.service");
const file_schema_1 = require("../../../core/file/file/schema/file.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let AdminFileService = class AdminFileService {
    constructor(fileModel, fileService) {
        this.fileModel = fileModel;
        this.fileService = fileService;
        this.ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';
    }
    async upload(request, folderId, tenantId, isMedia = false) {
        return this.fileService.upload(request, folderId, tenantId, isMedia);
    }
    async download(id, request, response, tenantId) {
        return this.fileService.download(id, request, response, tenantId);
    }
    async viewFile(id, response) {
        return this.fileService.viewFile(id, response);
    }
    async update(adminUpdateFileDto, tenantId) {
        return this.fileService.update(adminUpdateFileDto, tenantId);
    }
    async updateFilesFolder(adminUpdateFileDto, folderId, tenantId) {
        return this.fileService.updateFilesFolder(adminUpdateFileDto, folderId, tenantId);
    }
    async delete(id, tenantId) {
        return this.fileService.delete(id, tenantId);
    }
    async deleteFiles(ids, tenantId) {
        return this.fileService.deleteFiles(ids, tenantId);
    }
    async search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds, fileFolderId) {
        const res = await this.fileService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds, fileFolderId);
        const rootIdStr = this.ROOT_TENANT_ID;
        const files = (res.files ?? []).map((file) => {
            file.isDefault = file.tenantId.toString() === rootIdStr;
            if (file.isDefault) {
                file.isFavorite = false;
            }
            delete file.tenantId;
            delete file.tenantId;
            return file;
        });
        return { ...res, files };
    }
};
exports.AdminFileService = AdminFileService;
exports.AdminFileService = AdminFileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(file_schema_1.FileDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => file_service_1.FileService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        file_service_1.FileService])
], AdminFileService);
//# sourceMappingURL=admin-file.service.js.map