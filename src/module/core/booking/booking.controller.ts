import { Controller, Get, Post, Body, Param, Delete, UseGuards, Headers, Query, Put } from '@nestjs/common';
import { Types } from 'mongoose';

import { BookingService } from './booking-service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto, UpdateBookingItemDto } from './dto/update-booking.dto';
import { RequestUpdatePaymentMethodByIdsDto, SearchBookingPagingQuery } from './dto/booking.dto';

import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';

import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { Feature } from '@/decorators/feature.decorator';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('core/booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Feature('booking', 'create')
  @Post()
  create(
    @Headers('idempotency-key') idempotencyKey: string,
    @Body(ParseObjectIdPipe) createBookings: CreateBookingDto[],
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId, _id: userId } = user;
    return this.bookingService.create(createBookings, tenantId, userId, idempotencyKey);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Post('cancel')
  cancelBookings(@Query('bookingIds') bookingIdsString: string, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId, _id: userId } = user;
    const bookingIds = bookingIdsString.split(',').map((id) => new Types.ObjectId(id));
    return this.bookingService.cancelBookings(userId, bookingIds, tenantId, userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Get('find-one-by-booking-item-id/:bookingItemId')
  findOneBookingsByBookingItemId(
    @Param('bookingItemId', ParseObjectIdPipe) bookingItemId: Types.ObjectId,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.bookingService.findOneBookingsByBookingItemId(bookingItemId, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Get('find-one-by-booking-number/:bookingNumber')
  findOneByBookingNumber(
    @Param('bookingNumber') bookingNumber: string,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.bookingService.findOneByBookingNumber(bookingNumber, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Get('find-all')
  findAll(@CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.bookingService.findAll(tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Get('find-all-by-booking-group-number/:bookingGroupNumber')
  findAllByPaymentNumber(
    @Param('bookingGroupNumber') bookingGroupNumber: string,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.bookingService.findAllByBookingGroupNumber(bookingGroupNumber, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Get('find-by-Ids')
  async findByIds(@Query('bookingIds') bookingIdsString: string, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    const bookingIds = bookingIdsString.split(',').map((id) => new Types.ObjectId(id));
    return this.bookingService.findByIds(bookingIds, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Get('find-all-by-schedule-id/:busScheduleId')
  findAllByScheduleId(
    @Param('busScheduleId', ParseObjectIdPipe) busScheduleId: Types.ObjectId,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.bookingService.findAllByScheduleId(busScheduleId, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Get('find-all-by-user')
  findAllByUser(@CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId, _id: userId } = user;
    return this.bookingService.findAllByUser(userId, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Get('find-one-by-id-and-user/:bookingId')
  findOneByIdAndUser(
    @Param('bookingId', ParseObjectIdPipe) bookingId: Types.ObjectId,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId, _id: userId } = user;
    return this.bookingService.findOneByIdAndUser(userId, bookingId, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Get('find-one-by-ids-and-user')
  async findOneByIdsAndUser(
    @Query('bookingIds') bookingIdsString: string,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId, _id: userId } = user;
    const bookingIds = bookingIdsString.split(',').map((id) => new Types.ObjectId(id));
    return this.bookingService.findOneByIdsAndUser(userId, bookingIds, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Get('find-bookings-2-payment')
  async findBookings2Payment(
    @Query('bookingIds') bookingIdsString: string,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId, _id: userId } = user;
    const bookingIds = bookingIdsString.split(',').map((id) => new Types.ObjectId(id));
    return this.bookingService.findBookings2Payment(userId, bookingIds, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Get('find-booking-seats')
  findBookingSeats(
    @Body(ParseObjectIdPipe) seatIds: Types.ObjectId[],
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.bookingService.findBookingSeats(seatIds, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Put('update-booking-item')
  updateBookingItem(
    @Body(ParseObjectIdPipe) updateBookingItemDto: UpdateBookingItemDto,
    @Param('busScheduleId', ParseObjectIdPipe) busScheduleId: Types.ObjectId,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.bookingService.updateBookingItem(busScheduleId, updateBookingItemDto, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Put()
  update(
    @Body(ParseObjectIdPipe) updateBusScheduleDto: UpdateBookingDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.bookingService.update(updateBusScheduleDto, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Post('search')
  async search(
    @Body(ParseObjectIdPipe) query: SearchBookingPagingQuery,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    const {
      pageIdx = 0,
      pageSize = 0,
      keyword = '',
      sortBy = { key: 'createdAt', value: 'desc' as const },
      filters = [],
    } = query;

    return this.bookingService.search(+pageIdx, +pageSize, keyword, sortBy, filters, tenantId);
  }
}
