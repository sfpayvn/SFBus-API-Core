import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { FileFolderService } from './file-folder.service';
import { CreateFileFolderDto } from './dto/create-file-folderdto';
import { UpdateFileFolderDto } from './dto/update-file-folder.dto';
import { Types } from 'mongoose';
export declare class FileFolderController {
    private readonly fileFolderService;
    constructor(fileFolderService: FileFolderService);
    create(createFileFolderDto: CreateFileFolderDto, user: UserTokenDto): Promise<import("./dto/file-folder.dto").FileFolderDto>;
    update(updateFileFolderDto: UpdateFileFolderDto, user: UserTokenDto): Promise<import("./dto/file-folder.dto").FileFolderDto>;
    findAll(user: UserTokenDto): Promise<import("./dto/file-folder.dto").FileFolderDto[]>;
    delete(id: Types.ObjectId, user: UserTokenDto): Promise<boolean>;
}
