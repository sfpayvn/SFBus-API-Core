import { Model, Types } from 'mongoose';
import { BookingDocument } from '../../booking/schema/booking.schema';
import { BusScheduleDocument } from '../../bus/bus-schedule/schema/bus-schedule.schema';
import { GoodsDocument } from '../../goods/goods/schema/goods.schema';
import { PaymentDocument } from '../../payment/schema/payment.schema';
import { DetailResponseDto, GroupedDetailResponseDto } from '../dto/report-details.dto';
import { ReportDateHelperService } from './report-date-helper.service';
export declare class ReportDetailHelperService {
    private readonly bookingModel;
    private readonly busScheduleModel;
    private readonly goodsModel;
    private readonly paymentModel;
    private readonly dateHelper;
    constructor(bookingModel: Model<BookingDocument>, busScheduleModel: Model<BusScheduleDocument>, goodsModel: Model<GoodsDocument>, paymentModel: Model<PaymentDocument>, dateHelper: ReportDateHelperService);
    getGroupedBookingDetails(filter: any, startDate: Date, endDate: Date, groupBy: 'hour' | 'day' | 'week' | 'month'): Promise<GroupedDetailResponseDto<any>>;
    buildDetailFilter(tenantId: Types.ObjectId, startDate: Date, endDate: Date, dateField: 'createdAt' | 'startDate', additionalFilters?: any): any;
    getPaginatedData(model: Model<any>, filter: any, pageIdx: number, pageSize: number, sortField?: string): Promise<DetailResponseDto<any>>;
}
