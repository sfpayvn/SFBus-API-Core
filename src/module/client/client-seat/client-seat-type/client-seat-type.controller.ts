import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
  ValidationPipe,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { ClientSeatTypeService } from './client-seat-type.service';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { Types } from 'mongoose';
import { ClientSearchSeatTypesQuery } from './dto/client-seat-type.dto';
import { TenantScope, TenantScopeResult } from '@/common/tenant/tenant-scope';
import { MarkDefaultTenant } from '@/interceptors/mark-default-tenant';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';
import { TenantByCodeInterceptor } from '@/interceptors/tenant-by-code.interceptor';
import { TenantIdsByCode } from '@/decorators/tenant-by-code.decorator';

@Controller('client/seat-types')
@UseInterceptors(TenantByCodeInterceptor)
export class ClientSeatTypeController {
  constructor(private readonly ClientSeatTypeService: ClientSeatTypeService) {}

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @TenantIdsByCode() tenantIds: Types.ObjectId[]) {
    return this.ClientSeatTypeService.findOne(id, tenantIds);
  }

  @Get('find-all')
  findAll(@TenantIdsByCode() tenantIds: Types.ObjectId[]) {
    return this.ClientSeatTypeService.findAll(tenantIds);
  }

  @Post('search')
  search(@Body(ParseObjectIdPipe) query: ClientSearchSeatTypesQuery, @TenantIdsByCode() tenantIds: Types.ObjectId[]) {
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
    return this.ClientSeatTypeService.search(+pageIdx, +pageSize, keyword, sortBy, filters, tenantIds);
  }
}
