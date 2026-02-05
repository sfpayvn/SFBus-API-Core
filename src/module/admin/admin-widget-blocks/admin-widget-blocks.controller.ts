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
} from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { RolesGuard } from '@/guards/roles.guard';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { Roles } from '@/decorators/roles.decorator';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { AdminWidgetBlocksService } from './admin-widget-blocks.service';
import { Feature } from '@/decorators/feature.decorator';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';
import { FUNCTION_KEYS, MODULE_KEYS } from '@/common/constants/module-function-keys';
import { MarkDefaultTenant } from '@/interceptors/mark-default-tenant';
import { AdminSearchWidgetBlockQuery } from './dto/admin-widget-block.dto';
import { TenantScope, TenantScopeResult } from '@/common/tenant/tenant-scope';
import { Types } from 'mongoose';

@Controller('admin/widget-blocks')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
export class AdminWidgetBlocksController {
  constructor(private readonly adminWidgetBlocksService: AdminWidgetBlocksService) {}

  @Post()
  @UseInterceptors(MarkDefaultTenant())
  @Feature(MODULE_KEYS.CONTENT_WIDGETS_BLOCK, FUNCTION_KEYS.CONTENT_WIDGETS_BLOCK.CREATE)
  create(@Body(ParseObjectIdPipe) createWidgetBlockDto: any, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.adminWidgetBlocksService.create(createWidgetBlockDto, tenantId);
  }

  @Put(':id')
  @Feature(MODULE_KEYS.CONTENT_WIDGETS_BLOCK, FUNCTION_KEYS.CONTENT_WIDGETS_BLOCK.UPDATE)
  update(@Body(ParseObjectIdPipe) updateWidgetBlockDto: any, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.adminWidgetBlocksService.update(updateWidgetBlockDto, tenantId);
  }

  @Delete(':id')
  @Feature(MODULE_KEYS.CONTENT_WIDGETS_BLOCK, FUNCTION_KEYS.CONTENT_WIDGETS_BLOCK.DELETE)
  remove(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.adminWidgetBlocksService.remove(id, tenantId);
  }

  @Get('find-all')
  @Feature(MODULE_KEYS.CONTENT_WIDGETS_BLOCK, FUNCTION_KEYS.CONTENT_WIDGETS_BLOCK.VIEW)
  findAll(@TenantScope() tenantScope: TenantScopeResult) {
    const { tenantIds } = tenantScope;
    return this.adminWidgetBlocksService.findAll(tenantIds);
  }

  @Get(':id')
  @Feature(MODULE_KEYS.CONTENT_WIDGETS_BLOCK, FUNCTION_KEYS.CONTENT_WIDGETS_BLOCK.VIEW)
  findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.adminWidgetBlocksService.findOne(id, tenantId);
  }

  @Post('search')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(MarkDefaultTenant())
  search(@Body(ParseObjectIdPipe) query: AdminSearchWidgetBlockQuery, @TenantScope() tenantScope: TenantScopeResult) {
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
    return this.adminWidgetBlocksService.search(+pageIdx, +pageSize, keyword, sortBy, filters, tenantIds);
  }
}
