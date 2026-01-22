import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { PromotionService } from './promotion-service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { RolesGuard } from '@/guards/roles.guard';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { Roles } from '@/decorators/roles.decorator';
import {
  RedeemPromotionDto,
  RequestPromotionByRule,
  RequestPromotionMass,
  SearchPromotionPagingQuery,
} from './dto/promotion.dto';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { Feature } from '@/decorators/feature.decorator';
import { QuotaGuard } from '@/guards/quota.guard';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('promotion')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @UseGuards(JwtAuthGuard, RolesGuard, QuotaGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Feature('promotion', 'create')
  @Post()
  create(
    @Body(ParseObjectIdPipe) createPromotionDto: CreatePromotionDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.promotionService.create(createPromotionDto, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Get()
  findAll(@CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.promotionService.findAll([tenantId]);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.promotionService.findOne(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Post('find-all-by-rule')
  findAllByRule(
    @Body(ParseObjectIdPipe) query: RequestPromotionByRule,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { userId, bookingIds } = query;
    const { tenantId } = user;
    return this.promotionService.findAllByRule(userId, bookingIds, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Post('find-mass-promotion')
  findMassPromotion(
    @Body(ParseObjectIdPipe) query: RequestPromotionMass,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.promotionService.findMassPromotion(tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Put()
  update(
    @Body(ParseObjectIdPipe) updatePromotionDto: UpdatePromotionDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.promotionService.update(updatePromotionDto, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Put('updates')
  updates(
    @Body(ParseObjectIdPipe) updatePromotionDto: UpdatePromotionDto[],
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.promotionService.updates(updatePromotionDto, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.promotionService.remove(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Post('redeem')
  redeem(
    @Body(ParseObjectIdPipe) redeemPromotionDto: RedeemPromotionDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.promotionService.redeem(redeemPromotionDto, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Post('search')
  async searchPromotionPaging(
    @Body(ParseObjectIdPipe) query: SearchPromotionPagingQuery,
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
    return this.promotionService.searchPromotionPaging(+pageIdx, +pageSize, keyword, sortBy, filters, [tenantId]);
  }
}
