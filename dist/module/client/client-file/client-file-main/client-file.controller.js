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
exports.ClientUploadController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const parse_objectId_pipe_1 = require("../../../../common/pipes/parse-objectId.pipe");
const mongoose_1 = require("mongoose");
const client_file_service_1 = require("./client-file.service");
const current_user_decorator_1 = require("../../../../decorators/current-user.decorator");
const user_token_dto_1 = require("../../../../jwt/dto/user-token.dto");
let ClientUploadController = class ClientUploadController {
    constructor(ClientFileService) {
        this.ClientFileService = ClientFileService;
    }
    uploadFile(folderId, request, userTokenDto) {
        const { tenantId } = userTokenDto;
        return this.ClientFileService.upload(request, folderId, tenantId);
    }
    async downloadFile(id, request, response, user) {
        const { tenantId } = user;
        const file = await this.ClientFileService.download(id, request, response, tenantId);
        if (!file) {
            throw new common_1.NotFoundException('File not found');
        }
        return file;
    }
    viewFile(id, response) {
        return this.ClientFileService.viewFile(id, response);
    }
};
exports.ClientUploadController = ClientUploadController;
__decorate([
    (0, common_1.Post)('upload-file/:folderId'),
    __param(0, (0, common_1.Param)('folderId', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, Object, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], ClientUploadController.prototype, "uploadFile", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get a list of all uploaded files.',
    }),
    (0, swagger_1.ApiOkResponse)({
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    _id: { type: 'string', example: '5e2b447e4aadb800bccfb339' },
                    length: { type: 'number', example: 730416 },
                    chunkSize: { type: 'number', example: 261120 },
                    uploadDate: { type: 'Date', example: '2020-01-24T19:24:46.366Z' },
                    filename: { type: 'string', example: 'IMG_0359.jpeg' },
                    md5: { type: 'string', example: 'ba230f0322784443c84ffbc5b6160c30' },
                    contentType: { type: 'string', example: 'image/jpeg' },
                },
            },
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Download a file.' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __param(3, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], ClientUploadController.prototype, "downloadFile", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'View a file online.' }),
    (0, common_1.Get)('view/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ClientUploadController.prototype, "viewFile", null);
exports.ClientUploadController = ClientUploadController = __decorate([
    (0, swagger_1.ApiTags)('ClientFile'),
    (0, common_1.Controller)('client/file'),
    __metadata("design:paramtypes", [client_file_service_1.ClientFileService])
], ClientUploadController);
//# sourceMappingURL=client-file.controller.js.map