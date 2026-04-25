import { AdminFileFolderService } from './admin-file-folder.service';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { Types } from 'mongoose';
import { AdminCreateFileFolderDto } from './dto/admin-create-file-folderdto';
import { AdminUpdateFileFolderDto } from './dto/admin-update-file-folder.dto';
export declare class AdminFileFolderController {
    private readonly adminFileFolderService;
    constructor(adminFileFolderService: AdminFileFolderService);
    create(adminCreateFileFolderDto: AdminCreateFileFolderDto, user: UserTokenDto): Promise<import("./dto/admin-file-folder.dto").AdminFileFolderDto>;
    update(adminUpdateFileFolderDto: AdminUpdateFileFolderDto, user: UserTokenDto): Promise<import("./dto/admin-file-folder.dto").AdminFileFolderDto>;
    findAll(user: UserTokenDto): Promise<import("./dto/admin-file-folder.dto").AdminFileFolderDto[]>;
    delete(id: Types.ObjectId, user: UserTokenDto): Promise<boolean>;
}
