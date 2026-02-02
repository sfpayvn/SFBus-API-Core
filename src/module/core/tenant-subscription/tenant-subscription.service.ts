import { Injectable, BadRequestException, NotFoundException, forwardRef, Inject } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Types, ClientSession, Connection } from 'mongoose';
import { TenantSubscriptionDocument } from './schema/tenant-subscription.schema';
import { SubscriptionDocument } from '../subscription/schema/subscription.schema';
import {
  RegisterSubscriptionDto,
  SearchTenantSubscriptionQuerySortFilter,
  SearchTenantSubscriptionRes,
  TenantSubscriptionDto,
} from './dto/tenant-subscription.dto';
import { plainToInstance } from 'class-transformer';
import { SeatTypeDto, SearchSeatTypeQuerySortFilter } from '../seat/seat-type/dto/seat-type.dto';
import { DURATION_STATUS } from '@/common/constants/status.constants';
import { SubscriptionService } from '../subscription/subscription.service';
import { getFirstValue } from '@/utils/utils';

function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  const day = d.getDate();
  d.setMonth(d.getMonth() + months);
  // handle end-of-month rollover
  if (d.getDate() < day) d.setDate(0);
  return d;
}
function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

@Injectable()
export class TenantSubscriptionService {
  constructor(
    @InjectModel(TenantSubscriptionDocument.name)
    private readonly tenantSubModel: Model<TenantSubscriptionDocument>,
    @Inject(forwardRef(() => SubscriptionService))
    private readonly subscriptionService: SubscriptionService,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  /**
   * Đăng ký subscription cho tenant hiện tại.
   * - Nếu replaceCurrent=false và đang có sub 'active' (thời gian chồng lắp) => throw.
   * - Nếu replaceCurrent=true => chuyển status bản hiện tại thành 'canceled'.
   * - Snapshot name/price/duration/limitation để cố định theo thời điểm mua.
   */
  async registerForTenant(tenantId: Types.ObjectId, dto: RegisterSubscriptionDto): Promise<TenantSubscriptionDto> {
    const subId = new Types.ObjectId(dto.subscriptionId);

    // Sử dụng transaction để đảm bảo tính nhất quán
    const session = await this.connection.startSession();
    try {
      return await session.withTransaction(async () => {
        const plan = await this.subscriptionService.findOne(subId);
        if (!plan) throw new NotFoundException('Subscription plan not found');

        const startAt = dto.startAt ? new Date(dto.startAt) : new Date();
        if (isNaN(+startAt)) throw new BadRequestException('Invalid startAt');

        const durationUnit = dto.durationUnit ?? plan.durationUnit;
        const duration = dto.durationOverride ?? plan.duration ?? 0;

        // Calculate endAt based on durationUnit, handle lifetime
        let endAt: Date;
        switch (durationUnit) {
          case DURATION_STATUS.LIFETIME:
            // Lifetime: set to year 9999
            endAt = new Date('9999-12-31');
            break;
          case DURATION_STATUS.DAY:
            endAt = addDays(startAt, duration);
            break;
          case DURATION_STATUS.WEEK:
            endAt = addDays(startAt, duration * 7);
            break;
          case DURATION_STATUS.YEAR:
            // Add years: multiply by 12 months
            endAt = addMonths(startAt, duration * 12);
            break;
          default:
            // Default to month
            endAt = addMonths(startAt, duration);
        }

        // Kiểm tra chồng lắp active
        const overlapping = await this.tenantSubModel
          .findOne({
            tenantId,
            status: 'active',
          })
          .session(session);

        if (overlapping) {
          if (dto.replaceCurrent) {
            overlapping.status = 'canceled';
            await overlapping.save({ session });
          } else {
            throw new BadRequestException('Tenant already has an active subscription in this period');
          }
        }

        const created = await this.tenantSubModel.create(
          [
            {
              tenantId,
              subscriptionId: plan._id,
              name: plan.name,
              price: plan.price,
              duration,
              durationUnit,
              limitationSnapshot: plan.limitation, // snapshot nguyên trạng
              startAt,
              endAt,
              status: 'active',
            },
          ],
          { session },
        );
        return plainToInstance(TenantSubscriptionDto, created[0], { excludeExtraneousValues: true });
      });
    } finally {
      session.endSession();
    }
  }

  async registerPopularSubscription(tenantId: Types.ObjectId): Promise<TenantSubscriptionDto> {
    const popularSubscription = this.subscriptionService.findPopular();

    if (!popularSubscription) {
      throw new NotFoundException('No popular subscription found to assign to new tenant.');
    }

    const registerSubscriptionDto: RegisterSubscriptionDto = {
      subscriptionId: (await popularSubscription)._id as any,
      startAt: new Date().toISOString(),
      replaceCurrent: true,
    };

    return this.registerForTenant(tenantId, registerSubscriptionDto);
  }
  /**
   * Tiện ích: lấy sub 'active' hiện tại (nếu còn hạn).
   */
  async getActive(tenantId: Types.ObjectId) {
    const now = new Date();
    return this.tenantSubModel
      .findOne({
        tenantId,
        status: 'active',
        startAt: { $lte: now },
        endAt: { $gt: now },
      })
      .exec();
  }

  async findByTenantId(tenantId: Types.ObjectId): Promise<TenantSubscriptionDto | null> {
    const tenantSubModel = await this.tenantSubModel.findOne({ tenantId }).lean().exec();
    if (!tenantSubModel) return null;
    const tenant = plainToInstance(TenantSubscriptionDto, tenantSubModel);

    return tenant;
  }

  async findAllByTenantId(tenantId: Types.ObjectId): Promise<TenantSubscriptionDto[]> {
    const tenantSubModels = await this.tenantSubModel.find({ tenantId }).lean().exec();
    const tenants = plainToInstance(
      TenantSubscriptionDto,
      tenantSubModels.map((tenant) => tenant),
    );

    return tenants;
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchTenantSubscriptionQuerySortFilter,
    filters: SearchTenantSubscriptionQuerySortFilter[],
  ): Promise<SearchTenantSubscriptionRes> {
    const pipeline = await this.buildQuerySearchTenantSubscriptions(pageIdx, pageSize, keyword, sortBy, filters);

    // Thực hiện tìm kiếm
    const tenantSubscriptions = await this.tenantSubModel.aggregate(pipeline).exec();

    const tenantId = filters.find((f) => f.key === 'tenantId')?.value;

    // Đếm tổng số mục
    const countQuery = tenantId ? { tenantId } : {};
    const totalItem = await this.tenantSubModel.countDocuments(countQuery);

    const result = plainToInstance(
      TenantSubscriptionDto,
      tenantSubscriptions.map((tenantSubscription) => tenantSubscription),
    );

    return {
      pageIdx,
      tenantSubscriptions: result,
      totalPage: Math.ceil(totalItem / pageSize),
      totalItem,
    };
  }

  async buildQuerySearchTenantSubscriptions(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchTenantSubscriptionQuerySortFilter,
    filters: SearchTenantSubscriptionQuerySortFilter[],
  ) {
    // Thêm điều kiện kiểm tra điểm khởi hành nếu có

    const skip = pageIdx ? (pageIdx - 1) * pageSize : 0;

    const pipeline: any = [];
    const matchConditions: any[] = [];

    // 1. Tìm theo keyword
    if (keyword) {
      matchConditions.push({
        $or: [{ name: { $regex: keyword, $options: 'i' } }],
      });
    }

    // 2. Xác định start/end date và các filter còn lại
    let startDateValue: string = '';
    let endDateValue: string = '';

    if (Array.isArray(filters)) {
      await Promise.all(
        filters.map(async ({ key, value }) => {
          if (!key || value == null) return;

          if (key === 'startDate') {
            startDateValue = getFirstValue(value);
          } else if (key === 'endDate') {
            endDateValue = getFirstValue(value);
          } else {
            matchConditions.push({ [key]: value });
          }
        }),
      );
    }

    // 3. Tạo điều kiện range cho createdAt nếu có startDate và/hoặc endDate
    if (startDateValue || endDateValue) {
      const rangeCond: any = {};
      if (startDateValue) rangeCond.$gte = startDateValue;
      if (endDateValue) rangeCond.$lte = endDateValue;

      matchConditions.push({ createDate: rangeCond });
    }

    // 4. Đẩy $match nếu có bất kỳ điều kiện nào
    if (matchConditions.length) {
      pipeline.push({
        $match: { $and: matchConditions },
      });
    }

    // 4. $sort
    if (sortBy?.key) {
      pipeline.push({
        $sort: { [sortBy.key]: sortBy.value === 'ascend' ? 1 : -1 },
      });
    }

    // 5. paging: $skip + $limit
    pipeline.push({ $skip: skip }, { $limit: pageSize });
    return pipeline;
  }
}
