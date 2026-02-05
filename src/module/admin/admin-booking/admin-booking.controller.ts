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
import { AdminBookingService } from './admin-booking-service';
import { Roles } from '@/decorators/roles.decorator';
import { Types } from 'mongoose';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { AdminCreateBookingDto } from './dto/admin-create-booking.dto';
import { AdminUpdateBookingDto } from './dto/admin-update-booking.dto';
import { AdminSearchBookingPagingQuery } from './dto/admin-booking.dto';
import { UpdateAuditFields } from '@/decorators/update-audit-fields.decorator';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('admin/booking')
export class AdminBookingController {
  constructor(private readonly adminBookingService: AdminBookingService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @UpdateAuditFields({ updateCreatedBy: true, updateUpdatedBy: true })
  @Post()
  create(
    @Headers('idempotency-key') idempotencyKey: string,
    @Body(ParseObjectIdPipe) AdminCreateBookingDto: AdminCreateBookingDto[],
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    if (!idempotencyKey) {
      throw new BadRequestException('Idempotency-Key is required');
    }
    const { tenantId, _id: userId } = user;
    // Set source for all bookings
    const bookingsWithSource = AdminCreateBookingDto.map((booking) => ({
      ...booking,
      source: ROLE_CONSTANTS.ADMIN,
    }));
    return this.adminBookingService.create(bookingsWithSource, tenantId, userId, idempotencyKey);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @UpdateAuditFields({ updateCreatedBy: false, updateUpdatedBy: true })
  @Put()
  update(
    @Body(ParseObjectIdPipe) AdminUpdateBusScheduleDto: AdminUpdateBookingDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const tenantId = user.tenantId;
    return this.adminBookingService.update(AdminUpdateBusScheduleDto, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const tenantId = user.tenantId;
    return this.adminBookingService.findOne(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Get('find-all-by-schedule-id/:busScheduleId')
  findAllByScheduleId(
    @Param('busScheduleId', ParseObjectIdPipe) busScheduleId: Types.ObjectId,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const tenantId = user.tenantId;
    return this.adminBookingService.findAllByScheduleId(busScheduleId, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Post('search')
  async search(
    @Body(ParseObjectIdPipe) query: AdminSearchBookingPagingQuery,
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

    return this.adminBookingService.search(+pageIdx, +pageSize, keyword, sortBy, filters, tenantId);
  }
}
