import { BusScheduleLayoutService } from '@/module/core/bus/bus-schedule-layout/bus-schedule-layout.service';
import { BusScheduleLayoutDocument } from '@/module/core/bus/bus-schedule-layout/schema/bus-schedule-layout.schema';
import { Model, Types } from 'mongoose';
import { DriverBusScheduleLayoutDto } from './dto/driver-bus-schedule-layout.dto';
export declare class DriverBusScheduleLayoutService {
    private readonly busScheduleLayoutModel;
    private readonly busScheduleLayoutService;
    constructor(busScheduleLayoutModel: Model<BusScheduleLayoutDocument>, busScheduleLayoutService: BusScheduleLayoutService);
    findAll(tenantId: Types.ObjectId): Promise<DriverBusScheduleLayoutDto[]>;
    findOne(busScheduleId: Types.ObjectId, tenantId: Types.ObjectId): Promise<DriverBusScheduleLayoutDto>;
    findOneByBusSchedule(busScheduleId: Types.ObjectId, tenantId: Types.ObjectId): Promise<DriverBusScheduleLayoutDto>;
}
