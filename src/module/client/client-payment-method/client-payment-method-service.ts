import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { PaymentMethodService } from '@/module/core/payment-method/payment-method-service';
import { PaymentMethodDto } from '@/module/core/payment-method/dto/payment-method.dto';
import { ClientBookingSortFilter, ClientPaymentMethodDto } from './dto/client-payment-method.dto';
import { COMMON_STATUS } from '@/common/constants/status.constants';

@Injectable()
export class ClientPaymentMethodService {
  constructor(
    @Inject(forwardRef(() => PaymentMethodService)) private readonly paymentMethodService: PaymentMethodService,
  ) {}

  async findAll(tenantIds: Types.ObjectId[]): Promise<ClientPaymentMethodDto[]> {
    const filters: ClientBookingSortFilter[] = [];
    const filterByStatus = {
      key: 'status',
      value: [COMMON_STATUS.ACTIVE],
    };

    filters.push(filterByStatus);

    return this.paymentMethodService.findAll(tenantIds, filters);
  }

  async findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<ClientPaymentMethodDto> {
    const filters: ClientBookingSortFilter[] = [];
    const filterByStatus = {
      key: 'status',
      value: [COMMON_STATUS.ACTIVE],
    };

    filters.push(filterByStatus);

    return this.paymentMethodService.findOne(id, tenantIds, filters);
  }

  async findDefault(tenantIds: Types.ObjectId[]): Promise<ClientPaymentMethodDto | null> {
    const filters: ClientBookingSortFilter[] = [];

    const filterByStatus = {
      key: 'status',
      value: [COMMON_STATUS.ACTIVE],
    };

    filters.push(filterByStatus);

    return this.paymentMethodService.findDefault(tenantIds, filters);
  }
}
