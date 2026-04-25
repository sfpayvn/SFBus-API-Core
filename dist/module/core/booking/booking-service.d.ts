import { Model, Types } from 'mongoose';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingDocument } from './schema/booking.schema';
import { BookingDto, BookingItemDto, BookingSortFilter, SearchBookingPagingRes } from './dto/booking.dto';
import { UpdateBookingDto, UpdateBookingItemDto } from './dto/update-booking.dto';
import { BookingGateway } from './booking.gateway';
import { PaymentService } from '../payment/payment-service';
import { BusScheduleLayoutService } from '../bus/bus-schedule-layout/bus-schedule-layout.service';
import { BusScheduleService } from '../bus/bus-schedule/bus-schedule.service';
import { CounterService } from '../counter/counter-service';
export declare class BookingService {
    private readonly bookingModel;
    private readonly busScheduleService;
    private readonly counterService;
    private readonly paymentService;
    private readonly busScheduleLayoutService;
    private bookingGateway;
    private rootTenantId;
    private alphabet;
    private nanoid;
    constructor(bookingModel: Model<BookingDocument>, busScheduleService: BusScheduleService, counterService: CounterService, paymentService: PaymentService, busScheduleLayoutService: BusScheduleLayoutService, bookingGateway: BookingGateway);
    private toBookingDto;
    watchChanges(): Promise<void>;
    create(createBookings: CreateBookingDto[], tenantId: Types.ObjectId, userId: Types.ObjectId, idempotencyKey: string): Promise<BookingDto[]>;
    update(updateBookingDto: UpdateBookingDto, tenantId: Types.ObjectId): Promise<BookingDto & {
        _oldData?: any;
    }>;
    updateStatusById(bookingId: Types.ObjectId, status: string, tenantId: Types.ObjectId): Promise<BookingDto>;
    updateBookingItems(busScheduleId: Types.ObjectId, updateBookingItemDtos: UpdateBookingItemDto[], tenantId: Types.ObjectId): Promise<(BookingItemDto & {
        _oldData?: any;
    })[]>;
    updateBookingItemBoarding(busScheduleId: Types.ObjectId, bookingItemIds: Types.ObjectId[], status: string, tenantId: Types.ObjectId): Promise<(BookingItemDto & {
        _oldData?: any;
    })[]>;
    cancelBookingsByCustomer(userId: Types.ObjectId, busScheduleId: Types.ObjectId, bookingIds: Types.ObjectId[], tenantId: Types.ObjectId): Promise<boolean>;
    cancelBookings(busScheduleId: Types.ObjectId, bookingIds: Types.ObjectId[], tenantId: Types.ObjectId, updatedBy: Types.ObjectId): Promise<boolean>;
    cancelBookingsByUser(userId: Types.ObjectId, busScheduleId: Types.ObjectId, bookingIds: Types.ObjectId[], tenantId: Types.ObjectId): Promise<boolean>;
    deleteOne(id: string): Promise<boolean>;
    findAll(tenantId: Types.ObjectId): Promise<BookingDto[]>;
    findAllByBookingGroupNumber(bookingGroupNumber: string, tenantId: Types.ObjectId): Promise<BookingDto[]>;
    findByIds(bookingIds: Types.ObjectId[], tenantId: Types.ObjectId): Promise<BookingDto[] | null>;
    findOneByBookingNumber(bookingNumber: string, tenantId: Types.ObjectId): Promise<BookingDto>;
    findOneBookingsByBookingItemId(bookingItemId: Types.ObjectId, tenantId: Types.ObjectId): Promise<BookingDto>;
    findAllByScheduleId(busScheduleId: Types.ObjectId, tenantId: Types.ObjectId, filters?: BookingSortFilter[]): Promise<BookingDto[]>;
    findAllByUser(userId: Types.ObjectId, tenantId: Types.ObjectId): Promise<BookingDto[]>;
    findIncommingBookingByUser(userId: Types.ObjectId, tenantId: Types.ObjectId): Promise<BookingDto[]>;
    findOneByIdAndUser(userId: Types.ObjectId, bookingId: Types.ObjectId, tenantId: Types.ObjectId): Promise<BookingDto | null>;
    findOneByIdsAndUser(userId: Types.ObjectId, bookingIds: Types.ObjectId[], tenantId: Types.ObjectId): Promise<BookingDto[] | null>;
    findBookings2Payment(userId: Types.ObjectId, bookingIds: Types.ObjectId[], tenantId: Types.ObjectId): Promise<BookingDto[] | null>;
    findBookingSeats(seatIds: Types.ObjectId[], tenantId: Types.ObjectId): Promise<Types.ObjectId[] | null>;
    findBookingBySchedule(busScheduleId: Types.ObjectId, tenantId: Types.ObjectId): Promise<BookingDto[] | null>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: BookingSortFilter, filters: BookingSortFilter[], tenantId: Types.ObjectId): Promise<SearchBookingPagingRes>;
    buildQuerySearchBookingPaging(pageIdx: number, pageSize: number, keyword: string, sortBy: BookingSortFilter, filters: BookingSortFilter[], tenantId: Types.ObjectId): Promise<any>;
    findOne(id: Types.ObjectId): Promise<BookingDto>;
    findOneWithTenant(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<BookingDto>;
    generateNumberAlphabet(): string;
}
