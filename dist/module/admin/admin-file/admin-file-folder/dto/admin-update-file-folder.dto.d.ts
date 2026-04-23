import { Types } from 'mongoose';
import { AdminCreateFileFolderDto } from './admin-create-file-folderdto';
declare const AdminUpdateFileFolderDto_base: import("@nestjs/mapped-types").MappedType<Partial<AdminCreateFileFolderDto>>;
export declare class AdminUpdateFileFolderDto extends AdminUpdateFileFolderDto_base {
    _id: Types.ObjectId;
}
export {};
