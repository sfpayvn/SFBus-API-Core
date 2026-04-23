import { Model, Types } from 'mongoose';
import { DriverBookingGateway } from './driver-booking.gateway';
import { BookingDocument } from '@/module/core/booking/schema/booking.schema';
import { BookingService } from '@/module/core/booking/booking-service';
import { DriverTrackingService } from '../driver-tracking/driver-tracking.service';
import { DriverBookingDto, DriverBookingItemDto, DriverBookingSortFilter, DriverSearchBookingPagingRes } from './dto/driver-booking.dto';
import { DriverPaymentService } from '../driver-payment/driver-payment-service';
import { BookingDto, BookingItemDto } from '@/module/core/booking/dto/booking.dto';
import { DriverRequestUpdateBookingItemBoardingDto, DriverUpdateBookingItemDto } from './dto/driver-update-booking.dto';
export declare class DriverBookingService {
    private readonly bookingModel;
    private readonly bookingService;
    private readonly DriverPaymentService;
    private readonly driverTrackingService;
    private DriverBookingGateway;
    private alphabet;
    private nanoid;
    constructor(bookingModel: Model<BookingDocument>, bookingService: BookingService, DriverPaymentService: DriverPaymentService, driverTrackingService: DriverTrackingService, DriverBookingGateway: DriverBookingGateway);
    findAllByScheduleId(busScheduleId: Types.ObjectId, tenantId: Types.ObjectId): Promise<DriverBookingDto[]>;
    findOneBookingsByBookingItemId(bookingId: Types.ObjectId, tenantId: Types.ObjectId): Promise<DriverBookingDto>;
    updateBookingItems(busScheduleId: Types.ObjectId, driverUpdateBookingItemDto: DriverUpdateBookingItemDto[], tenantId: Types.ObjectId, updatedBy: Types.ObjectId): Promise<DriverBookingItemDto>;
    findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<BookingDto>;
    findAllByPaymentNumber(paymentNumber: string, tenantId: Types.ObjectId): Promise<DriverBookingDto[]>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: DriverBookingSortFilter, filters: DriverBookingSortFilter[], tenantId: Types.ObjectId): Promise<DriverSearchBookingPagingRes>;
    private prepareChanges;
    updateBookingItemBoarding(driverRequestUpdateBookingItemBoardingDto: DriverRequestUpdateBookingItemBoardingDto, tenantId: Types.ObjectId, updatedBy: Types.ObjectId): Promise<(BookingItemDto & {
        _oldData?: any;
    })[]>;
}
