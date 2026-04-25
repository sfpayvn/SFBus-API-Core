import { StreamableFile } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Types } from 'mongoose';
import { PosFileService } from './pos-file.service';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { PosFileDto } from './dto/pos-file.dto';
type Request = FastifyRequest;
type Response = FastifyReply;
export declare class PosUploadController {
    private readonly PosFileService;
    constructor(PosFileService: PosFileService);
    uploadFile(folderId: Types.ObjectId, request: Request, userTokenDto: UserTokenDto): Promise<PosFileDto[]>;
    downloadFile(id: string, request: Request, response: Response, user: UserTokenDto): Promise<StreamableFile>;
    viewFile(id: string, response: Response, user: UserTokenDto): Promise<StreamableFile>;
}
export {};
