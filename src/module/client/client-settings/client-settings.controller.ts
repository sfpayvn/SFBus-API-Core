import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseArrayPipe,
  UseInterceptors,
} from '@nestjs/common';
import { SettingsService } from '../../core/settings/settings.service';
import { SettingDto, SearchSettingsRes } from '../../core/settings/dto/setting.dto';
import { Types } from 'mongoose';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { Roles } from '@/decorators/roles.decorator';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserDto } from '../../core/user/user/dto/user.dto';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';
import { TenantIdByCode } from '@/decorators/tenant-by-code.decorator';
import { TenantByCodeInterceptor } from '@/interceptors/tenant-by-code.interceptor';

@Controller('client/settings')
@UseInterceptors(TenantByCodeInterceptor)
export class ClientSettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('group/:groupName')
  async findByGroup(
    @Param('groupName') groupName: string,
    @TenantIdByCode() tenantId: Types.ObjectId,
  ): Promise<SettingDto[]> {
    return this.settingsService.findByGroupName(groupName, tenantId);
  }

  @Get()
  async findAll(@TenantIdByCode() tenantId: Types.ObjectId): Promise<SettingDto[]> {
    return this.settingsService.findAll(tenantId);
  }

  @Get('name/:name')
  async findByName(@Param('name') name: string, @TenantIdByCode() tenantId: Types.ObjectId): Promise<SettingDto> {
    return this.settingsService.findByName(name, tenantId);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @TenantIdByCode() tenantId: Types.ObjectId,
  ): Promise<SettingDto> {
    return this.settingsService.findOne(id, tenantId);
  }
}
