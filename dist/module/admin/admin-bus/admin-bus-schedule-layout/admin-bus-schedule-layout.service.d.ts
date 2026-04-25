import { BusScheduleLayoutService } from '@/module/core/bus/bus-schedule-layout/bus-schedule-layout.service';
import { BusScheduleLayoutDocument } from '@/module/core/bus/bus-schedule-layout/schema/bus-schedule-layout.schema';
import { Model, Types } from 'mongoose';
import { AdminBusScheduleLayoutDto } from './dto/admin-bus-schedule-layout.dto';
import { AdminCreateBusScheduleLayoutDto } from './dto/admin-create-bus-schedule-layout.dto';
import { AdminUpdateBusScheduleLayoutDto } from './dto/admin-update-bus-schedule-layout.dto';
export declare class AdminBusScheduleLayoutService {
    private readonly busScheduleLayoutModel;
    private readonly busScheduleLayoutService;
    constructor(busScheduleLayoutModel: Model<BusScheduleLayoutDocument>, busScheduleLayoutService: BusScheduleLayoutService);
    create(adminCreateBusScheduleLayoutDto: AdminCreateBusScheduleLayoutDto, tenantId: Types.ObjectId): Promise<AdminBusScheduleLayoutDto>;
    update(adminUpdateBusScheduleLayoutDto: AdminUpdateBusScheduleLayoutDto, tenantId: Types.ObjectId): Promise<AdminBusScheduleLayoutDto>;
    remove(id: string, tenantId: Types.ObjectId): Promise<void>;
    findAll(tenantId: Types.ObjectId): Promise<AdminBusScheduleLayoutDto[]>;
    findOne(busScheduleId: Types.ObjectId, tenantId: Types.ObjectId): Promise<AdminBusScheduleLayoutDto>;
    findOneByBusSchedule(busScheduleId: Types.ObjectId, tenantId: Types.ObjectId): Promise<AdminBusScheduleLayoutDto>;
}
