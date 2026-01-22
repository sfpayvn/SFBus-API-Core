import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BookingDocument } from '../../booking/schema/booking.schema';
import { BusScheduleDocument } from '../../bus/bus-schedule/schema/bus-schedule.schema';
import { GoodsDocument } from '../../goods/goods/schema/goods.schema';
import { PaymentDocument } from '../../payment/schema/payment.schema';
import {
  BookingDetailQueryDto,
  ScheduleDetailQueryDto,
  GoodsDetailQueryDto,
  PaymentDetailQueryDto,
  DetailResponseDto,
  GroupedDetailResponseDto,
} from '../dto/report-details.dto';
import { ReportDateHelperService } from './report-date-helper.service';

@Injectable()
export class ReportDetailHelperService {
  constructor(
    @InjectModel(BookingDocument.name)
    private readonly bookingModel: Model<BookingDocument>,
    @InjectModel(BusScheduleDocument.name)
    private readonly busScheduleModel: Model<BusScheduleDocument>,
    @InjectModel(GoodsDocument.name)
    private readonly goodsModel: Model<GoodsDocument>,
    @InjectModel(PaymentDocument.name)
    private readonly paymentModel: Model<PaymentDocument>,
    private readonly dateHelper: ReportDateHelperService,
  ) {}

  /**
   * Helper method to group booking details by date
   */
  async getGroupedBookingDetails(
    filter: any,
    startDate: Date,
    endDate: Date,
    groupBy: 'hour' | 'day' | 'week' | 'month',
  ): Promise<GroupedDetailResponseDto<any>> {
    const allBookings = await this.bookingModel.find(filter).sort({ createdAt: 1 }).lean().exec();
    return this.dateHelper.groupDataByDate(allBookings, startDate, endDate, groupBy, 'createdAt');
  }

  /**
   * Build common filter for detail queries
   */
  buildDetailFilter(
    tenantId: Types.ObjectId,
    startDate: Date,
    endDate: Date,
    dateField: 'createdAt' | 'startDate',
    additionalFilters?: any,
  ): any {
    const filter: any = {
      tenantId,
    };

    if (dateField === 'createdAt') {
      filter.createdAt = {
        $gte: startDate,
        $lte: endDate,
      };
    } else {
      filter.startDate = {
        $gte: startDate.toISOString().split('T')[0],
        $lte: endDate.toISOString().split('T')[0],
      };
    }

    if (additionalFilters) {
      Object.assign(filter, additionalFilters);
    }

    return filter;
  }

  /**
   * Get paginated data from any model
   */
  async getPaginatedData(
    model: Model<any>,
    filter: any,
    pageIdx: number,
    pageSize: number,
    sortField: string = 'createdAt',
  ): Promise<DetailResponseDto<any>> {
    const total = await model.countDocuments(filter).exec();

    const data = await model
      .find(filter)
      .sort({ [sortField]: -1 })
      .skip(pageIdx * pageSize)
      .limit(pageSize)
      .lean()
      .exec();

    const totalPages = Math.ceil(total / pageSize);

    return {
      data,
      total,
      pageIdx,
      pageSize,
      totalPages,
      metadata: {
        startDate: filter.createdAt?.$gte?.toISOString() || filter.startDate?.$gte,
        endDate: filter.createdAt?.$lte?.toISOString() || filter.startDate?.$lte,
      },
    };
  }
}
