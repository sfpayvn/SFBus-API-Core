import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { Roles } from '@/decorators/roles.decorator';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { ClientTrackingService } from './client-tracking.service';
import { CreateTrackingDto } from '@/module/core/tracking/dto/create-tracking.dto';
import { SearchTrackingQuerySortFilter } from '@/module/core/tracking/dto/tracking.dto';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('client/tracking')
export class ClientTrackingController {
  constructor(private readonly trackingService: ClientTrackingService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    ROLE_CONSTANTS.CLIENT,
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.DRIVER,
    ROLE_CONSTANTS.POS,
    ROLE_CONSTANTS.TENANT,
  )
  @Post()
  create(
    @Body(ParseObjectIdPipe) createTrackingDto: CreateTrackingDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.trackingService.create(createTrackingDto, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    ROLE_CONSTANTS.CLIENT,
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.DRIVER,
    ROLE_CONSTANTS.POS,
    ROLE_CONSTANTS.TENANT,
  )
  @Get()
  findAll(@CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.trackingService.findAll(tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    ROLE_CONSTANTS.CLIENT,
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.DRIVER,
    ROLE_CONSTANTS.POS,
    ROLE_CONSTANTS.TENANT,
  )
  @Get('type/:type')
  findByType(@Param('type') type: string, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.trackingService.findByType(type, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    ROLE_CONSTANTS.CLIENT,
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.DRIVER,
    ROLE_CONSTANTS.POS,
    ROLE_CONSTANTS.TENANT,
  )
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.trackingService.findOne(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    ROLE_CONSTANTS.CLIENT,
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.DRIVER,
    ROLE_CONSTANTS.POS,
    ROLE_CONSTANTS.TENANT,
  )
  @Post('search')
  search(
    @Body()
    body: {
      pageIdx: number;
      pageSize: number;
      keyword: string;
      sortBy: SearchTrackingQuerySortFilter;
      filters: SearchTrackingQuerySortFilter[];
    },
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    const { pageIdx, pageSize, keyword, sortBy, filters } = body;
    return this.trackingService.searchTracking(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
  }
}
