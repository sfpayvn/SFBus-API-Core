"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverUpdateCounterDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const driver_create_counter_dto_1 = require("./driver-create-counter.dto");
class DriverUpdateCounterDto extends (0, mapped_types_1.PartialType)(driver_create_counter_dto_1.DriverCreateCounterDto) {
}
exports.DriverUpdateCounterDto = DriverUpdateCounterDto;
//# sourceMappingURL=driver-update-counter.dto.js.map