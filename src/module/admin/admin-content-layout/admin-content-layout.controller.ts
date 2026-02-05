import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { RolesGuard } from '@/guards/roles.guard';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { Roles } from '@/decorators/roles.decorator';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { AdminContentLayoutService } from './admin-content-layout.service';
import { Feature } from '@/decorators/feature.decorator';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';
import { FUNCTION_KEYS, MODULE_KEYS } from '@/common/constants/module-function-keys';
import { MarkDefaultTenant } from '@/interceptors/mark-default-tenant';
import { AdminSearchContentLayoutQuery } from './dto/admin-content-layout.dto';
import { TenantScope, TenantScopeResult } from '@/common/tenant/tenant-scope';
import { Types } from 'mongoose';
import { AdminCreateContentLayoutDto } from './dto/admin-create-content-layout.dto';

@Controller('admin/content-layouts')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
export class AdminContentLayoutController {
  constructor(private readonly adminContentLayoutService: AdminContentLayoutService) {}

  @Post()
  @UseInterceptors(MarkDefaultTenant())
  @Feature(MODULE_KEYS.CONTENT_LAYOUTS, FUNCTION_KEYS.CONTENT_LAYOUTS.CREATE)
  create(
    @Body(ParseObjectIdPipe) createContentLayoutDto: AdminCreateContentLayoutDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.adminContentLayoutService.create(createContentLayoutDto, tenantId);
  }

  @Put()
  @Feature(MODULE_KEYS.CONTENT_LAYOUTS, FUNCTION_KEYS.CONTENT_LAYOUTS.UPDATE)
  update(@Body() updateContentLayoutDto: any, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.adminContentLayoutService.update(updateContentLayoutDto, tenantId);
  }

  @Delete(':id')
  @Feature(MODULE_KEYS.CONTENT_LAYOUTS, FUNCTION_KEYS.CONTENT_LAYOUTS.DELETE)
  remove(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.adminContentLayoutService.remove(id, tenantId);
  }

  @Get()
  findAll(@CurrentUser(ParseObjectIdPipe) user: UserTokenDto, @TenantScope() tenantScope: TenantScopeResult) {
    const { tenantIds } = tenantScope;
    return this.adminContentLayoutService.findAll(tenantIds);
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.adminContentLayoutService.findOne(id, tenantId);
  }

  @Post('search')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(MarkDefaultTenant())
  search(@Body(ParseObjectIdPipe) query: AdminSearchContentLayoutQuery, @TenantScope() tenantScope: TenantScopeResult) {
    const { tenantIds } = tenantScope;
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
    return this.adminContentLayoutService.search(+pageIdx, +pageSize, keyword, sortBy, filters, tenantIds);
  }
}
