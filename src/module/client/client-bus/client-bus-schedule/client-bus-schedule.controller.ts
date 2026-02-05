// src/bus-schedule/bus-schedule.controller.ts
import { Controller, Post, Body, UseGuards, UseInterceptors } from '@nestjs/common';
import { ClientBusScheduleService } from './client-bus-schedule.service';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { ClientSearchBusSchedulePagingQuery } from './dto/client-bus-schedule.dto';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';
import { TenantIdByCode } from '@/decorators/tenant-by-code.decorator';
import { Types } from 'mongoose';
import { TenantByCodeInterceptor } from '@/interceptors/tenant-by-code.interceptor';

@Controller('client/bus-schedules')
@UseInterceptors(TenantByCodeInterceptor)
export class ClientBusScheduleController {
  constructor(private readonly clientBusScheduleService: ClientBusScheduleService) {}

  @Post('search')
  async searchBusSchedulePaging(
    @Body(ParseObjectIdPipe) query: ClientSearchBusSchedulePagingQuery,
    @TenantIdByCode() tenantId: Types.ObjectId,
  ) {
    const {
      pageIdx = 0,
      pageSize = 0,
      keyword = '',
      sortBy = {
        key: 'createdAt',
        value: 'desc',
      },
      filters = [],
    } = query;
    return this.clientBusScheduleService.searchBusSchedulePaging(
      +pageIdx,
      +pageSize,
      keyword,
      sortBy,
      filters,
      tenantId,
    );
  }
}
