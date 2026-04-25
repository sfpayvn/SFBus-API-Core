import { AdminFileDto } from '../../admin-file/admin-file-main/dto/admin-file.dto';
declare const AdminCreateCounterDto_base: import("@nestjs/mapped-types").MappedType<Omit<AdminFileDto, "_id" | "__v" | "createdAt" | "updatedAt">>;
export declare class AdminCreateCounterDto extends AdminCreateCounterDto_base {
}
export {};
