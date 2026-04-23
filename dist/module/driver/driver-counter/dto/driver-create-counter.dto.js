"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverCreateCounterDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const driver_file_dto_1 = require("../../driver-file/driver-file-main/dto/driver-file.dto");
class DriverCreateCounterDto extends (0, mapped_types_1.OmitType)(driver_file_dto_1.DriverFileDto, [
    '_id',
    'createdAt',
    'updatedAt',
    '__v',
]) {
}
exports.DriverCreateCounterDto = DriverCreateCounterDto;
//# sourceMappingURL=driver-create-counter.dto.js.map