import { ClientBusScheduleService } from './client-bus-schedule.service';
import { ClientSearchBusSchedulePagingQuery } from './dto/client-bus-schedule.dto';
import { Types } from 'mongoose';
export declare class ClientBusScheduleController {
    private readonly clientBusScheduleService;
    constructor(clientBusScheduleService: ClientBusScheduleService);
    searchBusSchedulePaging(query: ClientSearchBusSchedulePagingQuery, tenantId: Types.ObjectId): Promise<import("./dto/client-bus-schedule.dto").ClientSearchBusSchedulePagingRes>;
}
