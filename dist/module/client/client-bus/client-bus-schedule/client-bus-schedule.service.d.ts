import { BusScheduleService } from '@/module/core/bus/bus-schedule/bus-schedule.service';
import { BusScheduleDocument } from '@/module/core/bus/bus-schedule/schema/bus-schedule.schema';
import { Model, Types } from 'mongoose';
import { ClientSearchBusSchedulePagingQuerySortFilter, ClientSearchBusSchedulePagingRes } from './dto/client-bus-schedule.dto';
export declare class ClientBusScheduleService {
    private busScheduleModel;
    private readonly busScheduleService;
    private alphabet;
    private nanoid;
    constructor(busScheduleModel: Model<BusScheduleDocument>, busScheduleService: BusScheduleService);
    searchBusSchedulePaging(pageIdx: number, pageSize: number, keyword: string, sortBy: ClientSearchBusSchedulePagingQuerySortFilter, filters: ClientSearchBusSchedulePagingQuerySortFilter[], tenantId: Types.ObjectId): Promise<ClientSearchBusSchedulePagingRes>;
}
