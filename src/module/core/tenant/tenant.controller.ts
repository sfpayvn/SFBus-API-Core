import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Query, ValidationPipe } from '@nestjs/common';
import { Types } from 'mongoose';

import { TenantService } from './tenant.service';

import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}
}
