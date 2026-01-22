import { Controller, Get, Post, Delete, Body, UseGuards, Param, Put, Query, ValidationPipe } from '@nestjs/common';
import { BusTemplateService } from './bus-template.service';
import { BusTemplateDto, SearchBusTemplateQuery } from './dto/bus-template.dto';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { UpdateBusTemplateDto } from './dto/update-bus-template.dto';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { Types } from 'mongoose';
import { CreateBusTemplateDto } from './dto/create-bus-template.dto';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('bus-templates')
export class BusTemplateController {
  constructor(private readonly busTemplateService: BusTemplateService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Post()
  async create(
    @Body(ParseObjectIdPipe) createBusTemplateDto: CreateBusTemplateDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return await this.busTemplateService.create(createBusTemplateDto, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Get('find-all')
  async findAll(@CurrentUser(ParseObjectIdPipe) user: UserTokenDto): Promise<BusTemplateDto[]> {
    const { tenantId } = user;
    return this.busTemplateService.findAll([tenantId]);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Get(':id')
  async findOne(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.busTemplateService.findOne(id, [tenantId]);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Put()
  update(
    @Body(ParseObjectIdPipe) updateBusTemplateDto: UpdateBusTemplateDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.busTemplateService.update(updateBusTemplateDto, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Delete(':id')
  delete(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.busTemplateService.delete(id, tenantId);
  }

  @Post('/search')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  search(@Body(ParseObjectIdPipe) query: SearchBusTemplateQuery, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
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
    return this.busTemplateService.search(+pageIdx, +pageSize, keyword, sortBy, filters, [tenantId]);
  }
}
