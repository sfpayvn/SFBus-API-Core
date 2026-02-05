import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { TenantService } from '../../core/tenant/tenant.service';

@Injectable()
export class ClientTenantService {
  constructor(@Inject(forwardRef(() => TenantService)) private readonly tenantService: TenantService) {}

  findOne(id: string) {
    return this.tenantService.findOne(new Types.ObjectId(id));
  }

  findByCode(code: string) {
    return this.tenantService.findByCode(code);
  }

  findByPhoneNumber(phoneNumber: string) {
    return this.tenantService.findByPhoneNumber(phoneNumber);
  }
}
