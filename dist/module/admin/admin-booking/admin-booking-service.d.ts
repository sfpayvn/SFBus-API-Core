import { Model, Types } from 'mongoose';
import { AdminBookingGateway } from './admin-booking.gateway';
import { BookingDocument } from '@/module/core/booking/schema/booking.schema';
import { BookingService } from '@/module/core/booking/booking-service';
import { AdminBookingDto, AdminBookingSortFilter, AdminSearchBookingPagingRes } from './dto/admin-booking.dto';
import { AdminPaymentService } from '../admin-payment/admin-payment-service';
import { BookingDto } from '@/module/core/booking/dto/booking.dto';
import { AdminCreateBookingDto } from './dto/admin-create-booking.dto';
import { AdminUpdateBookingDto } from './dto/admin-update-booking.dto';
export declare class AdminBookingService {
    private readonly bookingModel;
    private readonly bookingService;
    private readonly AdminPaymentService;
    private AdminBookingGateway;
    private alphabet;
    private nanoid;
    constructor(bookingModel: Model<BookingDocument>, bookingService: BookingService, AdminPaymentService: AdminPaymentService, AdminBookingGateway: AdminBookingGateway);
    findAllByScheduleId(busScheduleId: Types.ObjectId, tenantId: Types.ObjectId): Promise<AdminBookingDto[]>;
    create(adminCreateBookingDto: AdminCreateBookingDto[], tenantId: Types.ObjectId, userId: Types.ObjectId, idempotencyKey: string): Promise<AdminBookingDto[]>;
    update(adminUpdateBookingDto: AdminUpdateBookingDto, tenantId: Types.ObjectId): Promise<AdminBookingDto>;
    findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<BookingDto>;
    findAllByPaymentNumber(paymentNumber: string, tenantId: Types.ObjectId): Promise<AdminBookingDto[]>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: AdminBookingSortFilter, filters: AdminBookingSortFilter[], tenantId: Types.ObjectId): Promise<AdminSearchBookingPagingRes>;
}
