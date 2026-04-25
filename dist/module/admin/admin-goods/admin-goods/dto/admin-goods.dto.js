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
exports.AdminSearchGoodsPagingRes = exports.AdminSearchGoodsPagingQuery = exports.AdminGoodsSortFilter = exports.AdminGoodsDto = exports.AdminGoodsEvent = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const class_validator_2 = require("class-validator");
const class_validator_3 = require("class-validator");
const class_validator_4 = require("class-validator");
const mongoose_1 = require("mongoose");
const bus_route_dto_1 = require("../../../../core/bus/bus-route/dto/bus-route.dto");
const bus_schedule_dto_1 = require("../../../../core/bus/bus-schedule/dto/bus-schedule.dto");
class AdminGoodsEvent {
    constructor() {
        this.note = '';
    }
}
exports.AdminGoodsEvent = AdminGoodsEvent;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminGoodsEvent.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminGoodsEvent.prototype, "stationId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminGoodsEvent.prototype, "scheduleId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminGoodsEvent.prototype, "note", void 0);
class AdminGoodsDto {
    constructor() {
        this.events = [];
    }
}
exports.AdminGoodsDto = AdminGoodsDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminGoodsDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminGoodsDto.prototype, "tenantId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminGoodsDto.prototype, "busScheduleId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", bus_schedule_dto_1.BusScheduleDto)
], AdminGoodsDto.prototype, "busSchedule", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminGoodsDto.prototype, "busRouteId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", bus_route_dto_1.BusRouteDto)
], AdminGoodsDto.prototype, "busRoute", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminGoodsDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminGoodsDto.prototype, "goodsNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminGoodsDto.prototype, "customerName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminGoodsDto.prototype, "customerPhoneNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminGoodsDto.prototype, "senderName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminGoodsDto.prototype, "senderPhoneNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], AdminGoodsDto.prototype, "goodsPriority", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], AdminGoodsDto.prototype, "goodsImportant", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], AdminGoodsDto.prototype, "quantity", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], AdminGoodsDto.prototype, "shippingCost", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], AdminGoodsDto.prototype, "cod", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], AdminGoodsDto.prototype, "goodsValue", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], AdminGoodsDto.prototype, "categories", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], AdminGoodsDto.prototype, "weight", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], AdminGoodsDto.prototype, "length", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], AdminGoodsDto.prototype, "width", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminGoodsDto.prototype, "note", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminGoodsDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminGoodsDto.prototype, "paymentStatus", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminGoodsDto.prototype, "paidBy", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], AdminGoodsDto.prototype, "imageIds", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], AdminGoodsDto.prototype, "images", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminGoodsDto.prototype, "originStationId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminGoodsDto.prototype, "destinationStationId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminGoodsDto.prototype, "currentStationId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminGoodsDto.prototype, "currentScheduleId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminGoodsDto.prototype, "deliveryType", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminGoodsDto.prototype, "pickupFulfillmentMode", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminGoodsDto.prototype, "deliveryFulfillmentMode", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminGoodsDto.prototype, "pickupAddress", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminGoodsDto.prototype, "deliveryAddress", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], AdminGoodsDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], AdminGoodsDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], AdminGoodsDto.prototype, "__v", void 0);
class AdminGoodsSortFilter {
}
exports.AdminGoodsSortFilter = AdminGoodsSortFilter;
__decorate([
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", String)
], AdminGoodsSortFilter.prototype, "key", void 0);
__decorate([
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", Object)
], AdminGoodsSortFilter.prototype, "value", void 0);
class AdminSearchGoodsPagingQuery {
}
exports.AdminSearchGoodsPagingQuery = AdminSearchGoodsPagingQuery;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_4.IsNotEmpty)(),
    (0, class_validator_3.IsInt)(),
    __metadata("design:type", Number)
], AdminSearchGoodsPagingQuery.prototype, "pageIdx", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_4.IsNotEmpty)(),
    (0, class_validator_3.IsInt)(),
    __metadata("design:type", Number)
], AdminSearchGoodsPagingQuery.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_2.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminSearchGoodsPagingQuery.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", AdminGoodsSortFilter)
], AdminSearchGoodsPagingQuery.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", Array)
], AdminSearchGoodsPagingQuery.prototype, "filters", void 0);
class AdminSearchGoodsPagingRes {
    constructor() {
        this.pageIdx = 0;
        this.totalPage = 0;
        this.totalItem = 0;
        this.countByStatus = {};
    }
}
exports.AdminSearchGoodsPagingRes = AdminSearchGoodsPagingRes;
//# sourceMappingURL=admin-goods.dto.js.map