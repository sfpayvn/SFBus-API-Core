import { Types } from 'mongoose';
import { BookingService } from '@/module/core/booking/booking-service';
import { ClientBookingDto, ClientSearchBookingPagingQuery, ClientSearchBookingPagingRes } from './dto/client-booking.dto';
import { ClientPaymentService } from '../client-payment/client-payment-service';
import { BookingDto } from '@/module/core/booking/dto/booking.dto';
import { ClientCreateBookingDto } from './dto/client-create-booking.dto';
import { ClientTrackingService } from '../client-tracking/client-tracking.service';
export declare class ClientBookingService {
    private readonly bookingService;
    private readonly clientPaymentService;
    private readonly clientTrackingService;
    private alphabet;
    constructor(bookingService: BookingService, clientPaymentService: ClientPaymentService, clientTrackingService: ClientTrackingService);
    create(clientCreateBookingDto: ClientCreateBookingDto[], tenantId: Types.ObjectId, createdBy: Types.ObjectId, idempotencyKey: string): Promise<ClientBookingDto[]>;
    cancelBookingsByUser(userId: Types.ObjectId, busScheduleId: Types.ObjectId, bookingIds: Types.ObjectId[], tenantId: Types.ObjectId): Promise<boolean>;
    findAllByScheduleId(busScheduleId: Types.ObjectId, tenantId: Types.ObjectId): Promise<ClientBookingDto[]>;
    findIncommingBookingByUser(userId: Types.ObjectId, tenantId: Types.ObjectId): Promise<ClientBookingDto[]>;
    findHistoryByUser(query: ClientSearchBookingPagingQuery, userId: Types.ObjectId, tenantId: Types.ObjectId): Promise<ClientSearchBookingPagingRes>;
    findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<BookingDto>;
    findAllByBookingGroupNumber(bookingGroupNumber: string, tenantId: Types.ObjectId): Promise<ClientBookingDto[]>;
    findBookings2Payment(userId: Types.ObjectId, bookingIds: Types.ObjectId[], tenantId: Types.ObjectId): Promise<BookingDto[] | null>;
}
