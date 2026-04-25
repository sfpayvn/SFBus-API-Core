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
exports.RequestUpdateGoodsScheduleBoardingDto = exports.RequestUpdateGoodsScheduleAssignmentDto = exports.RequestUpdatePaymentGoodsStatusDto = exports.UpdateGoodsDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_goods_dto_1 = require("./create-goods.dto");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const mongoose_1 = require("mongoose");
const status_constants_1 = require("../../../../../common/constants/status.constants");
class UpdateGoodsDto extends (0, mapped_types_1.PartialType)(create_goods_dto_1.CreateGoodsDto) {
}
exports.UpdateGoodsDto = UpdateGoodsDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], UpdateGoodsDto.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], UpdateGoodsDto.prototype, "status", void 0);
class RequestUpdatePaymentGoodsStatusDto {
}
exports.RequestUpdatePaymentGoodsStatusDto = RequestUpdatePaymentGoodsStatusDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], RequestUpdatePaymentGoodsStatusDto.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], RequestUpdatePaymentGoodsStatusDto.prototype, "paymentStatus", void 0);
class RequestUpdateGoodsScheduleAssignmentDto {
}
exports.RequestUpdateGoodsScheduleAssignmentDto = RequestUpdateGoodsScheduleAssignmentDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", Array)
], RequestUpdateGoodsScheduleAssignmentDto.prototype, "goodsIds", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", Object)
], RequestUpdateGoodsScheduleAssignmentDto.prototype, "busScheduleId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], RequestUpdateGoodsScheduleAssignmentDto.prototype, "currentStationId", void 0);
class RequestUpdateGoodsScheduleBoardingDto {
}
exports.RequestUpdateGoodsScheduleBoardingDto = RequestUpdateGoodsScheduleBoardingDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)([status_constants_1.GOODS_STATUS.PENDING, status_constants_1.GOODS_STATUS.ON_BOARD, status_constants_1.GOODS_STATUS.ARRIVED_FINAL_STATION, status_constants_1.GOODS_STATUS.COMPLETED]),
    __metadata("design:type", String)
], RequestUpdateGoodsScheduleBoardingDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", Array)
], RequestUpdateGoodsScheduleBoardingDto.prototype, "goodsIds", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], RequestUpdateGoodsScheduleBoardingDto.prototype, "busScheduleId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], RequestUpdateGoodsScheduleBoardingDto.prototype, "currentStationId", void 0);
//# sourceMappingURL=update-goods.dto.js.map