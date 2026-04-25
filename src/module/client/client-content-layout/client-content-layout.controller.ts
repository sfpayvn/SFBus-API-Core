import { Body, Controller, Get, Post, UseGuards, Headers, UseInterceptors } from '@nestjs/common';
import { RolesGuard } from '@/guards/roles.guard';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { Roles } from '@/decorators/roles.decorator';
import { ClientContentLayoutService } from './client-content-layout.service';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';
import { TenantScope, TenantScopeResult } from '@/common/tenant/tenant-scope';
import { MODULE_KEYS, FUNCTION_KEYS } from '@/common/constants/module-function-keys';
import { Feature } from '@/decorators/feature.decorator';
import { ClientAvailableBySlugQueryDto, ClientAvailableSlugQueryDto } from './dto/client-content-layout.dto';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { TenantByCodeInterceptor } from '@/interceptors/tenant-by-code.interceptor';
import { Types } from 'mongoose';
import { TenantIdByCode } from '@/decorators/tenant-by-code.decorator';

@Controller('client/content-layouts')
@UseInterceptors(TenantByCodeInterceptor)
export class ClientContentLayoutController {
  constructor(private readonly clientContentLayoutService: ClientContentLayoutService) {}

  @Post('available-slugs')
  @Feature(MODULE_KEYS.CONTENT_WIDGETS_BLOCK, FUNCTION_KEYS.CONTENT_WIDGETS_BLOCK.VIEW)
  findAvailableSlugs(
    @Body(ParseObjectIdPipe) query: ClientAvailableSlugQueryDto,
    @TenantIdByCode() tenantId: Types.ObjectId,
  ) {
    const { appSource, platform } = query;
    return this.clientContentLayoutService.findAvailableSlugByTenantId(appSource, platform, tenantId);
  }

  @Post('by-slug')
  @Feature(MODULE_KEYS.CONTENT_WIDGETS_BLOCK, FUNCTION_KEYS.CONTENT_WIDGETS_BLOCK.VIEW)
  findAvailableBySlug(
    @Body(ParseObjectIdPipe) query: ClientAvailableBySlugQueryDto,
    @TenantIdByCode() tenantId: Types.ObjectId,
  ) {
    const { appSource, platform, slug } = query;
    return this.clientContentLayoutService.findAvailableBySlugForTenantId(appSource, platform, slug, tenantId);
  }
}
