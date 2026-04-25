import { BusScheduleService } from '@/module/core/bus/bus-schedule/bus-schedule.service';
import { BusScheduleDocument } from '@/module/core/bus/bus-schedule/schema/bus-schedule.schema';
import { Model, Types } from 'mongoose';
import { AdminBusScheduleDto, AdminSearchBusSchedulePagingQuerySortFilter, AdminSearchBusSchedulePagingRes } from './dto/admin-bus-schedule.dto';
import { AdminCreateBusScheduleDto } from './dto/admin-create-bus-schedule.dto';
import { AdminUpdateBusScheduleDto } from './dto/admin-update-bus-schedule.dto';
export declare class AdminBusScheduleService {
    private busScheduleModel;
    private readonly busScheduleService;
    private alphabet;
    private nanoid;
    constructor(busScheduleModel: Model<BusScheduleDocument>, busScheduleService: BusScheduleService);
    create(adminCreateBusScheduleDto: AdminCreateBusScheduleDto, rootTenantId: Types.ObjectId, tenantId: Types.ObjectId): Promise<AdminBusScheduleDto>;
    findAll(tenantId: Types.ObjectId): Promise<AdminBusScheduleDto[]>;
    findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<AdminBusScheduleDto | null>;
    update(adminUpdateBusScheduleDto: AdminUpdateBusScheduleDto, tenantId: Types.ObjectId): Promise<AdminBusScheduleDto>;
    delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean>;
    searchBusSchedulePaging(pageIdx: number, pageSize: number, keyword: string, sortBy: AdminSearchBusSchedulePagingQuerySortFilter, filters: AdminSearchBusSchedulePagingQuerySortFilter[], tenantId: Types.ObjectId): Promise<AdminSearchBusSchedulePagingRes>;
    updateCurrentStation(busScheduleId: Types.ObjectId, currentStationId: Types.ObjectId, tenantId: Types.ObjectId): Promise<AdminBusScheduleDto>;
}
