import { BusScheduleAutogeneratorService } from '@/module/core/bus/bus-schedule-autogenerator/bus-schedule-autogenerator.service';
import { BusScheduleAutogeneratorDto } from '@/module/core/bus/bus-schedule-autogenerator/dto/bus-schedule-autogenerator.dto';
import { BusScheduleAutogeneratorDocument } from '@/module/core/bus/bus-schedule-autogenerator/schema/bus-schedule-autogenerator.schema';
import { Model, Types } from 'mongoose';
import { AdminBusScheduleAutogeneratorDto, AdminSearchBusSchedulePagingQuerySortFilter, AdminSearchBusScheduleRes } from './dto/admin-bus-schedule-autogenerator.dto';
import { AdminCreateBusScheduleAutogeneratorDto } from './dto/admin-create-bus-schedule-autogenerator.dto';
import { AdminUpdateBusScheduleAutogeneratorDto } from './dto/admin-update-bus-schedule-autogenerator.dto';
export declare class AdminBusScheduleAutogeneratorService {
    private busScheduleAutogeneratorModel;
    private readonly busScheduleAutogeneratorService;
    private alphabet;
    private nanoid;
    constructor(busScheduleAutogeneratorModel: Model<BusScheduleAutogeneratorDocument>, busScheduleAutogeneratorService: BusScheduleAutogeneratorService);
    create(adminCreateBusScheduleAutogeneratorDto: AdminCreateBusScheduleAutogeneratorDto, tenantId: Types.ObjectId, timezoneOffset: number): Promise<AdminBusScheduleAutogeneratorDto>;
    update(adminUpdateBusScheduleAutogeneratorDto: AdminUpdateBusScheduleAutogeneratorDto, tenantId: Types.ObjectId, timezoneOffset: number): Promise<BusScheduleAutogeneratorDto>;
    delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean>;
    findAll(tenantId: Types.ObjectId): Promise<AdminBusScheduleAutogeneratorDto[]>;
    runCreateBusSchedule(_id: Types.ObjectId, rootTenantId: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean>;
    searchBusScheduleAutogenerator(pageIdx: number, pageSize: number, keyword: string, sortBy: AdminSearchBusSchedulePagingQuerySortFilter, filters: AdminSearchBusSchedulePagingQuerySortFilter[], tenantId: Types.ObjectId): Promise<AdminSearchBusScheduleRes>;
    generateSchedulesForToday(tenantId: Types.ObjectId, timezoneOffset: number): Promise<void>;
}
