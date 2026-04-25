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
exports.SearchGoodsPagingRes = exports.SearchGoodsPagingQuery = exports.GoodsSortFilter = exports.GoodsDto = exports.GoodsEvent = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const class_validator_2 = require("class-validator");
const class_validator_3 = require("class-validator");
const class_validator_4 = require("class-validator");
const mongoose_1 = require("mongoose");
const bus_route_dto_1 = require("../../../bus/bus-route/dto/bus-route.dto");
const bus_schedule_dto_1 = require("../../../bus/bus-schedule/dto/bus-schedule.dto");
class GoodsEvent {
    constructor() {
        this.note = '';
    }
}
exports.GoodsEvent = GoodsEvent;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], GoodsEvent.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], GoodsEvent.prototype, "stationId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], GoodsEvent.prototype, "scheduleId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], GoodsEvent.prototype, "note", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], GoodsEvent.prototype, "createdAt", void 0);
class GoodsDto {
    constructor() {
        this.events = [];
    }
}
exports.GoodsDto = GoodsDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], GoodsDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], GoodsDto.prototype, "tenantId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], GoodsDto.prototype, "busScheduleId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", bus_schedule_dto_1.BusScheduleDto)
], GoodsDto.prototype, "busSchedule", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], GoodsDto.prototype, "busRouteId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", bus_route_dto_1.BusRouteDto)
], GoodsDto.prototype, "busRoute", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], GoodsDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], GoodsDto.prototype, "goodsNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], GoodsDto.prototype, "customerName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], GoodsDto.prototype, "customerPhoneNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], GoodsDto.prototype, "senderName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], GoodsDto.prototype, "senderPhoneNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], GoodsDto.prototype, "goodsPriority", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], GoodsDto.prototype, "goodsImportant", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], GoodsDto.prototype, "quantity", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], GoodsDto.prototype, "shippingCost", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], GoodsDto.prototype, "cod", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], GoodsDto.prototype, "goodsValue", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], GoodsDto.prototype, "categories", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], GoodsDto.prototype, "weight", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], GoodsDto.prototype, "length", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], GoodsDto.prototype, "width", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], GoodsDto.prototype, "note", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], GoodsDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], GoodsDto.prototype, "paymentStatus", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], GoodsDto.prototype, "paidBy", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], GoodsDto.prototype, "imageIds", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], GoodsDto.prototype, "images", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], GoodsDto.prototype, "originStationId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], GoodsDto.prototype, "destinationStationId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], GoodsDto.prototype, "currentStationId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], GoodsDto.prototype, "currentScheduleId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], GoodsDto.prototype, "deliveryType", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], GoodsDto.prototype, "pickupFulfillmentMode", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], GoodsDto.prototype, "deliveryFulfillmentMode", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], GoodsDto.prototype, "pickupAddress", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], GoodsDto.prototype, "deliveryAddress", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], GoodsDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], GoodsDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], GoodsDto.prototype, "__v", void 0);
class GoodsSortFilter {
}
exports.GoodsSortFilter = GoodsSortFilter;
__decorate([
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", String)
], GoodsSortFilter.prototype, "key", void 0);
__decorate([
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", Object)
], GoodsSortFilter.prototype, "value", void 0);
class SearchGoodsPagingQuery {
}
exports.SearchGoodsPagingQuery = SearchGoodsPagingQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_4.IsNotEmpty)(),
    (0, class_validator_3.IsInt)(),
    __metadata("design:type", Number)
], SearchGoodsPagingQuery.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_4.IsNotEmpty)(),
    (0, class_validator_3.IsInt)(),
    __metadata("design:type", Number)
], SearchGoodsPagingQuery.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_2.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchGoodsPagingQuery.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", GoodsSortFilter)
], SearchGoodsPagingQuery.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", Array)
], SearchGoodsPagingQuery.prototype, "filters", void 0);
class SearchGoodsPagingRes {
    constructor() {
        this.pageIdx = 0;
        this.totalPage = 0;
        this.totalItem = 0;
        this.countByStatus = {};
    }
}
exports.SearchGoodsPagingRes = SearchGoodsPagingRes;
//# sourceMappingURL=goods.dto.js.map