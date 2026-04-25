import { StreamableFile } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Types } from 'mongoose';
import { ClientFileService } from './client-file.service';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { ClientFileDto } from './dto/client-file.dto';
type Request = FastifyRequest;
type Response = FastifyReply;
export declare class ClientUploadController {
    private readonly ClientFileService;
    constructor(ClientFileService: ClientFileService);
    uploadFile(folderId: Types.ObjectId, request: Request, userTokenDto: UserTokenDto): Promise<ClientFileDto[]>;
    downloadFile(id: string, request: Request, response: Response, user: UserTokenDto): Promise<StreamableFile>;
    viewFile(id: string, response: Response): Promise<StreamableFile>;
}
export {};
