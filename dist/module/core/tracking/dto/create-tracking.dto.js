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
exports.CreateTrackingDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
const tracking_types_1 = require("../constants/tracking-types");
const roles_constants_1 = require("../../../../common/constants/roles.constants");
class CreateTrackingDto {
}
exports.CreateTrackingDto = CreateTrackingDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(tracking_types_1.TRACKING_TYPES),
    __metadata("design:type", String)
], CreateTrackingDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)([
        roles_constants_1.ROLE_CONSTANTS.CLIENT,
        roles_constants_1.ROLE_CONSTANTS.DRIVER,
        roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR,
        roles_constants_1.ROLE_CONSTANTS.TENANT,
        roles_constants_1.ROLE_CONSTANTS.ADMIN,
        roles_constants_1.ROLE_CONSTANTS.POS,
    ]),
    __metadata("design:type", String)
], CreateTrackingDto.prototype, "platform", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateTrackingDto.prototype, "metadata", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateTrackingDto.prototype, "createdBy", void 0);
//# sourceMappingURL=create-tracking.dto.js.map