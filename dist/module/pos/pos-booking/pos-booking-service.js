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
exports.PosBookingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const nanoid_1 = require("nanoid");
const status_constants_1 = require("../../../common/constants/status.constants");
const pos_booking_gateway_1 = require("./pos-booking.gateway");
const booking_schema_1 = require("../../core/booking/schema/booking.schema");
const booking_service_1 = require("../../core/booking/booking-service");
const pos_booking_dto_1 = require("./dto/pos-booking.dto");
const class_transformer_1 = require("class-transformer");
const pos_payment_service_1 = require("../pos-payment/pos-payment-service");
const booking_dto_1 = require("../../core/booking/dto/booking.dto");
const pos_tracking_service_1 = require("../pos-tracking/pos-tracking.service");
const tracking_types_1 = require("../../core/tracking/constants/tracking-types");
const roles_constants_1 = require("../../../common/constants/roles.constants");
let PosBookingService = class PosBookingService {
    constructor(bookingModel, bookingService, PosPaymentService, posTrackingService, PosBookingGateway) {
        this.bookingModel = bookingModel;
        this.bookingService = bookingService;
        this.PosPaymentService = PosPaymentService;
        this.posTrackingService = posTrackingService;
        this.PosBookingGateway = PosBookingGateway;
        this.alphabet = process.env.ALPHABET || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        this.nanoid = (0, nanoid_1.customAlphabet)(this.alphabet, 6);
        this.watchChanges();
    }
    async watchChanges() {
        try {
            const changeStream = this.bookingModel.watch();
            changeStream.on('change', async (nodeChange) => {
                const bookingId = nodeChange.documentKey._id;
                const changeType = nodeChange.operationType;
                const booking = await this.bookingService.findOne(bookingId);
                if (!booking) {
                    console.error(`Booking with ID ${bookingId} not found.`);
                    return;
                }
                this.PosBookingGateway.bookingChangeOfBusSchedule(booking, new mongoose_2.Types.ObjectId(booking.busScheduleId));
            });
        }
        catch (error) {
            console.error('Lỗi khi theo dõi thay đổi:', error);
        }
    }
    async create(posCreateBookingDto, tenantId, createdBy, idempotencyKey) {
        const bookingDtos = await this.bookingService.create(posCreateBookingDto, tenantId, createdBy, idempotencyKey);
        for (const bookingDto of bookingDtos) {
            await this.posTrackingService.create({
                type: tracking_types_1.TRACKING_TYPES.BOOKING_CREATED,
                platform: roles_constants_1.ROLE_CONSTANTS.POS,
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
    async cancelBookings(busScheduleId, bookingIds, tenantId, updatedBy) {
        const result = await this.bookingService.cancelBookings(busScheduleId, bookingIds, tenantId, updatedBy);
        await this.posTrackingService.create({
            type: tracking_types_1.TRACKING_TYPES.BOOKING_CANCELLED,
            platform: roles_constants_1.ROLE_CONSTANTS.POS,
            metadata: {
                bookingIds,
                busScheduleId,
                totalCancelled: bookingIds.length,
            },
            createdBy: updatedBy,
        }, tenantId);
        return result;
    }
    async update(posUpdateBookingDto, tenantId, updatedBy) {
        const bookingDto = await this.bookingService.update(posUpdateBookingDto, tenantId);
        if (updatedBy) {
            const changes = bookingDto._oldData ? this.prepareChanges(posUpdateBookingDto, bookingDto._oldData) : null;
            await this.posTrackingService.create({
                type: tracking_types_1.TRACKING_TYPES.BOOKING_UPDATED,
                platform: roles_constants_1.ROLE_CONSTANTS.POS,
                metadata: {
                    bookingId: bookingDto._id,
                    bookingNumber: bookingDto.bookingNumber,
                    oldValue: bookingDto._oldData ? JSON.stringify(bookingDto._oldData) : null,
                    newValue: JSON.stringify(bookingDto),
                    changes: changes ? JSON.stringify(changes) : null,
                    updatedFields: changes ? Object.keys(changes) : [],
                },
                createdBy: updatedBy,
            }, tenantId);
        }
        if (bookingDto && bookingDto._oldData)
            delete bookingDto._oldData;
        return bookingDto;
    }
    async updates(posUpdateBookingsDto, tenantId, updatedBy) {
        const bookingDtos = await Promise.all(posUpdateBookingsDto.map((dto) => this.bookingService.update(dto, tenantId)));
        const allChanges = posUpdateBookingsDto.map((dto, index) => {
            const bookingDto = bookingDtos[index];
            const changes = this.prepareChanges(dto, bookingDto._oldData);
            return {
                bookingId: dto._id,
                changes: JSON.stringify(changes),
            };
        });
        await this.posTrackingService.create({
            type: tracking_types_1.TRACKING_TYPES.BOOKING_BULK_UPDATED,
            platform: roles_constants_1.ROLE_CONSTANTS.POS,
            metadata: {
                bookingIds: bookingDtos.map((b) => b._id),
                bookingNumbers: bookingDtos.map((b) => b.bookingNumber),
                totalUpdated: bookingDtos.length,
                changes: allChanges,
            },
            createdBy: updatedBy,
        }, tenantId);
        return (0, class_transformer_1.plainToInstance)(pos_booking_dto_1.PosBookingDto, bookingDtos);
    }
    async findAllByScheduleId(busScheduleId, tenantId) {
        const filters = [];
        const filterByStatus = {
            key: 'status',
            value: [status_constants_1.BOOKING_STATUS.RESERVED, status_constants_1.BOOKING_STATUS.PAID, status_constants_1.BOOKING_STATUS.DEPOSITED, status_constants_1.BOOKING_STATUS.COMPLETED],
        };
        filters.push(filterByStatus);
        return this.bookingService.findAllByScheduleId(busScheduleId, tenantId, filters);
    }
    async findOne(id, tenantId) {
        const bookingModel = await this.bookingModel.findOne({ _id: id, tenantId }).lean().exec();
        return (0, class_transformer_1.plainToInstance)(booking_dto_1.BookingDto, bookingModel);
    }
    async findAllByPaymentNumber(paymentNumber, tenantId) {
        const bookings = await this.bookingModel.find({ paymentNumber, tenantId }).lean().exec();
        return (0, class_transformer_1.plainToInstance)(pos_booking_dto_1.PosBookingDto, bookings);
    }
    async search(pageIdx, pageSize, keyword, sortBy, filters, tenantId) {
        const filterByStatus = {
            key: 'status',
            value: [status_constants_1.BOOKING_STATUS.RESERVED, status_constants_1.BOOKING_STATUS.PAID, status_constants_1.BOOKING_STATUS.DEPOSITED, status_constants_1.BOOKING_STATUS.COMPLETED],
        };
        filters.push(filterByStatus);
        return this.bookingService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
    }
    prepareChanges(updateDto, oldData) {
        const changes = {};
        Object.keys(updateDto).forEach((key) => {
            if (key !== '_id' && oldData && oldData[key] !== undefined) {
                const oldValue = oldData[key];
                const newValue = updateDto[key];
                if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
                    changes[key] = {
                        oldValue,
                        newValue,
                    };
                }
            }
        });
        return changes;
    }
};
exports.PosBookingService = PosBookingService;
exports.PosBookingService = PosBookingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(booking_schema_1.BookingDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => booking_service_1.BookingService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => pos_payment_service_1.PosPaymentService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        booking_service_1.BookingService,
        pos_payment_service_1.PosPaymentService,
        pos_tracking_service_1.PosTrackingService,
        pos_booking_gateway_1.PosBookingGateway])
], PosBookingService);
//# sourceMappingURL=pos-booking-service.js.map