"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBusStationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_bus_station_dto_1 = require("./create-bus-station.dto");
const mongoose_1 = require("mongoose");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class UpdateBusStationDto extends (0, mapped_types_1.PartialType)(create_bus_station_dto_1.CreateBusStationDto) {
}
exports.UpdateBusStationDto = UpdateBusStationDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], UpdateBusStationDto.prototype, "_id", void 0);
//# sourceMappingURL=update-bus-station.dto.js.map