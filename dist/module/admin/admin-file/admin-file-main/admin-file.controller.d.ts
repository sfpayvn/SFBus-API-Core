import { StreamableFile } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Types } from 'mongoose';
import { AdminFileService } from './admin-file.service';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { AdminFileDto, AdminSearchFilesQuery } from './dto/admin-file.dto';
import { AdminUpdateFileDto } from './dto/admin-update-file.dto';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
type Request = FastifyRequest;
type Response = FastifyReply;
export declare class AdminUploadController {
    private readonly adminFileService;
    constructor(adminFileService: AdminFileService);
    uploadFile(folderId: Types.ObjectId, request: Request, userTokenDto: UserTokenDto): Promise<AdminFileDto[]>;
    uploadFileSaveToMedia(folderId: Types.ObjectId, request: Request, userTokenDto: UserTokenDto): Promise<AdminFileDto[]>;
    delete(id: Types.ObjectId, user: UserTokenDto): Promise<boolean>;
    deleteFiles(ids: Types.ObjectId[], user: UserTokenDto): Promise<boolean>;
    downloadFile(id: string, request: Request, response: Response, user: UserTokenDto): Promise<StreamableFile>;
    update(adminUpdateFileDto: AdminUpdateFileDto, user: UserTokenDto): Promise<import("../../../core/file/file/dto/file.dto").FileDto>;
    updateFilesFolder(folderId: Types.ObjectId, adminUpdateFileDto: AdminUpdateFileDto[], user: UserTokenDto): Promise<import("../../../core/file/file/dto/file.dto").FileDto[]>;
    viewFile(id: string, response: Response, user: UserTokenDto): Promise<StreamableFile>;
    search(query: AdminSearchFilesQuery, tenantScope: TenantScopeResult): Promise<import("./dto/admin-file.dto").AdminSearchFilesRes>;
}
export {};
