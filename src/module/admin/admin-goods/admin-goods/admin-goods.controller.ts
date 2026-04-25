import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { AdminGoodsService } from './admin-goods-service';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { Types } from 'mongoose';
import { AdminUpdateGoodsDto } from './dto/admin-update-goods.dto';
import { AdminCreateGoodsDto } from './dto/admin-create-goods.dto';
import { AdminSearchGoodsPagingQuery } from './dto/admin-goods.dto';
import { multerConfig } from '@/config/multer.config';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('admin/goods')
export class AdminGoodsController {
  constructor(private readonly adminGoodsService: AdminGoodsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Post()
  @UseInterceptors(FilesInterceptor('images', 10, multerConfig)) // Cho phép upload tối đa 10 ảnh
  create(
    @Body(ParseObjectIdPipe) adminCreateGoodsDto: AdminCreateGoodsDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.adminGoodsService.create(adminCreateGoodsDto, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Put()
  update(
    @Body(ParseObjectIdPipe) adminUpdateGoodsDto: AdminUpdateGoodsDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.adminGoodsService.update(adminUpdateGoodsDto, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Put('updates')
  updates(
    @Body(ParseObjectIdPipe) adminUpdateGoodsDto: AdminUpdateGoodsDto[],
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.adminGoodsService.updates(adminUpdateGoodsDto, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.adminGoodsService.remove(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Get()
  findAll(@CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.adminGoodsService.findAll(tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.adminGoodsService.findOne(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Get('find-all-goods-for-bus-schedule')
  findAllGoodsForBusSchedule(
    @Query('busScheduleId', ParseObjectIdPipe) busScheduleId: Types.ObjectId,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.adminGoodsService.findAllGoodsForBusSchedule(busScheduleId, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Get('find-all-goods-available')
  findAllGoodsAvailable(
    @Query('busRouteId', ParseObjectIdPipe) busRouteId: Types.ObjectId,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.adminGoodsService.findAllGoodsAvailable(busRouteId, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Post('search')
  async searchGoodsPaging(
    @Body(ParseObjectIdPipe) query: AdminSearchGoodsPagingQuery,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
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
    const { tenantId } = user;
    return this.adminGoodsService.searchGoodsPaging(+pageIdx, +pageSize, keyword, sortBy, filters, tenantId);
  }
}
