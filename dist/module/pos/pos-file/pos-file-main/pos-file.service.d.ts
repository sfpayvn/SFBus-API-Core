import { FileService } from '@/module/core/file/file/file.service';
import { FileDocument } from '@/module/core/file/file/schema/file.schema';
import { StreamableFile } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Model, Types } from 'mongoose';
import { PosFileDto } from './dto/pos-file.dto';
type Request = FastifyRequest;
type Response = FastifyReply;
export declare class PosFileService {
    private readonly fileModel;
    private readonly fileService;
    ROOT_TENANT_ID: string;
    constructor(fileModel: Model<FileDocument>, fileService: FileService);
    upload(request: any, folderId: Types.ObjectId, tenantId: Types.ObjectId): Promise<PosFileDto[]>;
    download(id: string, request: Request, response: Response, tenantId: Types.ObjectId): Promise<StreamableFile | undefined>;
    viewFile(id: string, response: Response): Promise<StreamableFile>;
}
export {};
