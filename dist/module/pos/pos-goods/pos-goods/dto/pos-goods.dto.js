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
exports.PosSearchGoodsPagingRes = exports.PosSearchGoodsPagingQuery = exports.PosGoodsSortFilter = exports.PosGoodsDto = exports.PosGoodsEvent = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const class_validator_2 = require("class-validator");
const class_validator_3 = require("class-validator");
const class_validator_4 = require("class-validator");
const mongoose_1 = require("mongoose");
const bus_route_dto_1 = require("../../../../core/bus/bus-route/dto/bus-route.dto");
const bus_schedule_dto_1 = require("../../../../core/bus/bus-schedule/dto/bus-schedule.dto");
class PosGoodsEvent {
    constructor() {
        this.note = '';
    }
}
exports.PosGoodsEvent = PosGoodsEvent;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PosGoodsEvent.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosGoodsEvent.prototype, "stationId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosGoodsEvent.prototype, "scheduleId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PosGoodsEvent.prototype, "note", void 0);
class PosGoodsDto {
    constructor() {
        this.events = [];
    }
}
exports.PosGoodsDto = PosGoodsDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosGoodsDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosGoodsDto.prototype, "tenantId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosGoodsDto.prototype, "busScheduleId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", bus_schedule_dto_1.BusScheduleDto)
], PosGoodsDto.prototype, "busSchedule", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosGoodsDto.prototype, "busRouteId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", bus_route_dto_1.BusRouteDto)
], PosGoodsDto.prototype, "busRoute", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PosGoodsDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PosGoodsDto.prototype, "goodsNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PosGoodsDto.prototype, "customerName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PosGoodsDto.prototype, "customerPhoneNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PosGoodsDto.prototype, "senderName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PosGoodsDto.prototype, "senderPhoneNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], PosGoodsDto.prototype, "goodsPriority", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], PosGoodsDto.prototype, "goodsImportant", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], PosGoodsDto.prototype, "quantity", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], PosGoodsDto.prototype, "shippingCost", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], PosGoodsDto.prototype, "cod", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], PosGoodsDto.prototype, "goodsValue", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], PosGoodsDto.prototype, "categories", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], PosGoodsDto.prototype, "weight", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], PosGoodsDto.prototype, "length", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], PosGoodsDto.prototype, "width", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PosGoodsDto.prototype, "note", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PosGoodsDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PosGoodsDto.prototype, "paymentStatus", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PosGoodsDto.prototype, "paidBy", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], PosGoodsDto.prototype, "imageIds", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], PosGoodsDto.prototype, "images", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosGoodsDto.prototype, "originStationId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosGoodsDto.prototype, "destinationStationId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosGoodsDto.prototype, "currentStationId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PosGoodsDto.prototype, "currentScheduleId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PosGoodsDto.prototype, "deliveryType", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PosGoodsDto.prototype, "pickupFulfillmentMode", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PosGoodsDto.prototype, "deliveryFulfillmentMode", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PosGoodsDto.prototype, "pickupAddress", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PosGoodsDto.prototype, "deliveryAddress", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], PosGoodsDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], PosGoodsDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], PosGoodsDto.prototype, "__v", void 0);
class PosGoodsSortFilter {
}
exports.PosGoodsSortFilter = PosGoodsSortFilter;
__decorate([
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", String)
], PosGoodsSortFilter.prototype, "key", void 0);
__decorate([
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", Object)
], PosGoodsSortFilter.prototype, "value", void 0);
class PosSearchGoodsPagingQuery {
}
exports.PosSearchGoodsPagingQuery = PosSearchGoodsPagingQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_4.IsNotEmpty)(),
    (0, class_validator_3.IsInt)(),
    __metadata("design:type", Number)
], PosSearchGoodsPagingQuery.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_4.IsNotEmpty)(),
    (0, class_validator_3.IsInt)(),
    __metadata("design:type", Number)
], PosSearchGoodsPagingQuery.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_2.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PosSearchGoodsPagingQuery.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", PosGoodsSortFilter)
], PosSearchGoodsPagingQuery.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", Array)
], PosSearchGoodsPagingQuery.prototype, "filters", void 0);
class PosSearchGoodsPagingRes {
    constructor() {
        this.pageIdx = 0;
        this.totalPage = 0;
        this.totalItem = 0;
        this.countByStatus = {};
    }
}
exports.PosSearchGoodsPagingRes = PosSearchGoodsPagingRes;
//# sourceMappingURL=pos-goods.dto.js.map