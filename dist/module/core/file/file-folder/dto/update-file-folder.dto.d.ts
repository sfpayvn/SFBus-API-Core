import { Types } from 'mongoose';
import { CreateFileFolderDto } from './create-file-folderdto';
declare const UpdateFileFolderDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateFileFolderDto>>;
export declare class UpdateFileFolderDto extends UpdateFileFolderDto_base {
    readonly _id: Types.ObjectId;
}
export {};
