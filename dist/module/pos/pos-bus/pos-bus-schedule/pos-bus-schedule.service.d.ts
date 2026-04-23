import { BusScheduleService } from '@/module/core/bus/bus-schedule/bus-schedule.service';
import { BusScheduleDocument } from '@/module/core/bus/bus-schedule/schema/bus-schedule.schema';
import { Model, Types } from 'mongoose';
import { PosBusScheduleDto, PosSearchBusSchedulePagingQuerySortFilter, PosSearchBusSchedulePagingRes } from './dto/pos-bus-schedule.dto';
import { PosUpdateBusScheduleDto } from './dto/pos-update-bus-schedule.dto';
export declare class PosBusScheduleService {
    private busScheduleModel;
    private readonly busScheduleService;
    private alphabet;
    private nanoid;
    constructor(busScheduleModel: Model<BusScheduleDocument>, busScheduleService: BusScheduleService);
    update(updateBusScheduleDto: PosUpdateBusScheduleDto, tenantId: Types.ObjectId): Promise<PosBusScheduleDto>;
    findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<PosBusScheduleDto>;
    findAll(tenantId: Types.ObjectId): Promise<PosBusScheduleDto[]>;
    searchBusSchedulePaging(pageIdx: number, pageSize: number, keyword: string, sortBy: PosSearchBusSchedulePagingQuerySortFilter, filters: PosSearchBusSchedulePagingQuerySortFilter[], tenantId: Types.ObjectId): Promise<PosSearchBusSchedulePagingRes>;
    searchBusScheduleDeparture(pageIdx: number, pageSize: number, keyword: string, sortBy: PosSearchBusSchedulePagingQuerySortFilter, filters: PosSearchBusSchedulePagingQuerySortFilter[], tenantId: Types.ObjectId): Promise<PosSearchBusSchedulePagingRes>;
    searchBusScheduleArrival(pageIdx: number, pageSize: number, keyword: string, sortBy: PosSearchBusSchedulePagingQuerySortFilter, filters: PosSearchBusSchedulePagingQuerySortFilter[], tenantId: Types.ObjectId): Promise<PosSearchBusSchedulePagingRes>;
    updateCurrentStation(busScheduleId: Types.ObjectId, currentStationId: Types.ObjectId, tenantId: Types.ObjectId): Promise<PosBusScheduleDto>;
}
