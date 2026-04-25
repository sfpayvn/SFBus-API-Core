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
exports.ClientGoodsDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
const bus_route_dto_1 = require("../../../../core/bus/bus-route/dto/bus-route.dto");
const bus_schedule_dto_1 = require("../../../../core/bus/bus-schedule/dto/bus-schedule.dto");
class ClientGoodsDto {
}
exports.ClientGoodsDto = ClientGoodsDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientGoodsDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientGoodsDto.prototype, "tenantId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientGoodsDto.prototype, "busScheduleId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", bus_schedule_dto_1.BusScheduleDto)
], ClientGoodsDto.prototype, "busSchedule", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientGoodsDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientGoodsDto.prototype, "goodsNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientGoodsDto.prototype, "customerName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientGoodsDto.prototype, "customerPhoneNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientGoodsDto.prototype, "senderName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientGoodsDto.prototype, "senderPhoneNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ClientGoodsDto.prototype, "quantity", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ClientGoodsDto.prototype, "shippingCost", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ClientGoodsDto.prototype, "cod", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ClientGoodsDto.prototype, "goodsValue", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], ClientGoodsDto.prototype, "categories", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientGoodsDto.prototype, "busRouteId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ClientGoodsDto.prototype, "weight", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ClientGoodsDto.prototype, "length", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ClientGoodsDto.prototype, "width", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", bus_route_dto_1.BusRouteDto)
], ClientGoodsDto.prototype, "busRoute", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientGoodsDto.prototype, "note", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientGoodsDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ClientGoodsDto.prototype, "paidBy", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientGoodsDto.prototype, "originStationId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientGoodsDto.prototype, "destinationStationId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientGoodsDto.prototype, "currentStationId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ClientGoodsDto.prototype, "currentScheduleId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ClientGoodsDto.prototype, "deliveryType", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ClientGoodsDto.prototype, "pickupFulfillmentMode", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ClientGoodsDto.prototype, "deliveryFulfillmentMode", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ClientGoodsDto.prototype, "pickupAddress", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ClientGoodsDto.prototype, "deliveryAddress", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], ClientGoodsDto.prototype, "goodsPriority", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Boolean)
], ClientGoodsDto.prototype, "goodsImportant", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], ClientGoodsDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], ClientGoodsDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], ClientGoodsDto.prototype, "__v", void 0);
//# sourceMappingURL=client-goods.dto.js.map