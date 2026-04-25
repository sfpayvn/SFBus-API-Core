import { Model, Types } from 'mongoose';
import { FileFolderDto } from './dto/file-folder.dto';
import { CreateFileFolderDto } from './dto/create-file-folderdto';
import { UpdateFileFolderDto } from './dto/update-file-folder.dto';
import { FileFolderDocument } from './schema/file-folder.schema';
export declare class FileFolderService {
    private readonly fileFolderModel;
    constructor(fileFolderModel: Model<FileFolderDocument>);
    create(createFileFolderDto: CreateFileFolderDto, tenantId: Types.ObjectId): Promise<FileFolderDto>;
    findAll(tenantId: Types.ObjectId): Promise<FileFolderDto[]>;
    findOne(id: string, tenantId: Types.ObjectId): Promise<FileFolderDto>;
    update(updateFileFolderDto: UpdateFileFolderDto, tenantId: Types.ObjectId): Promise<FileFolderDto>;
    delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean>;
}
