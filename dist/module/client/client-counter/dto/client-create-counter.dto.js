"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientCreateCounterDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const client_file_dto_1 = require("../../client-file/client-file-main/dto/client-file.dto");
class ClientCreateCounterDto extends (0, mapped_types_1.OmitType)(client_file_dto_1.ClientFileDto, [
    '_id',
    'createdAt',
    'updatedAt',
    '__v',
]) {
}
exports.ClientCreateCounterDto = ClientCreateCounterDto;
//# sourceMappingURL=client-create-counter.dto.js.map