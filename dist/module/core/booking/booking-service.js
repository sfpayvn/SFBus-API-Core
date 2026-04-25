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
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const status_constants_1 = require("../../../common/constants/status.constants");
const booking_schema_1 = require("./schema/booking.schema");
const class_transformer_1 = require("class-transformer");
const booking_dto_1 = require("./dto/booking.dto");
const nanoid_1 = require("nanoid");
const booking_gateway_1 = require("./booking.gateway");
const payment_service_1 = require("../payment/payment-service");
const bus_schedule_layout_service_1 = require("../bus/bus-schedule-layout/bus-schedule-layout.service");
const bus_schedule_service_1 = require("../bus/bus-schedule/bus-schedule.service");
const bus_schedule_schema_1 = require("../bus/bus-schedule/schema/bus-schedule.schema");
const counter_service_1 = require("../counter/counter-service");
const utils_1 = require("../../../utils/utils");
const roles_constants_1 = require("../../../common/constants/roles.constants");
let BookingService = class BookingService {
    constructor(bookingModel, busScheduleService, counterService, paymentService, busScheduleLayoutService, bookingGateway) {
        this.bookingModel = bookingModel;
        this.busScheduleService = busScheduleService;
        this.counterService = counterService;
        this.paymentService = paymentService;
        this.busScheduleLayoutService = busScheduleLayoutService;
        this.bookingGateway = bookingGateway;
        this.rootTenantId = process.env.ROOT_TENANT_ID || '';
        this.alphabet = process.env.ALPHABET || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        this.nanoid = (0, nanoid_1.customAlphabet)(this.alphabet, 6);
        this.watchChanges();
    }
    toBookingDto(data) {
        if (!data)
            return data;
        const dto = (0, class_transformer_1.plainToInstance)(booking_dto_1.BookingDto, data, { excludeExtraneousValues: true });
        return dto;
    }
    async watchChanges() {
        try {
            const changeStream = this.bookingModel.watch();
            changeStream.on('change', async (nodeChange) => {
                const bookingId = nodeChange.documentKey._id;
                const booking = await this.findOne(bookingId);
                if (!booking)
                    return;
                this.bookingGateway.bookingChangeOfBusSchedule(booking, new mongoose_2.Types.ObjectId(booking.busScheduleId));
            });
        }
        catch (error) {
            console.error('Lỗi khi theo dõi thay đổi:', error);
        }
    }
    async create(createBookings, tenantId, userId, idempotencyKey) {
        if (!createBookings || createBookings.length <= 0) {
            throw new common_1.NotFoundException('createBookings not found');
        }
        const existedBookings = await this.bookingModel
            .find({ tenantId, userId, idempotencyKey })
            .populate('busRoute')
            .populate('busSchedule')
            .populate({ path: 'payments', populate: { path: 'paymentMethod' } })
            .lean()
            .exec();
        if (existedBookings && existedBookings.length > 0) {
            return existedBookings.map((b) => this.toBookingDto(b));
        }
        const existingBookings = await this.bookingModel
            .find({
            tenantId,
            status: { $in: [status_constants_1.BOOKING_STATUS.RESERVED, status_constants_1.BOOKING_STATUS.PAID, status_constants_1.BOOKING_STATUS.DEPOSITED] },
            bookingItems: {
                $elemMatch: {
                    'seat._id': {
                        $in: createBookings.flatMap((b) => b.bookingItems.map((item) => item.seat._id)),
                    },
                },
            },
        })
            .lean()
            .exec();
        if (existingBookings && existingBookings.length > 0) {
            throw new common_1.NotFoundException('Some seats have already been booked.');
        }
        const bookingGroupNumber = this.generateNumberAlphabet();
        const busScheduleId = createBookings.at(0)?.busScheduleId || '';
        if (!busScheduleId) {
            throw new common_1.NotFoundException(`Bus Schedule with ${busScheduleId} not found`);
        }
        const busSchedule = await this.busScheduleService.findOne(busScheduleId, tenantId);
        if (!busSchedule) {
            throw new common_1.NotFoundException(`Bus Schedule with ID "${busScheduleId}" not found.`);
        }
        if (!createBookings[0].bookingItems || createBookings[0].bookingItems.length === 0) {
            throw new common_1.NotFoundException('Booking items not found');
        }
        const now = Date.now();
        const paymentTime = new Date(now + 10 * 60 * 1000);
        const source = createBookings[0]?.source || roles_constants_1.ROLE_CONSTANTS.CLIENT;
        const bookingInstances = createBookings.map((dto) => {
            const expiresAt = source === roles_constants_1.ROLE_CONSTANTS.CLIENT ? paymentTime : undefined;
            return new this.bookingModel({
                ...dto,
                _id: new mongoose_2.Types.ObjectId(),
                tenantId,
                userId,
                bookingNumber: this.generateNumberAlphabet(),
                bookingGroupNumber,
                paymentTime,
                expiresAt,
                idempotencyKey,
                source: dto.source || source,
                startDate: busSchedule.startDate,
                endDate: busSchedule.endDate,
            });
        });
        const requestUpdateSeatsStatus = [];
        for (const createBookingModel of bookingInstances) {
            const bookingPromises = await Promise.all(createBookingModel.bookingItems.map(async (bookingItem) => {
                const seatStatus = bookingItem.seat.status || 'not_picked_up';
                bookingItem.bookingItemNumber = this.generateNumberAlphabet();
                bookingItem._id = new mongoose_2.Types.ObjectId();
                const seatNumber = await this.counterService.getNextSeatNumber(tenantId);
                bookingItem.seat.seatNumber = seatNumber;
                bookingItem.seat.status = seatStatus;
                const updateSeatStatus = {
                    _id: bookingItem.seat._id,
                    status: seatStatus,
                    bookingStatus: createBookingModel.status,
                    bookingId: createBookingModel._id,
                    bookingNumber: createBookingModel.bookingNumber,
                };
                requestUpdateSeatsStatus.push(updateSeatStatus);
                return { ...bookingItem };
            }));
            await Promise.all(bookingPromises);
            createBookingModel.tenantId = tenantId;
            try {
                await createBookingModel.save();
                await this.busScheduleLayoutService.updateSeatStatusByBusSchedule(busScheduleId, requestUpdateSeatsStatus, tenantId);
            }
            catch (error) {
                if (error.code === 11000) {
                    if (error.message?.includes('idempotencyKey')) {
                        const existedBookings = await this.bookingModel
                            .find({ tenantId, userId, idempotencyKey })
                            .populate('busRoute')
                            .populate('busSchedule')
                            .populate({ path: 'payments', populate: { path: 'paymentMethod' } })
                            .lean()
                            .exec();
                        if (existedBookings && existedBookings.length > 0) {
                            return existedBookings.map((b) => this.toBookingDto(b));
                        }
                    }
                    throw new common_1.NotFoundException('Some seats have already been booked.');
                }
                throw error;
            }
        }
        const savedBookingIds = bookingInstances.map((instance) => instance._id);
        const savedBookings = await this.bookingModel
            .find({ _id: { $in: savedBookingIds } })
            .populate('busRoute')
            .populate('busSchedule')
            .populate({ path: 'payments', populate: { path: 'paymentMethod' } })
            .lean()
            .exec();
        return savedBookings.map((booking) => this.toBookingDto(booking));
    }
    async update(updateBookingDto, tenantId) {
        let updateBookingModel = await this.bookingModel.findOne({ _id: updateBookingDto._id, tenantId }).exec();
        if (!updateBookingModel) {
            throw new common_1.NotFoundException(`Booking with ID "${updateBookingDto._id}" not found.`);
        }
        const oldData = updateBookingModel.toObject();
        updateBookingModel = Object.assign(updateBookingModel, updateBookingDto);
        const busScheduleId = updateBookingDto.busScheduleId || '';
        if (!busScheduleId) {
            throw new common_1.NotFoundException(`Bus Schedule with ${busScheduleId} not found`);
        }
        const bookingItems = updateBookingModel.bookingItems;
        const requestUpdateSeatsStatus = [];
        if (bookingItems && bookingItems.length > 0) {
            updateBookingModel.bookingItems = await Promise.all(bookingItems.map(async (bookingItem) => {
                const seatStatus = bookingItem.seat.status || 'not_picked_up';
                const updateSeatStatus = {
                    _id: bookingItem.seat._id,
                    bookingId: updateBookingDto._id,
                    status: seatStatus,
                };
                requestUpdateSeatsStatus.push(updateSeatStatus);
                return {
                    ...bookingItem,
                    bookingItemNumber: bookingItem.bookingItemNumber || this.generateNumberAlphabet(),
                    status: seatStatus,
                };
            }));
        }
        await this.busScheduleLayoutService.updateSeatStatusByBusSchedule(busScheduleId, requestUpdateSeatsStatus, tenantId);
        await updateBookingModel.save();
        const savedBooking = await this.bookingModel
            .findById(updateBookingDto._id)
            .populate('busRoute')
            .populate('busSchedule')
            .populate({ path: 'payments', populate: { path: 'paymentMethod' } })
            .lean()
            .exec();
        const result = this.toBookingDto(savedBooking);
        result._oldData = oldData;
        return result;
    }
    async updateStatusById(bookingId, status, tenantId) {
        const updateOperation = { $set: { status } };
        if (status === status_constants_1.BOOKING_STATUS.PAID || status === status_constants_1.BOOKING_STATUS.DEPOSITED) {
            updateOperation.$set.paymentTime = new Date();
            updateOperation.$unset = { expiresAt: '' };
        }
        await this.bookingModel.updateOne({ _id: bookingId, tenantId }, updateOperation).exec();
        const updatedBooking = await this.bookingModel
            .findOne({ _id: bookingId, tenantId })
            .populate('busRoute')
            .populate('busSchedule')
            .populate({ path: 'payments', populate: { path: 'paymentMethod' } })
            .lean()
            .exec();
        return this.toBookingDto(updatedBooking);
    }
    async updateBookingItems(busScheduleId, updateBookingItemDtos, tenantId) {
        if (!updateBookingItemDtos || updateBookingItemDtos.length === 0) {
            throw new common_1.NotFoundException('No booking items provided to update.');
        }
        const bookingItemIds = updateBookingItemDtos.map((dto) => dto._id);
        const dtoMap = new Map(updateBookingItemDtos.map((dto) => [dto._id.toString(), dto]));
        const bookings = await this.bookingModel
            .find({
            tenantId,
            busScheduleId,
            'bookingItems._id': { $in: bookingItemIds },
        })
            .exec();
        if (!bookings || bookings.length === 0) {
            throw new common_1.NotFoundException(`Booking with busScheduleId "${busScheduleId}" and the provided booking item IDs not found.`);
        }
        const oldDataMap = new Map();
        const updateSeatStatusList = [];
        for (const booking of bookings) {
            for (let i = 0; i < booking.bookingItems.length; i++) {
                const bookingItem = booking.bookingItems[i];
                const dto = dtoMap.get(bookingItem._id.toString());
                if (!dto)
                    continue;
                oldDataMap.set(bookingItem._id.toString(), { ...bookingItem });
                Object.assign(booking.bookingItems[i], dto);
                booking.markModified(`bookingItems.${i}`);
                updateSeatStatusList.push({
                    _id: booking.bookingItems[i].seat._id,
                    bookingId: booking._id,
                    status: dto.seat.status,
                });
            }
            await booking.save();
        }
        if (updateSeatStatusList.length === 0) {
            throw new common_1.NotFoundException('No matching booking items found to update.');
        }
        await this.busScheduleLayoutService.updateSeatStatusByBusSchedule(busScheduleId, updateSeatStatusList, tenantId);
        const updatedBookings = await this.bookingModel
            .find({
            tenantId,
            busScheduleId,
            'bookingItems._id': { $in: bookingItemIds },
        })
            .populate('busRoute')
            .populate('busSchedule')
            .populate({ path: 'payments', populate: { path: 'paymentMethod' } })
            .lean()
            .exec();
        const results = [];
        for (const updatedBooking of updatedBookings) {
            const matchedItems = updatedBooking.bookingItems.filter((item) => dtoMap.has(item._id.toString()));
            for (const updatedBookingItem of matchedItems) {
                const result = (0, class_transformer_1.plainToInstance)(booking_dto_1.BookingItemDto, updatedBookingItem);
                result._oldData = oldDataMap.get(updatedBookingItem._id.toString());
                results.push(result);
            }
        }
        return results;
    }
    async updateBookingItemBoarding(busScheduleId, bookingItemIds, status, tenantId) {
        if (!bookingItemIds || bookingItemIds.length === 0) {
            throw new common_1.NotFoundException('No booking items provided to update.');
        }
        const bookingItemIdStrings = bookingItemIds.map((id) => id.toString());
        const bookings = await this.bookingModel
            .find({
            tenantId,
            busScheduleId,
            'bookingItems._id': { $in: bookingItemIds },
        })
            .exec();
        if (!bookings || bookings.length === 0) {
            throw new common_1.NotFoundException(`Bookings with busScheduleId "${busScheduleId}" and booking items not found.`);
        }
        const oldDataMap = new Map();
        const updateSeatStatusList = [];
        for (const booking of bookings) {
            for (let i = 0; i < booking.bookingItems.length; i++) {
                const bookingItem = booking.bookingItems[i];
                if (bookingItemIdStrings.includes(bookingItem._id.toString())) {
                    oldDataMap.set(bookingItem._id.toString(), bookingItem);
                    booking.bookingItems[i].seat.status = status;
                    booking.markModified(`bookingItems.${i}.seat`);
                    const updateSeatStatus = {
                        _id: booking.bookingItems[i].seat._id,
                        bookingId: booking._id,
                        status: status,
                    };
                    updateSeatStatusList.push(updateSeatStatus);
                }
            }
            await booking.save();
        }
        if (updateSeatStatusList.length === 0) {
            throw new common_1.NotFoundException(`No matching booking items found to update.`);
        }
        await this.busScheduleLayoutService.updateSeatStatusByBusSchedule(busScheduleId, updateSeatStatusList, tenantId);
        const updatedBookings = await this.bookingModel
            .find({
            tenantId,
            busScheduleId,
            'bookingItems._id': { $in: bookingItemIds },
        })
            .populate('busRoute')
            .populate('busSchedule')
            .populate({ path: 'payments', populate: { path: 'paymentMethod' } })
            .lean()
            .exec();
        const results = [];
        for (const updatedBooking of updatedBookings) {
            const updatedBookingItems = updatedBooking.bookingItems.filter((item) => bookingItemIdStrings.includes(item._id.toString()));
            for (const updatedBookingItem of updatedBookingItems) {
                const result = (0, class_transformer_1.plainToInstance)(booking_dto_1.BookingItemDto, updatedBookingItem);
                result._oldData = oldDataMap.get(updatedBookingItem._id.toString());
                results.push(result);
            }
        }
        return results;
    }
    async cancelBookingsByCustomer(userId, busScheduleId, bookingIds, tenantId) {
        const bookings = await Promise.all(bookingIds.map((bookingId) => {
            return this.bookingModel.findOneAndUpdate({ _id: bookingId, tenantId, busScheduleId, userId }, { status: status_constants_1.BOOKING_STATUS.CANCELLED });
        }));
        if (!bookings || bookings.length === 0) {
            throw new common_1.NotFoundException(`No bookings found for the provided IDs.`);
        }
        const seatIds = [];
        for (const booking of bookings) {
            if (booking && booking.bookingItems && booking.bookingItems.length > 0) {
                for (const bookingItem of booking.bookingItems) {
                    seatIds.push(bookingItem.seat._id);
                }
            }
        }
        await this.busScheduleLayoutService.updateCancelledSeatStatusByBusSchedule(busScheduleId, seatIds, tenantId);
        return true;
    }
    async cancelBookings(busScheduleId, bookingIds, tenantId, updatedBy) {
        const bookings = await Promise.all(bookingIds.map((bookingId) => {
            return this.bookingModel.findOneAndUpdate({ _id: bookingId, tenantId, busScheduleId }, { status: status_constants_1.BOOKING_STATUS.CANCELLED, updatedBy });
        }));
        if (!bookings || bookings.length === 0) {
            throw new common_1.NotFoundException(`No bookings found for the provided IDs.`);
        }
        const seatIds = [];
        for (const booking of bookings) {
            if (booking && booking.bookingItems && booking.bookingItems.length > 0) {
                for (const bookingItem of booking.bookingItems) {
                    seatIds.push(bookingItem.seat._id);
                }
            }
        }
        await this.busScheduleLayoutService.updateCancelledSeatStatusByBusSchedule(busScheduleId, seatIds, tenantId);
        return true;
    }
    async cancelBookingsByUser(userId, busScheduleId, bookingIds, tenantId) {
        const bookings = await Promise.all(bookingIds.map((bookingId) => {
            return this.bookingModel.findOneAndUpdate({ _id: bookingId, tenantId, busScheduleId, userId }, { status: status_constants_1.BOOKING_STATUS.CANCELLED });
        }));
        if (!bookings || bookings.length === 0) {
            throw new common_1.NotFoundException(`No bookings found for the provided IDs.`);
        }
        const seatIds = [];
        for (const booking of bookings) {
            if (booking && booking.bookingItems && booking.bookingItems.length > 0) {
                for (const bookingItem of booking.bookingItems) {
                    seatIds.push(bookingItem.seat._id);
                }
            }
        }
        await this.busScheduleLayoutService.updateCancelledSeatStatusByBusSchedule(busScheduleId, seatIds, tenantId);
        return true;
    }
    async deleteOne(id) {
        const result = await this.bookingModel.findByIdAndDelete(id).lean().exec();
        return result !== null;
    }
    async findAll(tenantId) {
        const bookings = await this.bookingModel
            .find({ tenantId })
            .populate('busRoute')
            .populate('busSchedule')
            .populate({ path: 'payments', populate: { path: 'paymentMethod' } })
            .lean()
            .exec();
        return bookings.map((b) => this.toBookingDto(b));
    }
    async findAllByBookingGroupNumber(bookingGroupNumber, tenantId) {
        const bookings = await this.bookingModel
            .find({ bookingGroupNumber, tenantId })
            .populate('busRoute')
            .populate('busSchedule')
            .populate({ path: 'payments', populate: { path: 'paymentMethod' } })
            .lean()
            .exec();
        return bookings.map((b) => this.toBookingDto(b));
    }
    async findByIds(bookingIds, tenantId) {
        const bookingModels = await this.bookingModel
            .find({ tenantId, _id: { $in: bookingIds } })
            .populate('busRoute')
            .populate('busSchedule')
            .populate({ path: 'payments', populate: { path: 'paymentMethod' } })
            .lean()
            .exec();
        if (!bookingModels || bookingModels.length === 0)
            return null;
        return bookingModels.map((b) => this.toBookingDto(b));
    }
    async findOneByBookingNumber(bookingNumber, tenantId) {
        const bookings = await this.bookingModel
            .findOne({ bookingNumber, tenantId })
            .populate('busRoute')
            .populate('busSchedule')
            .populate({ path: 'payments', populate: { path: 'paymentMethod' } })
            .lean()
            .exec();
        return this.toBookingDto(bookings);
    }
    async findOneBookingsByBookingItemId(bookingItemId, tenantId) {
        const bookingDoc = await this.bookingModel
            .findOne({ tenantId, bookingItems: { $elemMatch: { _id: bookingItemId } } })
            .populate({
            path: 'busSchedule',
            model: bus_schedule_schema_1.BusScheduleDocument.name,
            match: { tenantId },
        })
            .lean()
            .exec();
        const bookingDto = this.toBookingDto(bookingDoc);
        if (bookingDto?.busSchedule) {
            const schedule = bookingDto.busSchedule;
            bookingDto.busSchedule.remainSeat = await this.busScheduleLayoutService.getRemainSeats(schedule._id, tenantId);
            const enrichSchedules = await this.busScheduleService.enrichSchedules([schedule], tenantId);
            bookingDto.busSchedule = enrichSchedules[0];
            if (!bookingDto.busSchedule.busId) {
                bookingDto.busSchedule.bus = undefined;
            }
        }
        return bookingDto;
    }
    async findAllByScheduleId(busScheduleId, tenantId, filters) {
        const match = { busScheduleId, tenantId };
        const ands = [];
        if (filters && Array.isArray(filters)) {
            for (const { key, value } of filters) {
                ands.push((0, utils_1.processFilterValue)(key, value));
            }
        }
        if (ands.length)
            match.$and = ands;
        const items = await this.bookingModel
            .find(match)
            .populate('busRoute')
            .populate('busSchedule')
            .populate({ path: 'payments', populate: { path: 'paymentMethod' } })
            .lean()
            .exec();
        const bookings = items.map((b) => this.toBookingDto(b)) || [];
        return bookings;
    }
    async findAllByUser(userId, tenantId) {
        const bookingModel = await this.bookingModel
            .find({ userId, tenantId })
            .sort({ createdAt: -1 })
            .populate('busRoute')
            .populate('busSchedule')
            .populate({ path: 'payments', populate: { path: 'paymentMethod' } })
            .lean()
            .exec();
        return bookingModel.map((b) => this.toBookingDto(b)) || [];
    }
    async findIncommingBookingByUser(userId, tenantId) {
        const now = new Date();
        const bookingModels = await this.bookingModel
            .find({
            userId,
            tenantId,
            status: { $in: [status_constants_1.BOOKING_STATUS.RESERVED, status_constants_1.BOOKING_STATUS.PAID, status_constants_1.BOOKING_STATUS.DEPOSITED] },
            startDate: { $gte: now },
        })
            .populate('busRoute')
            .populate('busSchedule')
            .populate({ path: 'payments', populate: { path: 'paymentMethod' } })
            .lean()
            .exec();
        return bookingModels.map((b) => this.toBookingDto(b)) || [];
    }
    async findOneByIdAndUser(userId, bookingId, tenantId) {
        const bookingModel = await this.bookingModel
            .findOne({ userId, _id: bookingId, tenantId })
            .populate('busRoute')
            .populate('busSchedule')
            .populate({ path: 'payments', populate: { path: 'paymentMethod' } })
            .lean()
            .exec();
        const booking = this.toBookingDto(bookingModel);
        if (!booking)
            return null;
        return booking;
    }
    async findOneByIdsAndUser(userId, bookingIds, tenantId) {
        const bookingModels = await this.bookingModel
            .find({ userId, tenantId, _id: { $in: bookingIds } })
            .populate('busRoute')
            .populate('busSchedule')
            .populate({ path: 'payments', populate: { path: 'paymentMethod' } })
            .lean()
            .exec();
        if (!bookingModels || bookingModels.length === 0)
            return null;
        return bookingModels.map((b) => this.toBookingDto(b));
    }
    async findBookings2Payment(userId, bookingIds, tenantId) {
        const bookingDocs = await this.bookingModel
            .find({ userId, tenantId, _id: { $in: bookingIds } })
            .lean()
            .exec();
        if (!bookingDocs.length)
            return null;
        const bookings = [];
        for (const bookingDoc of bookingDocs) {
            const booking = this.toBookingDto(bookingDoc);
            booking.discountTotalAmount = 0;
            booking.afterDiscountTotalPrice = booking.totalPrice;
            for (const item of booking.bookingItems) {
                item.discountAmount = 0;
                item.afterDiscountPrice = item.price;
            }
            await this.bookingModel.updateOne({ _id: booking._id, tenantId }, {
                $set: {
                    bookingItems: booking.bookingItems,
                    discountTotalAmount: booking.discountTotalAmount,
                    afterDiscountTotalPrice: booking.afterDiscountTotalPrice,
                },
            });
            const busSchedule = await this.busScheduleService.findOne(new mongoose_2.Types.ObjectId(booking.busScheduleId), tenantId);
            if (busSchedule) {
                booking.busSchedule = busSchedule;
            }
            bookings.push(booking);
        }
        return bookings;
    }
    async findBookingSeats(seatIds, tenantId) {
        const bookingModels = await this.bookingModel
            .find({
            tenantId,
            bookingItems: {
                $elemMatch: { seat: { _id: { $in: seatIds } } },
            },
            $or: [{ status: status_constants_1.BOOKING_STATUS.PAID }, { status: status_constants_1.BOOKING_STATUS.RESERVED }],
        })
            .exec();
        if (!bookingModels || bookingModels.length === 0)
            return null;
        const seatIdsFiltered = bookingModels.flatMap((bookingModel) => bookingModel.bookingItems.flatMap((item) => item.seats?.filter((seat) => seatIds.some((id) => id.equals(seat._id))).map((seat) => seat._id) ||
            []));
        return seatIdsFiltered;
    }
    async findBookingBySchedule(busScheduleId, tenantId) {
        const bookingModels = await this.bookingModel
            .find({
            tenantId,
            busScheduleId,
            $or: [
                { status: status_constants_1.BOOKING_STATUS.RESERVED },
                { status: status_constants_1.BOOKING_STATUS.PAID },
                { status: status_constants_1.BOOKING_STATUS.DEPOSITED },
            ],
        })
            .populate('busRoute')
            .populate('busSchedule')
            .populate({ path: 'payments', populate: { path: 'paymentMethod' } })
            .lean()
            .exec();
        if (!bookingModels || bookingModels.length === 0)
            return null;
        return bookingModels.map((m) => this.toBookingDto(m));
    }
    async search(pageIdx, pageSize, keyword, sortBy, filters, tenantId) {
        const pipeline = await this.buildQuerySearchBookingPaging(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
        const items = await this.bookingModel.aggregate(pipeline).exec();
        const countOnlyPipeline = await this.buildQuerySearchBookingPaging(0, 0, keyword, sortBy, filters, tenantId);
        const countResult = await this.bookingModel.aggregate([...countOnlyPipeline, { $count: 'total' }]).exec();
        const totalItem = countResult.length > 0 ? countResult[0].total : 0;
        const bookings = items.map((b) => this.toBookingDto(b)) || [];
        return {
            pageIdx,
            bookings,
            totalPage: Math.ceil(totalItem / pageSize),
            totalItem,
        };
    }
    async buildQuerySearchBookingPaging(pageIdx, pageSize, keyword, sortBy, filters, tenantId) {
        let skip = 0;
        if (pageIdx && pageSize) {
            skip = Math.max((pageIdx - 1) * pageSize, 0);
        }
        const pipeline = [];
        const matchConditions = [{ tenantId }];
        if (keyword) {
            matchConditions.push({
                $or: [
                    { name: { $regex: keyword, $options: 'i' } },
                    { bookingNumber: { $regex: keyword, $options: 'i' } },
                    { 'userInfo.phoneNumber': { $regex: keyword, $options: 'i' } },
                    { 'userInfo.name': { $regex: keyword, $options: 'i' } },
                    { 'userInfo.email': { $regex: keyword, $options: 'i' } },
                ],
            });
        }
        let startDateValue = null;
        let endDateValue = null;
        if (Array.isArray(filters)) {
            for (const { key, value } of filters) {
                if (!key || value == null || (Array.isArray(value) && value.length === 0))
                    continue;
                if (key === 'startDate') {
                    const dateValue = (0, utils_1.getFirstValue)(value);
                    startDateValue = new Date(dateValue);
                }
                else if (key === 'endDate') {
                    const dateValue = (0, utils_1.getFirstValue)(value);
                    endDateValue = new Date(dateValue);
                }
                else if (key === 'phoneNumber') {
                    const phoneValue = (0, utils_1.getFirstValue)(value);
                    matchConditions.push({ 'userInfo.phoneNumber': { $regex: phoneValue, $options: 'i' } });
                }
                else {
                    matchConditions.push((0, utils_1.processFilterValue)(key, value));
                }
            }
        }
        if (startDateValue || endDateValue) {
            const range = {};
            if (startDateValue)
                range.$gte = startDateValue;
            if (endDateValue)
                range.$lte = endDateValue;
            matchConditions.push({ createdAt: range });
        }
        pipeline.push({
            $match: { $and: matchConditions },
        });
        pipeline.push({
            $lookup: {
                from: 'bus_schedules',
                localField: 'busScheduleId',
                foreignField: '_id',
                as: 'busSchedule',
            },
        });
        pipeline.push({
            $unwind: { path: '$busSchedule', preserveNullAndEmptyArrays: true },
        });
        if (sortBy?.key) {
            let sortDirection = sortBy.value === 'ascend' ? 1 : -1;
            let sortField = sortBy.key;
            pipeline.push({
                $sort: { [sortField]: sortDirection },
            });
        }
        if (pageSize > 0) {
            pipeline.push({ $skip: skip });
            pipeline.push({ $limit: pageSize });
        }
        return pipeline;
    }
    async findOne(id) {
        const booking = await this.bookingModel
            .findById(id)
            .populate('busRoute')
            .populate('busSchedule')
            .populate({ path: 'payments', populate: { path: 'paymentMethod' } })
            .lean()
            .exec();
        return this.toBookingDto(booking);
    }
    async findOneWithTenant(id, tenantId) {
        const booking = await this.bookingModel
            .findOne({ _id: id, tenantId })
            .populate('busRoute')
            .populate('busSchedule')
            .populate({ path: 'payments', populate: { path: 'paymentMethod' } })
            .lean()
            .exec();
        return this.toBookingDto(booking);
    }
    generateNumberAlphabet() {
        return this.nanoid();
    }
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(booking_schema_1.BookingDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => bus_schedule_service_1.BusScheduleService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => counter_service_1.CounterService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => payment_service_1.PaymentService))),
    __param(4, (0, common_1.Inject)((0, common_1.forwardRef)(() => bus_schedule_layout_service_1.BusScheduleLayoutService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        bus_schedule_service_1.BusScheduleService,
        counter_service_1.CounterService,
        payment_service_1.PaymentService,
        bus_schedule_layout_service_1.BusScheduleLayoutService,
        booking_gateway_1.BookingGateway])
], BookingService);
//# sourceMappingURL=booking-service.js.map