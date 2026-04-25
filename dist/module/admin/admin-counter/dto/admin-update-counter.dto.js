"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUpdateCounterDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const admin_create_counter_dto_1 = require("./admin-create-counter.dto");
class AdminUpdateCounterDto extends (0, mapped_types_1.PartialType)(admin_create_counter_dto_1.AdminCreateCounterDto) {
}
exports.AdminUpdateCounterDto = AdminUpdateCounterDto;
//# sourceMappingURL=admin-update-counter.dto.js.map