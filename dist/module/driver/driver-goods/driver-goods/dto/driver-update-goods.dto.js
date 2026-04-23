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
exports.DriverRequestUpdateGoodsBoardingDto = exports.DriverUpdateGoodsStatus = void 0;
const status_constants_1 = require("../../../../../common/constants/status.constants");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
class DriverUpdateGoodsStatus {
}
exports.DriverUpdateGoodsStatus = DriverUpdateGoodsStatus;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], DriverUpdateGoodsStatus.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], DriverUpdateGoodsStatus.prototype, "status", void 0);
class DriverRequestUpdateGoodsBoardingDto {
}
exports.DriverRequestUpdateGoodsBoardingDto = DriverRequestUpdateGoodsBoardingDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)([status_constants_1.GOODS_STATUS.PENDING, status_constants_1.GOODS_STATUS.ON_BOARD, status_constants_1.GOODS_STATUS.ARRIVED_FINAL_STATION, status_constants_1.GOODS_STATUS.COMPLETED]),
    __metadata("design:type", String)
], DriverRequestUpdateGoodsBoardingDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", Array)
], DriverRequestUpdateGoodsBoardingDto.prototype, "goodsIds", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverRequestUpdateGoodsBoardingDto.prototype, "busScheduleId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => mongoose_1.Types.ObjectId),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverRequestUpdateGoodsBoardingDto.prototype, "currentStationId", void 0);
//# sourceMappingURL=driver-update-goods.dto.js.map