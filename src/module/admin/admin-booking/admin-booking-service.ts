import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { customAlphabet } from 'nanoid';
import { AdminBookingGateway } from './admin-booking.gateway';
import { BookingDocument } from '@/module/core/booking/schema/booking.schema';
import { BookingService } from '@/module/core/booking/booking-service';
import { AdminBookingDto, AdminBookingSortFilter, AdminSearchBookingPagingRes } from './dto/admin-booking.dto';
import { plainToInstance } from 'class-transformer';
import { AdminPaymentService } from '../admin-payment/admin-payment-service';
import { BookingDto } from '@/module/core/booking/dto/booking.dto';
import { AdminCreateBookingDto } from './dto/admin-create-booking.dto';
import { AdminUpdateBookingDto } from './dto/admin-update-booking.dto';
import { UpdateBookingDto } from '@/module/core/booking/dto/update-booking.dto';

@Injectable()
export class AdminBookingService {
  private alphabet = process.env.ALPHABET || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  private nanoid = customAlphabet(this.alphabet, 6);

  constructor(
    @InjectModel(BookingDocument.name) private readonly bookingModel: Model<BookingDocument>,
    @Inject(forwardRef(() => BookingService)) private readonly bookingService: BookingService,
    @Inject(forwardRef(() => AdminPaymentService)) private readonly AdminPaymentService: AdminPaymentService,

    private AdminBookingGateway: AdminBookingGateway,
  ) {}

  async findAllByScheduleId(busScheduleId: Types.ObjectId, tenantId: Types.ObjectId): Promise<AdminBookingDto[]> {
    return this.bookingService.findAllByScheduleId(busScheduleId, tenantId);
  }

  async create(
    adminCreateBookingDto: AdminCreateBookingDto[],
    tenantId: Types.ObjectId,
    userId: Types.ObjectId,
    idempotencyKey: string,
  ): Promise<AdminBookingDto[]> {
    const bookingDtos = await this.bookingService.create(adminCreateBookingDto, tenantId, userId, idempotencyKey);
    return plainToInstance(AdminBookingDto, bookingDtos);
  }

  async update(adminUpdateBookingDto: AdminUpdateBookingDto, tenantId: Types.ObjectId): Promise<AdminBookingDto> {
    const bookingDto = await this.bookingService.update(adminUpdateBookingDto as UpdateBookingDto, tenantId);
    return plainToInstance(AdminBookingDto, bookingDto);
  }

  async findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<BookingDto> {
    const bookingModel = await this.bookingModel.findOne({ _id: id, tenantId }).lean().exec();
    return plainToInstance(BookingDto, bookingModel);
  }

  async findAllByPaymentNumber(paymentNumber: string, tenantId: Types.ObjectId): Promise<AdminBookingDto[]> {
    const bookings = await this.bookingModel.find({ paymentNumber, tenantId }).lean().exec();
    return plainToInstance(AdminBookingDto, bookings);
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: AdminBookingSortFilter,
    filters: AdminBookingSortFilter[],
    tenantId: Types.ObjectId,
  ): Promise<AdminSearchBookingPagingRes> {
    return this.bookingService.search(
      pageIdx,
      pageSize,
      keyword,
      sortBy,
      filters,
      tenantId,
    ) as Promise<AdminSearchBookingPagingRes>;
  }
}
