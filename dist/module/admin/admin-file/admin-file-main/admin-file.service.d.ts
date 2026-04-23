import { FileDto } from '@/module/core/file/file/dto/file.dto';
import { FileService } from '@/module/core/file/file/file.service';
import { FileDocument } from '@/module/core/file/file/schema/file.schema';
import { StreamableFile } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Model, Types } from 'mongoose';
import { AdminFileDto, AdminSearchFilesQuerySortFilter, AdminSearchFilesRes } from './dto/admin-file.dto';
import { AdminUpdateFileDto } from './dto/admin-update-file.dto';
type Request = FastifyRequest;
type Response = FastifyReply;
export declare class AdminFileService {
    private readonly fileModel;
    private readonly fileService;
    ROOT_TENANT_ID: string;
    constructor(fileModel: Model<FileDocument>, fileService: FileService);
    upload(request: any, folderId: Types.ObjectId, tenantId: Types.ObjectId, isMedia?: boolean): Promise<AdminFileDto[]>;
    download(id: string, request: Request, response: Response, tenantId: Types.ObjectId): Promise<StreamableFile | undefined>;
    viewFile(id: string, response: Response): Promise<StreamableFile>;
    update(adminUpdateFileDto: AdminUpdateFileDto, tenantId: Types.ObjectId): Promise<FileDto>;
    updateFilesFolder(adminUpdateFileDto: AdminUpdateFileDto[], folderId: Types.ObjectId, tenantId: Types.ObjectId): Promise<FileDto[]>;
    delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean>;
    deleteFiles(ids: Types.ObjectId[], tenantId: Types.ObjectId): Promise<boolean>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: AdminSearchFilesQuerySortFilter, filters: AdminSearchFilesQuerySortFilter[], tenantIds: Types.ObjectId[], fileFolderId: Types.ObjectId | null): Promise<AdminSearchFilesRes>;
}
export {};
