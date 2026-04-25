"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCounterDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_counter_dto_1 = require("./create-counter.dto");
class UpdateCounterDto extends (0, mapped_types_1.PartialType)(create_counter_dto_1.CreateCounterDto) {
}
exports.UpdateCounterDto = UpdateCounterDto;
//# sourceMappingURL=update-counter.dto.js.map