"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminCreateCounterDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const admin_file_dto_1 = require("../../admin-file/admin-file-main/dto/admin-file.dto");
class AdminCreateCounterDto extends (0, mapped_types_1.OmitType)(admin_file_dto_1.AdminFileDto, ['_id', 'createdAt', 'updatedAt', '__v']) {
}
exports.AdminCreateCounterDto = AdminCreateCounterDto;
//# sourceMappingURL=admin-create-counter.dto.js.map