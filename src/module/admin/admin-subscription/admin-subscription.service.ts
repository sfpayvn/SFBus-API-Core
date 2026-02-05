import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { SubscriptionService } from '../../core/subscription/subscription.service';
import { CreateSubscriptionDto } from '../../core/subscription/dto/create-subscription.dto';
import { UpdateSubscriptionDto } from '../../core/subscription/dto/update-subscription.dto';
import { AdminSearchSubscriptionQuerySortFilter, AdminSearchSubscriptionsRes } from './dto/admin-subscription.dto';

@Injectable()
export class AdminSubscriptionService {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  create(createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionService.create(createSubscriptionDto);
  }

  update(updateSubscriptionDto: UpdateSubscriptionDto) {
    return this.subscriptionService.update(updateSubscriptionDto);
  }

  delete(id: Types.ObjectId) {
    return this.subscriptionService.delete(id);
  }

  findAllAvailable() {
    return this.subscriptionService.findAllAvailable();
  }

  findAll() {
    return this.subscriptionService.findAll();
  }

  findOne(id: Types.ObjectId) {
    return this.subscriptionService.findOne(id);
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: AdminSearchSubscriptionQuerySortFilter,
    filters: AdminSearchSubscriptionQuerySortFilter[],
  ): Promise<AdminSearchSubscriptionsRes> {
    return this.subscriptionService.search(pageIdx, pageSize, keyword, sortBy, filters);
  }
}
