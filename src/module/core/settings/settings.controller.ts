import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { SettingDto, SearchSettingsRes } from './dto/setting.dto';
import { Types } from 'mongoose';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { Roles } from '@/decorators/roles.decorator';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserDto } from '../user/user/dto/user.dto';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('settings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post()
  @Roles(ROLE_CONSTANTS.ADMIN)
  async create(
    @Body(ValidationPipe) createSettingDto: CreateSettingDto,
    @CurrentUser() user: UserDto,
  ): Promise<SettingDto> {
    return this.settingsService.create(createSettingDto, user.tenantId);
  }

  @Put()
  @Roles(ROLE_CONSTANTS.ADMIN)
  async update(
    @Body(ValidationPipe) updateSettingDto: UpdateSettingDto,
    @CurrentUser() user: UserDto,
  ): Promise<SettingDto> {
    return this.settingsService.update(updateSettingDto, user.tenantId);
  }

  @Post('create-or-update')
  @Roles(ROLE_CONSTANTS.ADMIN)
  async createOrUpdate(
    @Body(ValidationPipe) createSettingDto: CreateSettingDto,
    @CurrentUser() user: UserDto,
  ): Promise<SettingDto> {
    return this.settingsService.createOrUpdate(createSettingDto, user.tenantId);
  }

  @Post('create-or-updates')
  @Roles(ROLE_CONSTANTS.ADMIN)
  async createOrUpdates(
    @Body(ValidationPipe) createSettingsDto: CreateSettingDto[],
    @CurrentUser() user: UserDto,
  ): Promise<SettingDto[]> {
    return this.settingsService.createOrUpdates(createSettingsDto, user.tenantId);
  }

  @Put('bulk')
  @Roles(ROLE_CONSTANTS.ADMIN)
  async updateMany(
    @Body(ValidationPipe) updateSettingDtos: UpdateSettingDto[],
    @CurrentUser() user: UserDto,
  ): Promise<SettingDto[]> {
    return this.settingsService.updateMany(updateSettingDtos, user.tenantId);
  }

  @Delete(':id')
  @Roles(ROLE_CONSTANTS.ADMIN)
  async delete(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @CurrentUser() user: UserDto,
  ): Promise<{ success: boolean }> {
    const success = await this.settingsService.delete(id, user.tenantId);
    return { success };
  }

  @Get()
  @Roles(ROLE_CONSTANTS.ADMIN)
  async findAll(@CurrentUser() user: UserDto): Promise<SettingDto[]> {
    return this.settingsService.findAll(user.tenantId);
  }

  @Get('group/:groupName')
  @Roles(ROLE_CONSTANTS.ADMIN)
  async findByGroup(@Param('groupName') groupName: string, @CurrentUser() user: UserDto): Promise<SettingDto[]> {
    return this.settingsService.findByGroupName(groupName, user.tenantId);
  }

  @Get('name/:name')
  @Roles(ROLE_CONSTANTS.ADMIN)
  async findByName(@Param('name') name: string, @CurrentUser() user: UserDto): Promise<SettingDto> {
    return this.settingsService.findByName(name, user.tenantId);
  }

  @Get(':id')
  @Roles(ROLE_CONSTANTS.ADMIN)
  async findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @CurrentUser() user: UserDto): Promise<SettingDto> {
    return this.settingsService.findOne(id, user.tenantId);
  }
}
