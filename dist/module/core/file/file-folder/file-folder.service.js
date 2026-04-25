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
exports.FileFolderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const file_folder_dto_1 = require("./dto/file-folder.dto");
const file_folder_schema_1 = require("./schema/file-folder.schema");
const class_transformer_1 = require("class-transformer");
let FileFolderService = class FileFolderService {
    constructor(fileFolderModel) {
        this.fileFolderModel = fileFolderModel;
    }
    async create(createFileFolderDto, tenantId) {
        const createFileFolder = new this.fileFolderModel({ ...createFileFolderDto, tenantId });
        const savedFileFolder = await createFileFolder.save();
        return (0, class_transformer_1.plainToInstance)(file_folder_dto_1.FileFolderDto, savedFileFolder);
    }
    async findAll(tenantId) {
        const fileFolders = await this.fileFolderModel.find({ tenantId }).lean().exec();
        return fileFolders.map((fileFolder) => (0, class_transformer_1.plainToInstance)(file_folder_dto_1.FileFolderDto, fileFolder));
    }
    async findOne(id, tenantId) {
        const fileFolder = await this.fileFolderModel.findOne({ _id: id, tenantId }).lean().exec();
        if (!fileFolder) {
            throw new common_1.NotFoundException(`File folder with ID "${id}" not found.`);
        }
        return (0, class_transformer_1.plainToInstance)(file_folder_dto_1.FileFolderDto, fileFolder);
    }
    async update(updateFileFolderDto, tenantId) {
        const updatedFileFolder = await this.fileFolderModel
            .findOneAndUpdate({ _id: updateFileFolderDto._id, tenantId }, updateFileFolderDto, { new: true })
            .lean()
            .exec();
        if (!updatedFileFolder) {
            throw new common_1.NotFoundException(`File folder with ID "${updateFileFolderDto._id}" not found.`);
        }
        return (0, class_transformer_1.plainToInstance)(file_folder_dto_1.FileFolderDto, updatedFileFolder);
    }
    async delete(id, tenantId) {
        const result = await this.fileFolderModel.findOneAndDelete({ _id: id, tenantId }).lean().exec();
        return result !== null;
    }
};
exports.FileFolderService = FileFolderService;
exports.FileFolderService = FileFolderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(file_folder_schema_1.FileFolderDocument.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FileFolderService);
//# sourceMappingURL=file-folder.service.js.map