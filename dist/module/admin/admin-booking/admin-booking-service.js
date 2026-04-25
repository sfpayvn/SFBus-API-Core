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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminBookingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const nanoid_1 = require("nanoid");
const admin_booking_gateway_1 = require("./admin-booking.gateway");
const booking_schema_1 = require("../../core/booking/schema/booking.schema");
const booking_service_1 = require("../../core/booking/booking-service");
const admin_booking_dto_1 = require("./dto/admin-booking.dto");
const class_transformer_1 = require("class-transformer");
const admin_payment_service_1 = require("../admin-payment/admin-payment-service");
const booking_dto_1 = require("../../core/booking/dto/booking.dto");
let AdminBookingService = class AdminBookingService {
    constructor(bookingModel, bookingService, AdminPaymentService, AdminBookingGateway) {
        this.bookingModel = bookingModel;
        this.bookingService = bookingService;
        this.AdminPaymentService = AdminPaymentService;
        this.AdminBookingGateway = AdminBookingGateway;
        this.alphabet = process.env.ALPHABET || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        this.nanoid = (0, nanoid_1.customAlphabet)(this.alphabet, 6);
    }
    async findAllByScheduleId(busScheduleId, tenantId) {
        return this.bookingService.findAllByScheduleId(busScheduleId, tenantId);
    }
    async create(adminCreateBookingDto, tenantId, userId, idempotencyKey) {
        const bookingDtos = await this.bookingService.create(adminCreateBookingDto, tenantId, userId, idempotencyKey);
        return (0, class_transformer_1.plainToInstance)(admin_booking_dto_1.AdminBookingDto, bookingDtos);
    }
    async update(adminUpdateBookingDto, tenantId) {
        const bookingDto = await this.bookingService.update(adminUpdateBookingDto, tenantId);
        return (0, class_transformer_1.plainToInstance)(admin_booking_dto_1.AdminBookingDto, bookingDto);
    }
    async findOne(id, tenantId) {
        const bookingModel = await this.bookingModel.findOne({ _id: id, tenantId }).lean().exec();
        return (0, class_transformer_1.plainToInstance)(booking_dto_1.BookingDto, bookingModel);
    }
    async findAllByPaymentNumber(paymentNumber, tenantId) {
        const bookings = await this.bookingModel.find({ paymentNumber, tenantId }).lean().exec();
        return (0, class_transformer_1.plainToInstance)(admin_booking_dto_1.AdminBookingDto, bookings);
    }
    async search(pageIdx, pageSize, keyword, sortBy, filters, tenantId) {
        return this.bookingService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
    }
};
exports.AdminBookingService = AdminBookingService;
exports.AdminBookingService = AdminBookingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(booking_schema_1.BookingDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => booking_service_1.BookingService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => admin_payment_service_1.AdminPaymentService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        booking_service_1.BookingService,
        admin_payment_service_1.AdminPaymentService,
        admin_booking_gateway_1.AdminBookingGateway])
], AdminBookingService);
//# sourceMappingURL=admin-booking-service.js.map