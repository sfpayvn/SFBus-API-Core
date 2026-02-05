import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, ParseArrayPipe } from '@nestjs/common';
import { SettingsService } from '../../core/settings/settings.service';
import { AdminCreateSettingDto } from './dto/admin-create-setting.dto';
import { AdminUpdateSettingDto } from './dto/admin-update-setting.dto';
import { SettingDto, SearchSettingsRes, SearchSettingsPagingQuery } from '../../core/settings/dto/setting.dto';
import { Types } from 'mongoose';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { Roles } from '@/decorators/roles.decorator';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserDto } from '../../core/user/user/dto/user.dto';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('admin/settings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminSettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post()
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  async create(
    @Body() createSettingDto: AdminCreateSettingDto,
    @CurrentUser(ParseObjectIdPipe) user: UserDto,
  ): Promise<SettingDto> {
    return this.settingsService.create(createSettingDto, user.tenantId);
  }

  @Post('create-or-update')
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  async createOrUpdate(
    @Body() createSettingDto: AdminCreateSettingDto,
    @CurrentUser(ParseObjectIdPipe) user: UserDto,
  ): Promise<SettingDto> {
    return this.settingsService.createOrUpdate(createSettingDto as any, user.tenantId);
  }

  @Post('create-or-updates')
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  async createOrUpdates(
    @Body()
    createSettingsDto: AdminCreateSettingDto[],
    @CurrentUser(ParseObjectIdPipe) user: UserDto,
  ): Promise<SettingDto[]> {
    return this.settingsService.createOrUpdates(createSettingsDto as any, user.tenantId);
  }

  @Put()
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  async update(
    @Body() updateSettingDto: AdminUpdateSettingDto,
    @CurrentUser(ParseObjectIdPipe) user: UserDto,
  ): Promise<SettingDto> {
    return this.settingsService.update(updateSettingDto, user.tenantId);
  }

  @Put('bulk')
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  async updateMany(
    @Body() updateSettingDtos: AdminUpdateSettingDto[],
    @CurrentUser(ParseObjectIdPipe) user: UserDto,
  ): Promise<SettingDto[]> {
    return this.settingsService.updateMany(updateSettingDtos as any, user.tenantId);
  }

  @Get('group/:groupName')
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  async findByGroup(
    @Param('groupName') groupName: string,
    @CurrentUser(ParseObjectIdPipe) user: UserDto,
  ): Promise<SettingDto[]> {
    return this.settingsService.findByGroupName(groupName, user.tenantId);
  }

  @Delete(':id')
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  async delete(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @CurrentUser(ParseObjectIdPipe) user: UserDto,
  ): Promise<{ success: boolean }> {
    const success = await this.settingsService.delete(id, user.tenantId);
    return { success };
  }

  @Get()
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  async findAll(@CurrentUser(ParseObjectIdPipe) user: UserDto): Promise<SettingDto[]> {
    return this.settingsService.findAll(user.tenantId);
  }

  @Get('name/:name')
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  async findByName(@Param('name') name: string, @CurrentUser(ParseObjectIdPipe) user: UserDto): Promise<SettingDto> {
    return this.settingsService.findByName(name, user.tenantId);
  }

  @Get(':id')
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  async findOne(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @CurrentUser(ParseObjectIdPipe) user: UserDto,
  ): Promise<SettingDto> {
    return this.settingsService.findOne(id, user.tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Post('search')
  async search(
    @Body(ParseObjectIdPipe) query: SearchSettingsPagingQuery,
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

    return this.settingsService.search(+pageIdx, +pageSize, keyword, sortBy, filters, tenantId);
  }
}
