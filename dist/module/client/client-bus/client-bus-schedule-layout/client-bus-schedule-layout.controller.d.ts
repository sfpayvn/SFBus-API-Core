import { ClientBusScheduleLayoutService } from './client-bus-schedule-layout.service';
import { Types } from 'mongoose';
export declare class ClientBusScheduleLayoutController {
    private readonly ClientBusScheduleLayoutService;
    constructor(ClientBusScheduleLayoutService: ClientBusScheduleLayoutService);
    findAll(tenantId: Types.ObjectId): Promise<import("./dto/client-bus-schedule-layout.dto").ClientBusScheduleLayoutDto[]>;
    findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<import("./dto/client-bus-schedule-layout.dto").ClientBusScheduleLayoutDto>;
    findOneByBusSchedule(busScheduleId: Types.ObjectId, tenantId: Types.ObjectId): Promise<any>;
}
