import { ClientFileDto } from '../../client-file/client-file-main/dto/client-file.dto';
declare const ClientCreateCounterDto_base: import("@nestjs/mapped-types").MappedType<Omit<ClientFileDto, "_id" | "__v" | "createdAt" | "updatedAt">>;
export declare class ClientCreateCounterDto extends ClientCreateCounterDto_base {
}
export {};
