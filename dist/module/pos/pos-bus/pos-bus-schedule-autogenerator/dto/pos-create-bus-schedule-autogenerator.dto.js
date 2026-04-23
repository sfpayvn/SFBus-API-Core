"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PosCreateBusScheduleAutogeneratorDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const pos_bus_schedule_autogenerator_dto_1 = require("./pos-bus-schedule-autogenerator.dto");
class PosCreateBusScheduleAutogeneratorDto extends (0, mapped_types_1.OmitType)(pos_bus_schedule_autogenerator_dto_1.PosBusScheduleAutogeneratorDto, [
    '_id',
    'createdAt',
    'updatedAt',
    '__v',
]) {
}
exports.PosCreateBusScheduleAutogeneratorDto = PosCreateBusScheduleAutogeneratorDto;
//# sourceMappingURL=pos-create-bus-schedule-autogenerator.dto.js.map