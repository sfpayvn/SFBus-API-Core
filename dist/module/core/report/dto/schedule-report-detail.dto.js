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
exports.PaginatedScheduleReportDto = exports.ScheduleReportQueryDto = exports.ScheduleReportDetailDto = exports.ScheduleReportStatsDto = exports.GoodsStatsDto = exports.BookingStatsDto = exports.GoodsDetailReportDto = exports.BookingDetailReportDto = exports.BookingItemDetailDto = exports.SeatDetailReportDto = void 0;
const class_validator_1 = require("class-validator");
class SeatDetailReportDto {
}
exports.SeatDetailReportDto = SeatDetailReportDto;
class BookingItemDetailDto {
}
exports.BookingItemDetailDto = BookingItemDetailDto;
class BookingDetailReportDto {
}
exports.BookingDetailReportDto = BookingDetailReportDto;
class GoodsDetailReportDto {
}
exports.GoodsDetailReportDto = GoodsDetailReportDto;
class BookingStatsDto {
}
exports.BookingStatsDto = BookingStatsDto;
class GoodsStatsDto {
}
exports.GoodsStatsDto = GoodsStatsDto;
class ScheduleReportStatsDto {
}
exports.ScheduleReportStatsDto = ScheduleReportStatsDto;
class ScheduleReportDetailDto {
}
exports.ScheduleReportDetailDto = ScheduleReportDetailDto;
class ScheduleReportQueryDto {
    constructor() {
        this.includeBookings = true;
        this.includeGoods = true;
        this.includeStats = true;
    }
}
exports.ScheduleReportQueryDto = ScheduleReportQueryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ScheduleReportQueryDto.prototype, "includeBookings", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ScheduleReportQueryDto.prototype, "includeGoods", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ScheduleReportQueryDto.prototype, "includeStats", void 0);
class PaginatedScheduleReportDto {
}
exports.PaginatedScheduleReportDto = PaginatedScheduleReportDto;
//# sourceMappingURL=schedule-report-detail.dto.js.map