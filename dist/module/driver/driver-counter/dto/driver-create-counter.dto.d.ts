import { DriverFileDto } from '../../driver-file/driver-file-main/dto/driver-file.dto';
declare const DriverCreateCounterDto_base: import("@nestjs/mapped-types").MappedType<Omit<DriverFileDto, "_id" | "__v" | "createdAt" | "updatedAt">>;
export declare class DriverCreateCounterDto extends DriverCreateCounterDto_base {
}
export {};
