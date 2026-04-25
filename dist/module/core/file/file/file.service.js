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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const file_schema_1 = require("./schema/file.schema");
const file_dto_1 = require("./dto/file.dto");
const class_transformer_1 = require("class-transformer");
const crypto_1 = require("crypto");
const slugify_1 = __importDefault(require("slugify"));
const mime_types_1 = require("mime-types");
let FileService = class FileService {
    constructor(fileModel, connection) {
        this.fileModel = fileModel;
        this.connection = connection;
        if (!this.connection.db) {
            throw new common_1.ServiceUnavailableException('Database connection is not available');
        }
        this.bucket = new mongoose_2.mongo.GridFSBucket(this.connection.db);
    }
    async upload(request, folderId, tenantId, isMedia = false) {
        const filesToUpload = [];
        const files = [];
        for await (const part of request.files()) {
            if (part.type === 'file') {
                const fileContent = await this.readFileContentBuffer(part.file);
                const hash = await this.calculateBufferHash(fileContent);
                const existingFile = await this.checkIfFileExists(hash);
                if (existingFile) {
                    files.push(existingFile);
                }
                else {
                    filesToUpload.push({ part, fileContent, hash });
                }
            }
        }
        await Promise.all(filesToUpload.map(async ({ part, fileContent, hash }) => {
            const id = new mongoose_2.Types.ObjectId();
            const uploadStream = this.bucket.openUploadStreamWithId(id, part.filename, {
                contentType: part.mimetype,
                metadata: {
                    hash,
                    folderId: folderId,
                    isFavorite: false,
                    tenantId,
                    isMedia,
                },
            });
            await new Promise((resolve, reject) => {
                uploadStream.end(fileContent, (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
            const port = process.env.PUBLIC_PORT ? `:${process.env.PUBLIC_PORT}` : '';
            const file = {
                _id: id,
                tenantId,
                filename: part.filename,
                link: `${process.env.DOMAIN}${port}/file/view/${id.toString()}`,
                contentType: part.mimetype,
                folderId: folderId,
                isFavorite: false,
            };
            files.push(file);
        }));
        return files;
    }
    async readFileContentBuffer(fileStream) {
        return new Promise((resolve, reject) => {
            const chunks = [];
            fileStream.on('data', (chunk) => chunks.push(chunk));
            fileStream.on('end', () => resolve(Buffer.concat(chunks)));
            fileStream.on('error', reject);
        });
    }
    async calculateBufferHash(buffer) {
        return (0, crypto_1.createHash)('sha256').update(buffer).digest('hex');
    }
    async checkIfFileExists(hash) {
        const file = await this.fileModel.findOne({ 'metadata.hash': hash }).lean().exec();
        if (file) {
            const obj = file;
            const port = process.env.PUBLIC_PORT ? `:${process.env.PUBLIC_PORT}` : '';
            return (0, class_transformer_1.plainToInstance)(file_dto_1.FileDto, {
                ...obj,
                link: `${process.env.DOMAIN}${port}/file/view/${file._id}`,
            });
        }
        return null;
    }
    async download(id, request, response, tenantId) {
        try {
            if (!mongoose_2.Types.ObjectId.isValid(id)) {
                throw new common_1.BadRequestException(null, 'InvalidVideoId');
            }
            const oId = new mongoose_2.Types.ObjectId(id);
            const fileInfo = await this.fileModel.findOne({ _id: id, 'metadata.tenantId': tenantId }).lean().exec();
            if (!fileInfo) {
                throw new common_1.NotFoundException(null, 'VideoNotFound');
            }
            if (request.headers.range) {
                const range = request.headers.range.substr(6).split('-');
                const start = parseInt(range[0], 10);
                const end = parseInt(range[1], 10) || null;
                const readstream = this.bucket.openDownloadStream(oId, {
                    start,
                    end,
                });
                response.status(206);
                response.headers({
                    'Accept-Ranges': 'bytes',
                    'Content-Type': fileInfo.contentType,
                    'Content-Range': `bytes ${start}-${end ? end : fileInfo.length - 1}/${fileInfo.length}`,
                    'Content-Length': (end ? end : fileInfo.length) - start,
                    'Content-Disposition': `attachment; filename="${fileInfo.filename}"`,
                });
                return new common_1.StreamableFile(readstream);
            }
            else {
                const readstream = this.bucket.openDownloadStream(oId);
                response.status(200);
                response.headers({
                    'Accept-Range': 'bytes',
                    'Content-Type': fileInfo.contentType,
                    'Content-Length': fileInfo.length,
                    'Content-Disposition': `attachment; filename="${fileInfo.filename}"`,
                });
                response.send(readstream);
                return new common_1.StreamableFile(readstream);
            }
        }
        catch (e) {
            console.error(e);
            throw new common_1.ServiceUnavailableException();
        }
    }
    async viewFile(id, response) {
        try {
            if (!mongoose_2.Types.ObjectId.isValid(id)) {
                throw new common_1.BadRequestException(null, 'InvalidFileId');
            }
            const oId = new mongoose_2.Types.ObjectId(id);
            const fileInfo = await this.fileModel.findOne({ _id: id }).lean().exec();
            if (!fileInfo) {
                throw new common_1.NotFoundException(null, 'FileNotFound');
            }
            const readstream = this.bucket.openDownloadStream(oId);
            response.status(200);
            const originalFilename = fileInfo.filename;
            const extension = (0, mime_types_1.extension)(fileInfo.contentType);
            const baseFilename = originalFilename.replace(/\.[^/.]+$/, '');
            const cleanFilename = (0, slugify_1.default)(baseFilename, { lower: true, remove: /[*+~.()'"!:@]/g });
            const finalFilename = extension ? `${cleanFilename}.${extension}` : cleanFilename;
            response.headers({
                'Accept-Ranges': 'bytes',
                'Content-Type': fileInfo.contentType,
                'Content-Length': fileInfo.length,
                'Content-Disposition': `inline; filename="${finalFilename}"`,
            });
            return new common_1.StreamableFile(readstream);
        }
        catch (e) {
            console.error(e);
            throw new common_1.ServiceUnavailableException();
        }
    }
    async update(updateFileDto, tenantId) {
        const updateData = {};
        if (updateFileDto) {
            updateData[`filename`] = updateFileDto.filename;
            updateData[`metadata.folderId`] = updateFileDto.folderId;
            updateData[`metadata.isFavorite`] = updateFileDto.isFavorite;
        }
        const updatedFileFolder = await this.fileModel
            .findOneAndUpdate({ _id: updateFileDto._id, 'metadata.tenantId': tenantId }, { $set: updateData }, { new: true })
            .lean()
            .exec();
        if (!updatedFileFolder) {
            throw new common_1.NotFoundException(`File with ID "${updateFileDto._id}" not found.`);
        }
        const port = process.env.PUBLIC_PORT ? `:${process.env.PUBLIC_PORT}` : '';
        const result = (0, class_transformer_1.plainToInstance)(file_dto_1.FileDto, {
            ...updatedFileFolder,
            folderId: updatedFileFolder.metadata?.folderId,
            isFavorite: updatedFileFolder.metadata?.isFavorite,
            link: `${process.env.DOMAIN}${port}/file/view/${updatedFileFolder._id}`,
        });
        return result;
    }
    async updateFilesFolder(updateFilesDto, folderId, tenantId) {
        const bulkOps = await Promise.all(updateFilesDto.map(async (updateFileDto) => {
            const updateData = {};
            if (updateFileDto.filename)
                updateData['filename'] = updateFileDto.filename;
            if (folderId)
                updateData['metadata.folderId'] = folderId;
            if (updateFileDto.isFavorite !== undefined)
                updateData['metadata.isFavorite'] = updateFileDto.isFavorite;
            return {
                updateOne: {
                    filter: { _id: updateFileDto._id, 'metadata.tenantId': tenantId },
                    update: { $set: updateData },
                },
            };
        }));
        const bulkWriteResult = await this.fileModel.bulkWrite(bulkOps);
        const updatedFileIds = bulkOps.map((op) => op.updateOne.filter._id);
        const updatedFiles = await this.fileModel
            .find({
            _id: { $in: updatedFileIds },
            tenantId,
        })
            .exec();
        const port = process.env.PUBLIC_PORT ? `:${process.env.PUBLIC_PORT}` : '';
        return updatedFiles.map((file) => (0, class_transformer_1.plainToInstance)(file_dto_1.FileDto, {
            ...file,
            folderId: folderId,
            isFavorite: file.metadata?.isFavorite,
            link: `${process.env.DOMAIN}${port}/file/view/${file._id}`,
        }));
    }
    async delete(id, tenantId) {
        try {
            const fileExists = await this.fileModel.findOne({ _id: id, 'metadata.tenantId': tenantId }).lean().exec();
            if (!fileExists) {
                throw new common_1.NotFoundException(`File with ID ${id} not found for this tenant`);
            }
            await this.bucket.delete(id);
            return true;
        }
        catch (error) {
            throw new Error(`Unable to delete file with ID ${id}`);
        }
    }
    async deleteFiles(ids, tenantId) {
        try {
            const existingFiles = await this.fileModel
                .find({ _id: { $in: ids }, 'metadata.tenantId': tenantId })
                .lean()
                .exec();
            const existingIds = existingFiles.map((file) => file._id);
            const deletePromises = existingIds.map((id) => this.bucket.delete(id));
            await Promise.all(deletePromises);
            return true;
        }
        catch (error) {
            throw new Error(`Unable to delete files with IDs ${ids}`);
        }
    }
    async search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds, fileFolderId) {
        const pipeline = await this.buildQuerySearchFiles(pageIdx, pageSize, keyword, sortBy, filters, fileFolderId, tenantIds);
        const files = await this.fileModel.aggregate(pipeline).exec();
        const totalItem = await this.fileModel.countDocuments({ 'metadata.tenantId': { $in: tenantIds } });
        const port = process.env.PUBLIC_PORT ? `:${process.env.PUBLIC_PORT}` : '';
        const result = (0, class_transformer_1.plainToInstance)(file_dto_1.FileDto, files.map((file) => {
            return {
                ...file,
                folderId: file.metadata?.folderId,
                tenantId: file.metadata?.tenantId,
                isFavorite: file.metadata?.isFavorite,
                link: `${process.env.DOMAIN}${port}/file/view/${file._id}`,
            };
        }));
        return {
            pageIdx,
            files: result,
            totalPage: Math.ceil(totalItem / pageSize),
            totalItem,
        };
    }
    async buildQuerySearchFiles(pageIdx, pageSize, keyword, sortBy, filters, fileFolderId, tenantIds) {
        const skip = pageIdx ? (pageIdx - 1) * pageSize : 0;
        const pipeline = [];
        const matchConditions = [{ 'metadata.tenantId': { $in: tenantIds } }, { 'metadata.isMedia': true }];
        if (fileFolderId) {
            matchConditions.push({ 'metadata.folderId': fileFolderId });
        }
        if (keyword) {
            matchConditions.push({
                $or: [{ name: { $regex: keyword, $options: 'i' } }],
            });
        }
        let startDateValue = '';
        let endDateValue = '';
        if (Array.isArray(filters)) {
            await Promise.all(filters.map(async ({ key, value }) => {
                if (!key || value == null)
                    return;
                if (key === 'startDate') {
                    startDateValue = value;
                }
                else if (key === 'endDate') {
                    endDateValue = value;
                }
                else if (key === 'endDate') {
                    endDateValue = value;
                }
                else if (key === 'isFavorite') {
                    matchConditions.push({ 'metadata.isFavorite': value });
                }
                else {
                    matchConditions.push({ [key]: value });
                }
            }));
        }
        if (startDateValue || endDateValue) {
            const rangeCond = {};
            if (startDateValue)
                rangeCond.$gte = startDateValue;
            if (endDateValue)
                rangeCond.$lte = endDateValue;
            matchConditions.push({ startDate: rangeCond });
        }
        if (matchConditions.length) {
            pipeline.push({
                $match: { $and: matchConditions },
            });
        }
        if (sortBy?.key) {
            pipeline.push({
                $sort: { [sortBy.key]: sortBy.value === 'ascend' ? 1 : -1 },
            });
        }
        pipeline.push({ $skip: skip }, { $limit: pageSize });
        return pipeline;
    }
};
exports.FileService = FileService;
exports.FileService = FileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(file_schema_1.FileDocument.name)),
    __param(1, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Connection])
], FileService);
//# sourceMappingURL=file.service.js.map