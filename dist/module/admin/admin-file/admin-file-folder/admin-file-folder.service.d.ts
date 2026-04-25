import { FileFolderDocument } from '@/module/core/file/file-folder/schema/file-folder.schema';
import { Model, Types } from 'mongoose';
import { AdminCreateFileFolderDto } from './dto/admin-create-file-folderdto';
import { AdminFileFolderDto } from './dto/admin-file-folder.dto';
import { AdminUpdateFileFolderDto } from './dto/admin-update-file-folder.dto';
import { FileFolderService } from '@/module/core/file/file-folder/file-folder.service';
export declare class AdminFileFolderService {
    private readonly fileFolderModel;
    private readonly fileFolderService;
    constructor(fileFolderModel: Model<FileFolderDocument>, fileFolderService: FileFolderService);
    create(adminCreateFileFolderDto: AdminCreateFileFolderDto, tenantId: Types.ObjectId): Promise<AdminFileFolderDto>;
    findAll(tenantId: Types.ObjectId): Promise<AdminFileFolderDto[]>;
    findOne(id: string, tenantId: Types.ObjectId): Promise<AdminFileFolderDto>;
    update(adminUpdateFileFolderDto: AdminUpdateFileFolderDto, tenantId: Types.ObjectId): Promise<AdminFileFolderDto>;
    delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean>;
}
