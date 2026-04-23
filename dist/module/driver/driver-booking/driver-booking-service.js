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
exports.DriverBookingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const nanoid_1 = require("nanoid");
const status_constants_1 = require("../../../common/constants/status.constants");
const driver_booking_gateway_1 = require("./driver-booking.gateway");
const booking_schema_1 = require("../../core/booking/schema/booking.schema");
const booking_service_1 = require("../../core/booking/booking-service");
const driver_tracking_service_1 = require("../driver-tracking/driver-tracking.service");
const tracking_types_1 = require("../../core/tracking/constants/tracking-types");
const driver_booking_dto_1 = require("./dto/driver-booking.dto");
const class_transformer_1 = require("class-transformer");
const driver_payment_service_1 = require("../driver-payment/driver-payment-service");
const booking_dto_1 = require("../../core/booking/dto/booking.dto");
const roles_constants_1 = require("../../../common/constants/roles.constants");
let DriverBookingService = class DriverBookingService {
    constructor(bookingModel, bookingService, DriverPaymentService, driverTrackingService, DriverBookingGateway) {
        this.bookingModel = bookingModel;
        this.bookingService = bookingService;
        this.DriverPaymentService = DriverPaymentService;
        this.driverTrackingService = driverTrackingService;
        this.DriverBookingGateway = DriverBookingGateway;
        this.alphabet = process.env.ALPHABET || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        this.nanoid = (0, nanoid_1.customAlphabet)(this.alphabet, 6);
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
    async findOneBookingsByBookingItemId(bookingId, tenantId) {
        return this.bookingService.findOneBookingsByBookingItemId(bookingId, tenantId);
    }
    async updateBookingItems(busScheduleId, driverUpdateBookingItemDto, tenantId, updatedBy) {
        const bookingItems = (await this.bookingService.updateBookingItems(busScheduleId, driverUpdateBookingItemDto, tenantId));
        if (updatedBy) {
            for (const bookingItem of bookingItems) {
                const changes = bookingItem._oldData
                    ? this.prepareChanges(driverUpdateBookingItemDto, bookingItem._oldData)
                    : null;
                await this.driverTrackingService.create({
                    type: tracking_types_1.TRACKING_TYPES.BOOKING_UPDATED,
                    platform: roles_constants_1.ROLE_CONSTANTS.DRIVER,
                    metadata: {
                        busScheduleId: busScheduleId,
                        bookingItemIds: driverUpdateBookingItemDto.map((dto) => dto._id),
                        seatStatus: driverUpdateBookingItemDto.map((dto) => dto.seat?.status),
                        action: 'update_booking_item',
                        oldValue: bookingItem._oldData ? JSON.stringify(bookingItem._oldData) : null,
                        newValue: JSON.stringify(bookingItem),
                        changes: changes ? JSON.stringify(changes) : null,
                        updatedFields: changes ? Object.keys(changes) : [],
                    },
                    createdBy: updatedBy,
                }, tenantId);
            }
        }
        return bookingItems.map((item) => {
            if (item && item._oldData)
                delete item._oldData;
            return item;
        });
    }
    async findOne(id, tenantId) {
        const bookingModel = await this.bookingModel.findOne({ _id: id, tenantId }).lean().exec();
        return (0, class_transformer_1.plainToInstance)(booking_dto_1.BookingDto, bookingModel);
    }
    async findAllByPaymentNumber(paymentNumber, tenantId) {
        const bookings = await this.bookingModel.find({ paymentNumber, tenantId }).lean().exec();
        return (0, class_transformer_1.plainToInstance)(driver_booking_dto_1.DriverBookingDto, bookings);
    }
    async search(pageIdx, pageSize, keyword, sortBy, filters, tenantId) {
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
    async updateBookingItemBoarding(driverRequestUpdateBookingItemBoardingDto, tenantId, updatedBy) {
        const bookingItems = await this.bookingService.updateBookingItemBoarding(driverRequestUpdateBookingItemBoardingDto.busScheduleId, driverRequestUpdateBookingItemBoardingDto.bookingItemIds, driverRequestUpdateBookingItemBoardingDto.status, tenantId);
        if (updatedBy) {
            for (const bookingItem of bookingItems) {
                const changes = bookingItem._oldData
                    ? this.prepareChanges(driverRequestUpdateBookingItemBoardingDto, bookingItem._oldData)
                    : null;
                await this.driverTrackingService.create({
                    type: tracking_types_1.TRACKING_TYPES.BOOKING_UPDATED,
                    platform: roles_constants_1.ROLE_CONSTANTS.DRIVER,
                    metadata: {
                        busScheduleId: driverRequestUpdateBookingItemBoardingDto.busScheduleId,
                        bookingItemIds: driverRequestUpdateBookingItemBoardingDto.bookingItemIds,
                        seatStatus: driverRequestUpdateBookingItemBoardingDto?.status,
                        action: 'update_booking_item',
                        oldValue: bookingItem._oldData ? JSON.stringify(bookingItem._oldData) : null,
                        newValue: JSON.stringify(bookingItem),
                        changes: changes ? JSON.stringify(changes) : null,
                        updatedFields: changes ? Object.keys(changes) : [],
                    },
                    createdBy: updatedBy,
                }, tenantId);
            }
        }
        return bookingItems.map((item) => {
            if (item && item._oldData)
                delete item._oldData;
            return item;
        });
    }
};
exports.DriverBookingService = DriverBookingService;
exports.DriverBookingService = DriverBookingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(booking_schema_1.BookingDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => booking_service_1.BookingService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => driver_payment_service_1.DriverPaymentService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        booking_service_1.BookingService,
        driver_payment_service_1.DriverPaymentService,
        driver_tracking_service_1.DriverTrackingService,
        driver_booking_gateway_1.DriverBookingGateway])
], DriverBookingService);
//# sourceMappingURL=driver-booking-service.js.map