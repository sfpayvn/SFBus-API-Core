import { BusScheduleService } from '@/module/core/bus/bus-schedule/bus-schedule.service';
import { BusScheduleDocument } from '@/module/core/bus/bus-schedule/schema/bus-schedule.schema';
import { Model, Types } from 'mongoose';
import { DriverBusScheduleDto, DriverSearchBusSchedulePagingQuerySortFilter } from './dto/driver-bus-schedule.dto';
export declare class DriverBusScheduleService {
    private busScheduleModel;
    private readonly busScheduleService;
    constructor(busScheduleModel: Model<BusScheduleDocument>, busScheduleService: BusScheduleService);
    findAll(tenantId: Types.ObjectId): Promise<DriverBusScheduleDto[]>;
    findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<DriverBusScheduleDto>;
    searchBusScheduleByDriver(keyword: string, sortBy: DriverSearchBusSchedulePagingQuerySortFilter, filters: DriverSearchBusSchedulePagingQuerySortFilter[], driverId: Types.ObjectId, tenantId: Types.ObjectId): Promise<DriverBusScheduleDto[]>;
    updateCurrentStation(busScheduleId: Types.ObjectId, currentStationId: Types.ObjectId, tenantId: Types.ObjectId): Promise<DriverBusScheduleDto>;
}
