import { StreamableFile } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Connection, Model, Types } from 'mongoose';
import { FileDocument } from './schema/file.schema';
import { FileDto, SearchFilesQuerySortFilter, SearchFilesRes } from './dto/file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
type Request = FastifyRequest;
type Response = FastifyReply;
export declare class FileService {
    private readonly fileModel;
    private readonly connection;
    private readonly bucket;
    constructor(fileModel: Model<FileDocument>, connection: Connection);
    upload(request: any, folderId: Types.ObjectId, tenantId: Types.ObjectId, isMedia?: boolean): Promise<FileDto[]>;
    readFileContentBuffer(fileStream: any): Promise<Buffer>;
    calculateBufferHash(buffer: Buffer): Promise<string>;
    checkIfFileExists(hash: string): Promise<FileDto | null>;
    download(id: string, request: Request, response: Response, tenantId: Types.ObjectId): Promise<StreamableFile | undefined>;
    viewFile(id: string, response: Response): Promise<StreamableFile>;
    update(updateFileDto: UpdateFileDto, tenantId: Types.ObjectId): Promise<FileDto>;
    updateFilesFolder(updateFilesDto: UpdateFileDto[], folderId: Types.ObjectId, tenantId: Types.ObjectId): Promise<FileDto[]>;
    delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean>;
    deleteFiles(ids: Types.ObjectId[], tenantId: Types.ObjectId): Promise<boolean>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: SearchFilesQuerySortFilter, filters: SearchFilesQuerySortFilter[], tenantIds: Types.ObjectId[], fileFolderId: Types.ObjectId | null): Promise<SearchFilesRes>;
    buildQuerySearchFiles(pageIdx: number, pageSize: number, keyword: string, sortBy: SearchFilesQuerySortFilter, filters: SearchFilesQuerySortFilter[], fileFolderId: Types.ObjectId | null, tenantIds: Types.ObjectId[]): Promise<any>;
}
export {};
