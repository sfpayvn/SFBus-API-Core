import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Roles } from '@/decorators/roles.decorator';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { TenantSubscriptionService } from './tenant-subscription.service';
import { Types } from 'mongoose';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { RegisterSubscriptionDto } from './dto/tenant-subscription.dto';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('tenant-subscription')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TenantSubscriptionController {
  constructor(private svc: TenantSubscriptionService) {}

  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR) // hoặc 'owner' tuỳ mô hình
  @Post('register')
  register(@Body(ParseObjectIdPipe) dto: RegisterSubscriptionDto, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const tenantId = new Types.ObjectId(user.tenantId);
    return this.svc.registerForTenant(tenantId, dto);
  }
}
