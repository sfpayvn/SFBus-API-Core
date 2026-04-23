"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientUpdateCounterDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const client_create_counter_dto_1 = require("./client-create-counter.dto");
class ClientUpdateCounterDto extends (0, mapped_types_1.PartialType)(client_create_counter_dto_1.ClientCreateCounterDto) {
}
exports.ClientUpdateCounterDto = ClientUpdateCounterDto;
//# sourceMappingURL=client-update-counter.dto.js.map