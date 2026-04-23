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
exports.ClientBookingService = void 0;
const common_1 = require("@nestjs/common");
const booking_service_1 = require("../../core/booking/booking-service");
const client_payment_service_1 = require("../client-payment/client-payment-service");
const client_tracking_service_1 = require("../client-tracking/client-tracking.service");
const tracking_types_1 = require("../../core/tracking/constants/tracking-types");
const status_constants_1 = require("../../../common/constants/status.constants");
const roles_constants_1 = require("../../../common/constants/roles.constants");
let ClientBookingService = class ClientBookingService {
    constructor(bookingService, clientPaymentService, clientTrackingService) {
        this.bookingService = bookingService;
        this.clientPaymentService = clientPaymentService;
        this.clientTrackingService = clientTrackingService;
        this.alphabet = process.env.ALPHABET || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    }
    async create(clientCreateBookingDto, tenantId, createdBy, idempotencyKey) {
        const bookingDtos = await this.bookingService.create(clientCreateBookingDto, tenantId, createdBy, idempotencyKey);
        for (const bookingDto of bookingDtos) {
            await this.clientTrackingService.create({
                type: tracking_types_1.TRACKING_TYPES.BOOKING_CREATED,
                platform: roles_constants_1.ROLE_CONSTANTS.CLIENT,
                metadata: {
                    bookingId: bookingDto._id,
                    bookingNumber: bookingDto.bookingNumber,
                    busScheduleId: bookingDto.busScheduleId,
                    busRouteId: bookingDto.busRouteId,
                    totalTickets: bookingDto.bookingItems.length,
                },
                createdBy: createdBy,
            }, tenantId);
        }
        return bookingDtos;
    }
    async cancelBookingsByUser(userId, busScheduleId, bookingIds, tenantId) {
        return this.bookingService.cancelBookingsByUser(userId, busScheduleId, bookingIds, tenantId);
    }
    async findAllByScheduleId(busScheduleId, tenantId) {
        return this.bookingService.findAllByScheduleId(busScheduleId, tenantId);
    }
    async findIncommingBookingByUser(userId, tenantId) {
        return this.bookingService.findIncommingBookingByUser(userId, tenantId);
    }
    async findHistoryByUser(query, userId, tenantId) {
        const { pageIdx = 0, pageSize = 0, keyword = '', sortBy = { key: 'createdAt', value: 'desc' }, filters = [], } = query;
        filters.push({
            key: 'status',
            value: [status_constants_1.BOOKING_STATUS.COMPLETED, status_constants_1.BOOKING_STATUS.CANCELLED],
        });
        filters.push({
            key: 'userId',
            value: userId,
        });
        return this.bookingService.search(+pageIdx, +pageSize, keyword, sortBy, filters, tenantId);
    }
    async findOne(id, tenantId) {
        return this.bookingService.findOneWithTenant(id, tenantId);
    }
    async findAllByBookingGroupNumber(bookingGroupNumber, tenantId) {
        return (await this.bookingService.findAllByBookingGroupNumber(bookingGroupNumber, tenantId));
    }
    async findBookings2Payment(userId, bookingIds, tenantId) {
        return this.bookingService.findBookings2Payment(userId, bookingIds, tenantId);
    }
};
exports.ClientBookingService = ClientBookingService;
exports.ClientBookingService = ClientBookingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => booking_service_1.BookingService))),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => client_payment_service_1.ClientPaymentService))),
    __metadata("design:paramtypes", [booking_service_1.BookingService,
        client_payment_service_1.ClientPaymentService,
        client_tracking_service_1.ClientTrackingService])
], ClientBookingService);
//# sourceMappingURL=client-booking-service.js.map