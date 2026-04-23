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
exports.GroupedDetailResponseDto = exports.GroupedDetailItem = exports.DetailResponseDto = exports.PaymentDetailQueryDto = exports.GoodsDetailQueryDto = exports.ScheduleDetailQueryDto = exports.BookingDetailQueryDto = exports.BaseDetailQueryDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class BaseDetailQueryDto {
    constructor() {
        this.pageIdx = 0;
        this.pageSize = 20;
        this.comparisonMode = false;
    }
}
exports.BaseDetailQueryDto = BaseDetailQueryDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], BaseDetailQueryDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], BaseDetailQueryDto.prototype, "endDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], BaseDetailQueryDto.prototype, "platform", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], BaseDetailQueryDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], BaseDetailQueryDto.prototype, "pageIdx", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], BaseDetailQueryDto.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['hour', 'day', 'week', 'month']),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], BaseDetailQueryDto.prototype, "groupBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], BaseDetailQueryDto.prototype, "comparisonMode", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], BaseDetailQueryDto.prototype, "comparisonStartDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], BaseDetailQueryDto.prototype, "comparisonEndDate", void 0);
class BookingDetailQueryDto extends BaseDetailQueryDto {
}
exports.BookingDetailQueryDto = BookingDetailQueryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], BookingDetailQueryDto.prototype, "busRouteId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], BookingDetailQueryDto.prototype, "status", void 0);
class ScheduleDetailQueryDto extends BaseDetailQueryDto {
}
exports.ScheduleDetailQueryDto = ScheduleDetailQueryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], ScheduleDetailQueryDto.prototype, "busRouteId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], ScheduleDetailQueryDto.prototype, "status", void 0);
class GoodsDetailQueryDto extends BaseDetailQueryDto {
}
exports.GoodsDetailQueryDto = GoodsDetailQueryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], GoodsDetailQueryDto.prototype, "busRouteId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], GoodsDetailQueryDto.prototype, "status", void 0);
class PaymentDetailQueryDto extends BaseDetailQueryDto {
}
exports.PaymentDetailQueryDto = PaymentDetailQueryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], PaymentDetailQueryDto.prototype, "paymentMethodId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], PaymentDetailQueryDto.prototype, "bookingId", void 0);
class DetailResponseDto {
}
exports.DetailResponseDto = DetailResponseDto;
class GroupedDetailItem {
}
exports.GroupedDetailItem = GroupedDetailItem;
class GroupedDetailResponseDto {
}
exports.GroupedDetailResponseDto = GroupedDetailResponseDto;
//# sourceMappingURL=report-details.dto.js.map