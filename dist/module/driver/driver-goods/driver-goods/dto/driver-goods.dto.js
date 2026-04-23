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
exports.DriverSearchGoodsPagingRes = exports.DriverSearchGoodsPagingQuery = exports.DriverGoodsSortFilter = exports.DriverGoodsDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const class_validator_2 = require("class-validator");
const class_validator_3 = require("class-validator");
const class_validator_4 = require("class-validator");
const mongoose_1 = require("mongoose");
const bus_route_dto_1 = require("../../../../core/bus/bus-route/dto/bus-route.dto");
const bus_schedule_dto_1 = require("../../../../core/bus/bus-schedule/dto/bus-schedule.dto");
class DriverGoodsDto {
}
exports.DriverGoodsDto = DriverGoodsDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverGoodsDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverGoodsDto.prototype, "tenantId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverGoodsDto.prototype, "busScheduleId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", bus_schedule_dto_1.BusScheduleDto)
], DriverGoodsDto.prototype, "busSchedule", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DriverGoodsDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DriverGoodsDto.prototype, "goodsNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DriverGoodsDto.prototype, "customerName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DriverGoodsDto.prototype, "customerPhoneNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DriverGoodsDto.prototype, "senderName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], DriverGoodsDto.prototype, "goodsPriority", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], DriverGoodsDto.prototype, "goodsImportant", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], DriverGoodsDto.prototype, "quantity", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], DriverGoodsDto.prototype, "shippingCost", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], DriverGoodsDto.prototype, "cod", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], DriverGoodsDto.prototype, "goodsValue", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], DriverGoodsDto.prototype, "categories", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverGoodsDto.prototype, "busRouteId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], DriverGoodsDto.prototype, "weight", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], DriverGoodsDto.prototype, "length", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], DriverGoodsDto.prototype, "width", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", bus_route_dto_1.BusRouteDto)
], DriverGoodsDto.prototype, "busRoute", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DriverGoodsDto.prototype, "note", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DriverGoodsDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DriverGoodsDto.prototype, "paidBy", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverGoodsDto.prototype, "originStationId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverGoodsDto.prototype, "destinationStationId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverGoodsDto.prototype, "currentStationId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DriverGoodsDto.prototype, "currentScheduleId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", String)
], DriverGoodsDto.prototype, "deliveryType", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", String)
], DriverGoodsDto.prototype, "pickupFulfillmentMode", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", String)
], DriverGoodsDto.prototype, "deliveryFulfillmentMode", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", String)
], DriverGoodsDto.prototype, "pickupAddress", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", String)
], DriverGoodsDto.prototype, "deliveryAddress", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], DriverGoodsDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], DriverGoodsDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], DriverGoodsDto.prototype, "__v", void 0);
class DriverGoodsSortFilter {
}
exports.DriverGoodsSortFilter = DriverGoodsSortFilter;
__decorate([
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", String)
], DriverGoodsSortFilter.prototype, "key", void 0);
__decorate([
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", Object)
], DriverGoodsSortFilter.prototype, "value", void 0);
class DriverSearchGoodsPagingQuery {
}
exports.DriverSearchGoodsPagingQuery = DriverSearchGoodsPagingQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_4.IsNotEmpty)(),
    (0, class_validator_3.IsInt)(),
    __metadata("design:type", Number)
], DriverSearchGoodsPagingQuery.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_4.IsNotEmpty)(),
    (0, class_validator_3.IsInt)(),
    __metadata("design:type", Number)
], DriverSearchGoodsPagingQuery.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_2.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DriverSearchGoodsPagingQuery.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", DriverGoodsSortFilter)
], DriverSearchGoodsPagingQuery.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", Array)
], DriverSearchGoodsPagingQuery.prototype, "filters", void 0);
class DriverSearchGoodsPagingRes {
    constructor() {
        this.pageIdx = 0;
        this.totalPage = 0;
        this.totalItem = 0;
    }
}
exports.DriverSearchGoodsPagingRes = DriverSearchGoodsPagingRes;
//# sourceMappingURL=driver-goods.dto.js.map