import { Model, Types } from 'mongoose';
import { BusScheduleLayoutDocument } from './schema/bus-schedule-layout.schema';
import { CreateBusScheduleLayoutDto } from './dto/create-bus-schedule-layout.dto';
import { BusScheduleLayoutDto, RequestUpdateSeatStatusDto } from './dto/bus-schedule-layout.dto';
import { UpdateBusScheduleLayoutDto } from './dto/update-bus-schedule-layout.dto';
import { BookingService } from '../../booking/booking-service';
import { SeatTypeService } from '../../seat/seat-type/seat-type.service';
export declare class BusScheduleLayoutService {
    private readonly busScheduleLayoutModel;
    private readonly bookingService;
    private readonly seatTypeService;
    ROOT_TENANT_ID: string;
    constructor(busScheduleLayoutModel: Model<BusScheduleLayoutDocument>, bookingService: BookingService, seatTypeService: SeatTypeService);
    create(createBusScheduleLayoutDto: CreateBusScheduleLayoutDto, tenantId: Types.ObjectId): Promise<BusScheduleLayoutDto>;
    findAll(tenantId: Types.ObjectId): Promise<BusScheduleLayoutDto[]>;
    findOne(busScheduleId: Types.ObjectId, tenantId: Types.ObjectId): Promise<BusScheduleLayoutDto>;
    findOneByBusSchedule(busScheduleId: Types.ObjectId, tenantId: Types.ObjectId): Promise<BusScheduleLayoutDto>;
    update(updateBusScheduleLayoutDto: UpdateBusScheduleLayoutDto, tenantId: Types.ObjectId): Promise<BusScheduleLayoutDto>;
    updateSeatStatusByBusSchedule(busScheduleId: Types.ObjectId, requestUpdateSeatDto: RequestUpdateSeatStatusDto[], tenantId: Types.ObjectId): Promise<boolean>;
    updateCancelledSeatStatusByBusSchedule(busScheduleId: Types.ObjectId, seatIds: Types.ObjectId[], tenantId: Types.ObjectId): Promise<boolean>;
    remove(id: string, tenantId: Types.ObjectId): Promise<void>;
    getRemainSeats(busScheduleId: Types.ObjectId, tenantId: Types.ObjectId): Promise<number>;
}
