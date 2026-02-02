import { forwardRef, Inject, Injectable, NotFoundException, Type } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BOOKING_STATUS } from '@/common/constants/status.constants';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingDocument, BookingItemDocument } from './schema/booking.schema';
import { plainToInstance } from 'class-transformer';
import { BookingDto, BookingItemDto, BookingSortFilter, SearchBookingPagingRes } from './dto/booking.dto';
import { UpdateBookingDto, UpdateBookingItemDto } from './dto/update-booking.dto';
import { customAlphabet } from 'nanoid';
import { BookingGateway } from './booking.gateway';
import { PaymentService } from '../payment/payment-service';
import { BusScheduleLayoutService } from '../bus/bus-schedule-layout/bus-schedule-layout.service';
import { RequestUpdateSeatStatusDto } from '../bus/bus-schedule-layout/dto/bus-schedule-layout.dto';
import { BusScheduleService } from '../bus/bus-schedule/bus-schedule.service';
import { BusScheduleDocument } from '../bus/bus-schedule/schema/bus-schedule.schema';
import { BusDocument } from '../bus/bus/schema/bus.schema';
import { CounterService } from '../counter/counter-service';
import { processFilterValue, getFirstValue, getCurrentDate, toObjectId } from '@/utils/utils';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';
import e from 'express';

@Injectable()
export class BookingService {
  private rootTenantId: string = process.env.ROOT_TENANT_ID || '';
  private alphabet = process.env.ALPHABET || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  private nanoid = customAlphabet(this.alphabet, 6);

  constructor(
    @InjectModel(BookingDocument.name) private readonly bookingModel: Model<BookingDocument>,
    @Inject(forwardRef(() => BusScheduleService)) private readonly busScheduleService: BusScheduleService,
    @Inject(forwardRef(() => CounterService)) private readonly counterService: CounterService,
    @Inject(forwardRef(() => PaymentService)) private readonly paymentService: PaymentService,
    @Inject(forwardRef(() => BusScheduleLayoutService))
    private readonly busScheduleLayoutService: BusScheduleLayoutService,
    private bookingGateway: BookingGateway,
  ) {
    this.watchChanges();
  }

  private toBookingDto(data: any): BookingDto {
    if (!data) return data;

    const dto = plainToInstance(BookingDto, data, { excludeExtraneousValues: true });
    return dto;
  }

  async watchChanges() {
    try {
      const changeStream = this.bookingModel.watch();
      changeStream.on('change', async (nodeChange: any) => {
        const bookingId = nodeChange.documentKey._id;
        const booking = await this.findOne(bookingId);
        if (!booking) return;
        this.bookingGateway.bookingChangeOfBusSchedule(booking, new Types.ObjectId(booking.busScheduleId));
      });
    } catch (error) {
      console.error('Lỗi khi theo dõi thay đổi:', error);
    }
  }

  // -------------------------
  // CREATE / UPDATE
  // -------------------------

