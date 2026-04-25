import { StreamableFile } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { FileDto, SearchFilesQuery } from './dto/file.dto';
import { FileService } from './file.service';
import { UpdateFileDto } from './dto/update-file.dto';
import { Types } from 'mongoose';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
type Request = FastifyRequest;
type Response = FastifyReply;
export declare class UploadController {
    private readonly fileService;
    constructor(fileService: FileService);
    uploadFile(folderId: Types.ObjectId, request: Request, userTokenDto: UserTokenDto): Promise<FileDto[]>;
    uploadFileSaveToMedia(folderId: Types.ObjectId, request: Request, userTokenDto: UserTokenDto): Promise<FileDto[]>;
    delete(id: Types.ObjectId, user: UserTokenDto): Promise<boolean>;
    deleteFiles(ids: Types.ObjectId[], user: UserTokenDto): Promise<boolean>;
    downloadFile(id: string, request: Request, response: Response, user: UserTokenDto): Promise<StreamableFile>;
    update(updateFileDto: UpdateFileDto, user: UserTokenDto): Promise<FileDto>;
    updateFilesFolder(folderId: Types.ObjectId, updateFilesDto: UpdateFileDto[], user: UserTokenDto): Promise<FileDto[]>;
    viewFile(id: string, response: Response, user: UserTokenDto): Promise<StreamableFile>;
    search(query: SearchFilesQuery, user: UserTokenDto): Promise<import("./dto/file.dto").SearchFilesRes>;
}
export {};
