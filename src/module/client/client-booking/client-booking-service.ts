import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { customAlphabet } from 'nanoid';
import { ClientBookingGateway } from './client-booking.gateway';
import { BookingDocument } from '@/module/core/booking/schema/booking.schema';
import { BookingService } from '@/module/core/booking/booking-service';
import {
  ClientBookingDto,
  ClientSearchBookingPagingQuery,
  ClientSearchBookingPagingRes,
} from './dto/client-booking.dto';
import { plainToInstance } from 'class-transformer';
import { ClientPaymentService } from '../client-payment/client-payment-service';
import { BookingDto } from '@/module/core/booking/dto/booking.dto';
import { ClientCreateBookingDto } from './dto/client-create-booking.dto';
import { ClientTrackingService } from '../client-tracking/client-tracking.service';
import { TRACKING_TYPES } from '@/module/core/tracking/constants/tracking-types';
import { BOOKING_STATUS } from '@/common/constants/status.constants';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Injectable()
export class ClientBookingService {
  private alphabet = process.env.ALPHABET || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  constructor(
    @Inject(forwardRef(() => BookingService)) private readonly bookingService: BookingService,
    @Inject(forwardRef(() => ClientPaymentService)) private readonly clientPaymentService: ClientPaymentService,
    private readonly clientTrackingService: ClientTrackingService,
  ) {}
  async create(
    clientCreateBookingDto: ClientCreateBookingDto[],
    tenantId: Types.ObjectId,
    createdBy: Types.ObjectId,
    idempotencyKey: string,
  ): Promise<ClientBookingDto[]> {
    const bookingDtos = await this.bookingService.create(clientCreateBookingDto, tenantId, createdBy, idempotencyKey);
    // Log tracking for booking creation
    for (const bookingDto of bookingDtos) {
      await this.clientTrackingService.create(
        {
          type: TRACKING_TYPES.BOOKING_CREATED,
          platform: ROLE_CONSTANTS.CLIENT,
          metadata: {
            bookingId: bookingDto._id,
            bookingNumber: bookingDto.bookingNumber,
            busScheduleId: bookingDto.busScheduleId,
            busRouteId: bookingDto.busRouteId,
            totalTickets: bookingDto.bookingItems.length,
          },
          createdBy: createdBy,
        },
        tenantId,
      );
    }
    return bookingDtos as unknown as ClientBookingDto[];
  }

  async cancelBookingsByUser(
    userId: Types.ObjectId,
    busScheduleId: Types.ObjectId,
    bookingIds: Types.ObjectId[],
    tenantId: Types.ObjectId,
  ): Promise<boolean> {
    return this.bookingService.cancelBookingsByUser(userId, busScheduleId, bookingIds, tenantId);
  }

  async findAllByScheduleId(busScheduleId: Types.ObjectId, tenantId: Types.ObjectId): Promise<ClientBookingDto[]> {
    return this.bookingService.findAllByScheduleId(busScheduleId, tenantId) as unknown as Promise<ClientBookingDto[]>;
  }

  async findIncommingBookingByUser(userId: Types.ObjectId, tenantId: Types.ObjectId): Promise<ClientBookingDto[]> {
    return this.bookingService.findIncommingBookingByUser(userId, tenantId) as unknown as Promise<ClientBookingDto[]>;
  }

  async findHistoryByUser(
    query: ClientSearchBookingPagingQuery,
    userId: Types.ObjectId,
    tenantId: Types.ObjectId,
  ): Promise<ClientSearchBookingPagingRes> {
    const {
      pageIdx = 0,
      pageSize = 0,
      keyword = '',
      sortBy = { key: 'createdAt', value: 'desc' as const },
      filters = [],
    } = query;

    filters.push({
      key: 'status',
      value: [BOOKING_STATUS.COMPLETED, BOOKING_STATUS.CANCELLED],
    });

    filters.push({
      key: 'userId',
      value: userId,
    });

    return this.bookingService.search(
      +pageIdx,
      +pageSize,
      keyword,
      sortBy,
      filters,
      tenantId,
    ) as unknown as Promise<ClientSearchBookingPagingRes>;
  }

  async findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<BookingDto> {
    return this.bookingService.findOneWithTenant(id, tenantId);
  }

  async findAllByBookingGroupNumber(bookingGroupNumber: string, tenantId: Types.ObjectId): Promise<ClientBookingDto[]> {
    return (await this.bookingService.findAllByBookingGroupNumber(
      bookingGroupNumber,
      tenantId,
    )) as unknown as ClientBookingDto[];
  }

  async findBookings2Payment(
    userId: Types.ObjectId,
    bookingIds: Types.ObjectId[],
    tenantId: Types.ObjectId,
  ): Promise<BookingDto[] | null> {
    return this.bookingService.findBookings2Payment(userId, bookingIds, tenantId);
  }
}