  async create(
    createBookings: CreateBookingDto[],
    tenantId: Types.ObjectId,
    userId: Types.ObjectId,
    idempotencyKey: string,
  ): Promise<BookingDto[]> {
    if (!createBookings || createBookings.length <= 0) {
      throw new NotFoundException('createBookings not found');
    }

    // Step 1: Check idempotency key and replay if booking already exists
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

    // Pre-check for already booked seats (for better error message)
    const existingBookings = await this.bookingModel
      .find({
        tenantId,
        status: { $in: [BOOKING_STATUS.RESERVED, BOOKING_STATUS.PAID, BOOKING_STATUS.DEPOSITED] },
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
      throw new NotFoundException('Some seats have already been booked.');
    }

    const bookingGroupNumber = this.generateNumberAlphabet();

    const busScheduleId = createBookings.at(0)?.busScheduleId || '';
    if (!busScheduleId) {
      throw new NotFoundException(`Bus Schedule with ${busScheduleId} not found`);
    }

    const busSchedule = await this.busScheduleService.findOne(busScheduleId, tenantId);

    if (!busSchedule) {
      throw new NotFoundException(`Bus Schedule with ID "${busScheduleId}" not found.`);
    }

    // Step 2: Set expiration time - only for CLIENT source
    const now = Date.now();
    const paymentTime = new Date(now + 10 * 60 * 1000); // 10 minutes

    // Get source from first booking (all bookings in group should have same source)
    const source = createBookings[0]?.source || ROLE_CONSTANTS.CLIENT; // Default to CLIENT if not specified

    const bookingInstances = createBookings.map((dto) => {
      // Only set expiresAt for CLIENT bookings
      const expiresAt = source === ROLE_CONSTANTS.CLIENT ? paymentTime : undefined;
      return new this.bookingModel({
        ...dto,
        _id: new Types.ObjectId(),
        tenantId,
        userId,
        bookingNumber: this.generateNumberAlphabet(),
        bookingGroupNumber,
        paymentTime,
        expiresAt,
        idempotencyKey,
        source: dto.source || source, // Use dto.source if available, otherwise use first booking's source
        startDate: busSchedule.startDate,
        endDate: busSchedule.endDate,
      });
    });

    const requestUpdateSeatsStatus: RequestUpdateSeatStatusDto[] = [];

    for (const createBookingModel of bookingInstances) {
      const bookingPromises = await Promise.all(
        createBookingModel.bookingItems.map(async (bookingItem) => {
          const seatStatus = bookingItem.seat.status || 'not_picked_up';
          bookingItem.bookingItemNumber = this.generateNumberAlphabet();
          bookingItem._id = new Types.ObjectId();
          const seatNumber = await this.counterService.getNextSeatNumber(tenantId);
          bookingItem.seat.seatNumber = seatNumber;
          bookingItem.seat.status = seatStatus;

          const updateSeatStatus: RequestUpdateSeatStatusDto = {
            _id: bookingItem.seat._id,
            status: seatStatus,
            bookingStatus: createBookingModel.status,
            bookingId: createBookingModel._id as Types.ObjectId,
            bookingNumber: createBookingModel.bookingNumber,
          };

          requestUpdateSeatsStatus.push(updateSeatStatus);
          return { ...bookingItem };
        }),
      );

      await Promise.all(bookingPromises);

      createBookingModel.tenantId = tenantId;

      try {
        await createBookingModel.save();
        await this.busScheduleLayoutService.updateSeatStatusByBusSchedule(
          busScheduleId,
          requestUpdateSeatsStatus,
          tenantId,
        );
      } catch (error: any) {
        // Step 4: Handle MongoDB E11000 duplicate key errors
        if (error.code === 11000) {
          // Check if it's duplicate idempotency key
          if (error.message?.includes('idempotencyKey')) {
            // Query and replay the existing booking
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
          // If it's duplicate seat, throw conflict error
          throw new NotFoundException('Some seats have already been booked.');
        }
        throw error;
      }
    }

    // Query saved bookings with populate to return complete data
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

  async update(updateBookingDto: UpdateBookingDto, tenantId: Types.ObjectId): Promise<BookingDto & { _oldData?: any }> {
    let updateBookingModel = await this.bookingModel.findOne({ _id: updateBookingDto._id, tenantId }).exec();

    if (!updateBookingModel) {
      throw new NotFoundException(`Booking with ID "${updateBookingDto._id}" not found.`);
    }

    // Store old data before update
    const oldData = updateBookingModel.toObject();

    updateBookingModel = Object.assign(updateBookingModel, updateBookingDto);

    const busScheduleId = updateBookingDto.busScheduleId || '';
    if (!busScheduleId) {
      throw new NotFoundException(`Bus Schedule with ${busScheduleId} not found`);
    }

    const bookingItems = updateBookingModel.bookingItems;
    const requestUpdateSeatsStatus: RequestUpdateSeatStatusDto[] = [];

    if (bookingItems && bookingItems.length > 0) {
      updateBookingModel.bookingItems = await Promise.all(
        bookingItems.map(async (bookingItem: any) => {
          const seatStatus = bookingItem.seat.status || 'not_picked_up';
          const updateSeatStatus: RequestUpdateSeatStatusDto = {
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
        }),
      );
    }

    await this.busScheduleLayoutService.updateSeatStatusByBusSchedule(
      busScheduleId,
      requestUpdateSeatsStatus,
      tenantId,
    );

    await updateBookingModel.save();

    // Query with populate to return complete data
    const savedBooking = await this.bookingModel
      .findById(updateBookingDto._id)
      .populate('busRoute')
      .populate('busSchedule')
      .populate({ path: 'payments', populate: { path: 'paymentMethod' } })
      .lean()
      .exec();

    const result: any = this.toBookingDto(savedBooking);
    result._oldData = oldData;
    return result;
  }

  async updateStatusById(bookingId: Types.ObjectId, status: string, tenantId: Types.ObjectId): Promise<BookingDto> {
    const updateOperation: any = { $set: { status } };

    // Step 5: When payment is successful (PAID or DEPOSITED), remove expiresAt and update paymentTime
    if (status === BOOKING_STATUS.PAID || status === BOOKING_STATUS.DEPOSITED) {
      updateOperation.$set.paymentTime = new Date();
      updateOperation.$unset = { expiresAt: '' };
    }

    await this.bookingModel.updateOne({ _id: bookingId, tenantId }, updateOperation).exec();

    // Query with populate to return complete data
    const updatedBooking = await this.bookingModel
      .findOne({ _id: bookingId, tenantId })
      .populate('busRoute')
      .populate('busSchedule')
      .populate({ path: 'payments', populate: { path: 'paymentMethod' } })
      .lean()
      .exec();

    return this.toBookingDto(updatedBooking);
  }

  async updateBookingItem(
    busScheduleId: Types.ObjectId,
    updateBookingItemDto: UpdateBookingItemDto,
    tenantId: Types.ObjectId,
  ): Promise<BookingItemDto & { _oldData?: any }> {
    const booking = await this.bookingModel
      .findOne({
        tenantId,
        busScheduleId,
        'bookingItems._id': updateBookingItemDto._id,
      })
      .exec();

    if (!booking) {
      throw new NotFoundException(
        `Booking with busScheduleId "${busScheduleId}" and booking item with ID "${updateBookingItemDto._id}" not found.`,
      );
    }

    const bookingItemIndex = booking.bookingItems.findIndex(
      (item) => item._id.toString() === updateBookingItemDto._id?.toString(),
    );

    if (bookingItemIndex === -1) {
      throw new NotFoundException(`Booking Item with ID "${updateBookingItemDto._id}" not found in booking.`);
    }

    // Store old data before update
    const oldData = booking.bookingItems[bookingItemIndex];

    booking.bookingItems[bookingItemIndex] = Object.assign(
      booking.bookingItems[bookingItemIndex],
      updateBookingItemDto,
    );

    await booking.save();

    const updateSeatStatus: RequestUpdateSeatStatusDto = {
      _id: booking.bookingItems[bookingItemIndex].seat._id,
      bookingId: updateBookingItemDto._id,
      status: updateBookingItemDto.seat.status,
    };

    await this.busScheduleLayoutService.updateSeatStatusByBusSchedule(busScheduleId, [updateSeatStatus], tenantId);

    // Query with populate to get updated booking item with complete data
    const updatedBooking = await this.bookingModel
      .findOne({
        tenantId,
        busScheduleId,
        'bookingItems._id': updateBookingItemDto._id,
      })
      .populate('busRoute')
      .populate('busSchedule')
      .populate({ path: 'payments', populate: { path: 'paymentMethod' } })
      .lean()
      .exec();

    const updatedBookingItem = updatedBooking?.bookingItems.find(
      (item: any) => item._id.toString() === updateBookingItemDto._id?.toString(),
    );

    const result: any = plainToInstance(BookingItemDto, updatedBookingItem);
    result._oldData = oldData;
    return result;
  }

  async updateBookingItemBoarding(
    busScheduleId: Types.ObjectId,
    bookingItemIds: Types.ObjectId[],
    status: string,
    tenantId: Types.ObjectId,
  ): Promise<(BookingItemDto & { _oldData?: any })[]> {
    if (!bookingItemIds || bookingItemIds.length === 0) {
      throw new NotFoundException('No booking items provided to update.');
    }

    const bookingItemIdStrings = bookingItemIds.map((id) => id.toString());

    // Find all bookings that contain any of the booking items (they may be in different bookings)
    const bookings = await this.bookingModel
      .find({
        tenantId,
        busScheduleId,
        'bookingItems._id': { $in: bookingItemIds },
      })
      .exec();

    if (!bookings || bookings.length === 0) {
      throw new NotFoundException(`Bookings with busScheduleId "${busScheduleId}" and booking items not found.`);
    }

    // Store old data and update items
    const oldDataMap = new Map();
    const updateSeatStatusList: RequestUpdateSeatStatusDto[] = [];

    for (const booking of bookings) {
      for (let i = 0; i < booking.bookingItems.length; i++) {
        const bookingItem = booking.bookingItems[i];
        if (bookingItemIdStrings.includes(bookingItem._id.toString())) {
          // Store old data before update
          oldDataMap.set(bookingItem._id.toString(), bookingItem);

          // Only update seat.status and preserve other seat fields
          booking.bookingItems[i].seat.status = status;

          // Ensure mongoose detects nested change on the specific subdocument
          booking.markModified(`bookingItems.${i}.seat`);

          // Prepare seat status update
          const updateSeatStatus: RequestUpdateSeatStatusDto = {
            _id: booking.bookingItems[i].seat._id,
            bookingId: booking._id as Types.ObjectId,
            status: status,
          };

          updateSeatStatusList.push(updateSeatStatus);
        }
      }

      await booking.save();
    }

    if (updateSeatStatusList.length === 0) {
      throw new NotFoundException(`No matching booking items found to update.`);
    }

    await this.busScheduleLayoutService.updateSeatStatusByBusSchedule(busScheduleId, updateSeatStatusList, tenantId);

    // Query with populate to get updated booking items with complete data
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

    const results: (BookingItemDto & { _oldData?: any })[] = [];

    for (const updatedBooking of updatedBookings) {
      const updatedBookingItems = updatedBooking.bookingItems.filter((item: any) =>
        bookingItemIdStrings.includes(item._id.toString()),
      );

      for (const updatedBookingItem of updatedBookingItems) {
        const result: any = plainToInstance(BookingItemDto, updatedBookingItem);
        result._oldData = oldDataMap.get(updatedBookingItem._id.toString());
        results.push(result);
      }
    }

    return results;
  }

  // -------------------------
  // DELETE
  // -------------------------

  async cancelBookingsByCustomer(
    userId: Types.ObjectId,
    busScheduleId: Types.ObjectId,
    bookingIds: Types.ObjectId[],
    tenantId: Types.ObjectId,
  ): Promise<boolean> {
    const bookings = await Promise.all(
      bookingIds.map((bookingId) => {
        return this.bookingModel.findOneAndUpdate(
          { _id: bookingId, tenantId, busScheduleId, userId },
          { status: BOOKING_STATUS.CANCELLED },
        );
      }),
    );

    if (!bookings || bookings.length === 0) {
      throw new NotFoundException(`No bookings found for the provided IDs.`);
    }

    const seatIds: Types.ObjectId[] = [];

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

  async cancelBookings(
    busScheduleId: Types.ObjectId,
    bookingIds: Types.ObjectId[],
    tenantId: Types.ObjectId,
    updatedBy: Types.ObjectId,
  ): Promise<boolean> {
    const bookings = await Promise.all(
      bookingIds.map((bookingId) => {
        return this.bookingModel.findOneAndUpdate(
          { _id: bookingId, tenantId, busScheduleId },
          { status: BOOKING_STATUS.CANCELLED, updatedBy },
        );
      }),
    );

    if (!bookings || bookings.length === 0) {
      throw new NotFoundException(`No bookings found for the provided IDs.`);
    }

    const seatIds: Types.ObjectId[] = [];

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

  async cancelBookingsByUser(
    userId: Types.ObjectId,
    busScheduleId: Types.ObjectId,
    bookingIds: Types.ObjectId[],
    tenantId: Types.ObjectId,
  ): Promise<boolean> {
    const bookings = await Promise.all(
      bookingIds.map((bookingId) => {
        return this.bookingModel.findOneAndUpdate(
          { _id: bookingId, tenantId, busScheduleId, userId },
          { status: BOOKING_STATUS.CANCELLED },
        );
      }),
    );

    if (!bookings || bookings.length === 0) {
      throw new NotFoundException(`No bookings found for the provided IDs.`);
    }

    const seatIds: Types.ObjectId[] = [];

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

  async deleteOne(id: string): Promise<boolean> {
    const result = await this.bookingModel.findByIdAndDelete(id).lean().exec();
    return result !== null;
  }

  // -------------------------
  // FIND (scoped by tenant)
  // -------------------------

  async findAll(tenantId: Types.ObjectId): Promise<BookingDto[]> {
    const bookings = await this.bookingModel
      .find({ tenantId })
      .populate('busRoute')
      .populate('busSchedule')
      .populate({ path: 'payments', populate: { path: 'paymentMethod' } })
      .lean()
      .exec();
    return bookings.map((b) => this.toBookingDto(b));
  }

  async findAllByBookingGroupNumber(bookingGroupNumber: string, tenantId: Types.ObjectId): Promise<BookingDto[]> {
    const bookings = await this.bookingModel
      .find({ bookingGroupNumber, tenantId })
      .populate('busRoute')
      .populate('busSchedule')
      .populate({ path: 'payments', populate: { path: 'paymentMethod' } })
      .lean()
      .exec();
    return bookings.map((b) => this.toBookingDto(b));
  }

  async findByIds(bookingIds: Types.ObjectId[], tenantId: Types.ObjectId): Promise<BookingDto[] | null> {
    const bookingModels = await this.bookingModel
      .find({ tenantId, _id: { $in: bookingIds } })
      .populate('busRoute')
      .populate('busSchedule')
      .populate({ path: 'payments', populate: { path: 'paymentMethod' } })
      .lean()
      .exec();

    if (!bookingModels || bookingModels.length === 0) return null;

    return bookingModels.map((b) => this.toBookingDto(b));
  }

  async findOneByBookingNumber(bookingNumber: string, tenantId: Types.ObjectId): Promise<BookingDto> {
    const bookings = await this.bookingModel
      .findOne({ bookingNumber, tenantId })
      .populate('busRoute')
      .populate('busSchedule')
      .populate({ path: 'payments', populate: { path: 'paymentMethod' } })
      .lean()
      .exec();
    return this.toBookingDto(bookings);
  }

  async findOneBookingsByBookingItemId(bookingItemId: Types.ObjectId, tenantId: Types.ObjectId): Promise<BookingDto> {
    // Populate busSchedule and nested bus document
    const bookingDoc: any = await this.bookingModel
      .findOne({ tenantId, bookingItems: { $elemMatch: { _id: bookingItemId } } })
      .populate({
        path: 'busSchedule',
        model: BusScheduleDocument.name,
        match: { tenantId },
      })
      .lean()
      .exec();

    const bookingDto = this.toBookingDto(bookingDoc);

    if (bookingDto?.busSchedule) {
      const schedule: any = bookingDto.busSchedule;
      bookingDto.busSchedule.remainSeat = await this.busScheduleLayoutService.getRemainSeats(schedule._id, tenantId);

      const enrichSchedules = await this.busScheduleService.enrichSchedules([schedule], tenantId);
      bookingDto.busSchedule = enrichSchedules[0];

      // Clean up if busId is empty/null in the populated busSchedule
      if (!bookingDto.busSchedule.busId) {
        bookingDto.busSchedule.bus = undefined;
      }
    }

    return bookingDto;
  }

  async findAllByScheduleId(
    busScheduleId: Types.ObjectId,
    tenantId: Types.ObjectId,
    filters?: BookingSortFilter[],
  ): Promise<BookingDto[]> {
    const match: any = { busScheduleId, tenantId };
    const ands: any[] = [];

    if (filters && Array.isArray(filters)) {
      for (const { key, value } of filters) {
        // Sử dụng hàm helper để xử lý filter
        ands.push(processFilterValue(key, value));
      }
    }

    if (ands.length) match.$and = ands;

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

  async findAllByUser(userId: Types.ObjectId, tenantId: Types.ObjectId): Promise<BookingDto[]> {
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

  async findIncommingBookingByUser(userId: Types.ObjectId, tenantId: Types.ObjectId): Promise<BookingDto[]> {
    const now = new Date();
    const bookingModels = await this.bookingModel
      .find({
        userId,
        tenantId,
        status: { $in: [BOOKING_STATUS.RESERVED, BOOKING_STATUS.PAID, BOOKING_STATUS.DEPOSITED] },
        startDate: { $gte: now },
      })
      .populate('busRoute')
      .populate('busSchedule')
      .populate({ path: 'payments', populate: { path: 'paymentMethod' } })
      .lean()
      .exec();
    return bookingModels.map((b) => this.toBookingDto(b)) || [];
  }

  async findOneByIdAndUser(
    userId: Types.ObjectId,
    bookingId: Types.ObjectId,
    tenantId: Types.ObjectId,
  ): Promise<BookingDto | null> {
    const bookingModel = await this.bookingModel
      .findOne({ userId, _id: bookingId, tenantId })
      .populate('busRoute')
      .populate('busSchedule')
      .populate({ path: 'payments', populate: { path: 'paymentMethod' } })
      .lean()
      .exec();
    const booking = this.toBookingDto(bookingModel);
    if (!booking) return null;
    return booking;
  }

  async findOneByIdsAndUser(
    userId: Types.ObjectId,
    bookingIds: Types.ObjectId[],
    tenantId: Types.ObjectId,
  ): Promise<BookingDto[] | null> {
    const bookingModels = await this.bookingModel
      .find({ userId, tenantId, _id: { $in: bookingIds } })
      .populate('busRoute')
      .populate('busSchedule')
      .populate({ path: 'payments', populate: { path: 'paymentMethod' } })
      .lean()
      .exec();

    if (!bookingModels || bookingModels.length === 0) return null;

    return bookingModels.map((b) => this.toBookingDto(b));
  }

  async findBookings2Payment(
    userId: Types.ObjectId,
    bookingIds: Types.ObjectId[],
    tenantId: Types.ObjectId,
  ): Promise<BookingDto[] | null> {
    const bookingDocs = await this.bookingModel
      .find({ userId, tenantId, _id: { $in: bookingIds } })
      .lean()
      .exec();

    if (!bookingDocs.length) return null;

    const bookings: BookingDto[] = [];

    for (const bookingDoc of bookingDocs) {
      const booking = this.toBookingDto(bookingDoc);

      booking.discountTotalAmount = 0;
      booking.afterDiscountTotalPrice = booking.totalPrice;

      for (const item of booking.bookingItems) {
        item.discountAmount = 0;
        item.afterDiscountPrice = item.price;
      }

      await this.bookingModel.updateOne(
        { _id: booking._id, tenantId },
        {
          $set: {
            bookingItems: booking.bookingItems,
            discountTotalAmount: booking.discountTotalAmount,
            afterDiscountTotalPrice: booking.afterDiscountTotalPrice,
          },
        },
      );

      booking.busSchedule = await this.busScheduleService.findOne(new Types.ObjectId(booking.busScheduleId), tenantId);
      bookings.push(booking);
    }

    return bookings;
  }

  async findBookingSeats(seatIds: Types.ObjectId[], tenantId: Types.ObjectId): Promise<Types.ObjectId[] | null> {
    const bookingModels = await this.bookingModel
      .find({
        tenantId,
        bookingItems: {
          $elemMatch: { seat: { _id: { $in: seatIds } } },
        },
        $or: [{ status: BOOKING_STATUS.PAID }, { status: BOOKING_STATUS.RESERVED }],
      })
      .exec();

    if (!bookingModels || bookingModels.length === 0) return null;

    const seatIdsFiltered = bookingModels.flatMap((bookingModel: any) =>
      bookingModel.bookingItems.flatMap(
        (item: any) =>
          item.seats?.filter((seat: any) => seatIds.some((id) => id.equals(seat._id))).map((seat: any) => seat._id) ||
          [],
      ),
    );

    return seatIdsFiltered;
  }

  async findBookingBySchedule(busScheduleId: Types.ObjectId, tenantId: Types.ObjectId): Promise<BookingDto[] | null> {
    const bookingModels = await this.bookingModel
      .find({
        tenantId,
        busScheduleId,
        $or: [
          { status: BOOKING_STATUS.RESERVED },
          { status: BOOKING_STATUS.PAID },
          { status: BOOKING_STATUS.DEPOSITED },
        ],
      })
      .populate('busRoute')
      .populate('busSchedule')
      .populate({ path: 'payments', populate: { path: 'paymentMethod' } })
      .lean()
      .exec();

    if (!bookingModels || bookingModels.length === 0) return null;

    return bookingModels.map((m) => this.toBookingDto(m));
  }

  // -------------------------
  // SEARCH PAGING (scoped)
  // -------------------------

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: BookingSortFilter,
    filters: BookingSortFilter[],
    tenantId: Types.ObjectId,
  ): Promise<SearchBookingPagingRes> {
    const pipeline = await this.buildQuerySearchBookingPaging(
      pageIdx,
      pageSize,
      keyword,
      sortBy,
      filters,
      tenantId,
    );

    // Use aggregate for paging and sorting
    const items = await this.bookingModel.aggregate(pipeline).exec();

    // Populate manually after aggregate (if needed)
    // You may need to refactor this for full populate support

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

  async buildQuerySearchBookingPaging(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: BookingSortFilter,
    filters: BookingSortFilter[],
    tenantId: Types.ObjectId,
  ) {
    // pageIdx: 1-based index
    let skip = 0;
    if (pageIdx && pageSize) {
      skip = Math.max((pageIdx - 1) * pageSize, 0);
    }

    const pipeline: any = [];
    const matchConditions: any[] = [{ tenantId }];

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

    let startDateValue: Date | null = null;
    let endDateValue: Date | null = null;

    if (Array.isArray(filters)) {
      for (const { key, value } of filters) {
        if (!key || value == null || (Array.isArray(value) && value.length === 0)) continue;

        if (key === 'startDate') {
          const dateValue = getFirstValue(value);
          startDateValue = new Date(dateValue);
        } else if (key === 'endDate') {
          const dateValue = getFirstValue(value);
          endDateValue = new Date(dateValue);
        } else if (key === 'phoneNumber') {
          const phoneValue = getFirstValue(value);
          matchConditions.push({ 'userInfo.phoneNumber': { $regex: phoneValue, $options: 'i' } });
        } else {
          matchConditions.push(processFilterValue(key, value));
        }
      }
    }

    if (startDateValue || endDateValue) {
      const range: any = {};
      if (startDateValue) range.$gte = startDateValue;
      if (endDateValue) range.$lte = endDateValue;
      matchConditions.push({ createdAt: range });
    }

    // 4. Đẩy $match với điều kiện tenantId và các điều kiện khác
    pipeline.push({
      $match: { $and: matchConditions },
    });

    // $lookup for busSchedule
    pipeline.push({
      $lookup: {
        from: 'bus_schedules',
        localField: 'busScheduleId',
        foreignField: '_id',
        as: 'busSchedule',
      },
    });
    pipeline.push({
      $unwind: { path: '$busSchedule', preserveNullAndEmptyArrays: true }
    });

    // 4. $sort
    if (sortBy?.key) {
      let sortDirection = sortBy.value === 'ascend' ? 1 : -1;
      let sortField = sortBy.key;
      pipeline.push({
        $sort: { [sortField]: sortDirection },
      });
    }
    // Pagination
    if (pageSize > 0) {
      pipeline.push({ $skip: skip });
      pipeline.push({ $limit: pageSize });
    }
    return pipeline;
  }

  // -------------------------
  // MISC
  // -------------------------

  async findOne(id: Types.ObjectId): Promise<BookingDto> {
    const booking = await this.bookingModel
      .findById(id)
      .populate('busRoute')
      .populate('busSchedule')
      .populate({ path: 'payments', populate: { path: 'paymentMethod' } })
      .lean()
      .exec();
    return this.toBookingDto(booking);
  }

  async findOneWithTenant(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<BookingDto> {
    const booking = await this.bookingModel
      .findOne({ _id: id, tenantId })
      .populate('busRoute')
      .populate('busSchedule')
      .populate({ path: 'payments', populate: { path: 'paymentMethod' } })
      .lean()
      .exec();
    return this.toBookingDto(booking);
  }

  generateNumberAlphabet(): string {
    return this.nanoid();
  }
}
