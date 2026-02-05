import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
  Put,
  Headers,
  BadRequestException,
} from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { ClientBookingService } from './client-booking-service';
import { Roles } from '@/decorators/roles.decorator';
import { Types } from 'mongoose';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { ClientCreateBookingDto } from './dto/client-create-booking.dto';
import { ClientSearchBookingPagingQuery } from './dto/client-booking.dto';
import { PosCancelBookingDto } from '@/module/pos/pos-booking/dto/pos-booking.dto';
import { UpdateAuditFields } from '@/decorators/update-audit-fields.decorator';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('client/booking')
export class ClientBookingController {
  constructor(private readonly clientBookingService: ClientBookingService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @UpdateAuditFields({ updateCreatedBy: true, updateUpdatedBy: false })
  @Roles(
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.CLIENT,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.POS,
    ROLE_CONSTANTS.DRIVER,
  )
  @Post()
  create(
    @Headers('idempotency-key') idempotencyKey: string,
    @Body(ParseObjectIdPipe) ClientCreateBookingDto: ClientCreateBookingDto[],
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    if (!idempotencyKey) {
      throw new BadRequestException('Idempotency-Key is required');
    }
    const { tenantId, _id } = user;
    // Set source for all bookings
    const bookingsWithSource = ClientCreateBookingDto.map((booking) => ({
      ...booking,
      source: ROLE_CONSTANTS.CLIENT,
    }));
    return this.clientBookingService.create(bookingsWithSource, tenantId, _id, idempotencyKey);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @UpdateAuditFields({ updateCreatedBy: true, updateUpdatedBy: true })
  @Roles(
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.CLIENT,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.POS,
    ROLE_CONSTANTS.DRIVER,
  )
  @Post('cancel-by-user')
  cancelBookingsByUser(
    @Body(ParseObjectIdPipe) body: PosCancelBookingDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId, _id: userId } = user;
    const { busScheduleId, bookingIds } = body;
    return this.clientBookingService.cancelBookingsByUser(userId, busScheduleId, bookingIds, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.CLIENT,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.POS,
    ROLE_CONSTANTS.DRIVER,
  )
  @Get('find-incomming-by-user')
  findIncommingBookingByUser(@CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId, _id: userId } = user;
    return this.clientBookingService.findIncommingBookingByUser(userId, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.CLIENT,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.POS,
    ROLE_CONSTANTS.DRIVER,
  )
  @Post('find-history-by-user')
  async findHistoryByUser(
    @Body(ParseObjectIdPipe) query: ClientSearchBookingPagingQuery,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId, _id: userId } = user;
    return this.clientBookingService.findHistoryByUser(query, userId, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.CLIENT,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.POS,
    ROLE_CONSTANTS.DRIVER,
  )
  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const tenantId = user.tenantId;
    return this.clientBookingService.findOne(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.CLIENT,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.POS,
    ROLE_CONSTANTS.DRIVER,
  )
  @Get('find-bookings-2-payment')
  async findBookings2Payment(
    @Query('bookingIds') bookingIdsString: string,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId, _id: userId } = user;
    const bookingIds = bookingIdsString.split(',').map((id) => new Types.ObjectId(id));
    return this.clientBookingService.findBookings2Payment(userId, bookingIds, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.CLIENT,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.POS,
    ROLE_CONSTANTS.DRIVER,
  )
  @Get('find-all-by-schedule-id/:busScheduleId')
  findAllByScheduleId(
    @Param('busScheduleId', ParseObjectIdPipe) busScheduleId: Types.ObjectId,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const tenantId = user.tenantId;
    return this.clientBookingService.findAllByScheduleId(busScheduleId, tenantId);
  }
}
