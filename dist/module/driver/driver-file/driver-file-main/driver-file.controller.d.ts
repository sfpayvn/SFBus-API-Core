import { StreamableFile } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Types } from 'mongoose';
import { DriverFileService } from './driver-file.service';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { DriverFileDto } from './dto/driver-file.dto';
type Request = FastifyRequest;
type Response = FastifyReply;
export declare class DriverUploadController {
    private readonly DriverFileService;
    constructor(DriverFileService: DriverFileService);
    uploadFile(folderId: Types.ObjectId, request: Request, userTokenDto: UserTokenDto): Promise<DriverFileDto[]>;
    downloadFile(id: string, request: Request, response: Response, user: UserTokenDto): Promise<StreamableFile>;
    viewFile(id: string, response: Response, user: UserTokenDto): Promise<StreamableFile>;
}
export {};
