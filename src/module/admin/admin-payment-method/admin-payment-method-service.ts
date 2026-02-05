import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { PaymentMethodService } from '@/module/core/payment-method/payment-method-service';
import { CreatePaymentMethodDto } from '@/module/core/payment-method/dto/create-payment-method.dto';
import { PaymentMethodDto } from '@/module/core/payment-method/dto/payment-method.dto';
import { UpdatePaymentMethodDto } from '@/module/core/payment-method/dto/update-payment-method.dto';
import {
  AdminPaymentMethodDto,
  AdminSearchPaymentMethodPagingQuerySortFilter,
  AdminSearchPaymentMethodPagingRes,
} from './dto/admin-payment-method.dto';
import { AdminCreatePaymentMethodDto } from './dto/admin-create-payment-method.dto';
import { AdminUpdatePaymentMethodDto } from './dto/admin-update-payment-method.dto';

@Injectable()
export class AdminPaymentMethodService {
  constructor(
    @Inject(forwardRef(() => PaymentMethodService)) private readonly paymentMethodService: PaymentMethodService,
  ) {}

  async create(
    adminCreatePaymentMethodDto: AdminCreatePaymentMethodDto,
    tenantId: Types.ObjectId,
  ): Promise<AdminPaymentMethodDto> {
    return this.paymentMethodService.create(adminCreatePaymentMethodDto, tenantId);
  }

  async update(
    adminUpdatePaymentMethodDto: AdminUpdatePaymentMethodDto,
    tenantId: Types.ObjectId,
  ): Promise<AdminPaymentMethodDto> {
    return this.paymentMethodService.update(adminUpdatePaymentMethodDto, tenantId);
  }

  async remove(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean> {
    return this.paymentMethodService.remove(id, tenantId);
  }

  async findAll(tenantIds: Types.ObjectId[]): Promise<PaymentMethodDto[]> {
    return this.paymentMethodService.findAll(tenantIds);
  }

  async findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<AdminPaymentMethodDto> {
    return this.paymentMethodService.findOne(id, tenantIds);
  }

  async findDefault(tenantIds: Types.ObjectId[]): Promise<PaymentMethodDto | null> {
    return this.paymentMethodService.findDefault(tenantIds);
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: AdminSearchPaymentMethodPagingQuerySortFilter,
    filters: AdminSearchPaymentMethodPagingQuerySortFilter[],
    tenantIds: Types.ObjectId[],
  ): Promise<AdminSearchPaymentMethodPagingRes> {
    return this.paymentMethodService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
  }
}
