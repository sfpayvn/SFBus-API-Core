import { BusScheduleAutogeneratorService } from '@/module/core/bus/bus-schedule-autogenerator/bus-schedule-autogenerator.service';
import { BusScheduleAutogeneratorDto } from '@/module/core/bus/bus-schedule-autogenerator/dto/bus-schedule-autogenerator.dto';
import { BusScheduleAutogeneratorDocument } from '@/module/core/bus/bus-schedule-autogenerator/schema/bus-schedule-autogenerator.schema';
import { Model, Types } from 'mongoose';
import { PosBusScheduleAutogeneratorDto, PosSearchBusSchedulePagingQuerySortFilter, PosSearchBusScheduleRes } from './dto/pos-bus-schedule-autogenerator.dto';
import { PosCreateBusScheduleAutogeneratorDto } from './dto/pos-create-bus-schedule-autogenerator.dto';
import { PosUpdateBusScheduleAutogeneratorDto } from './dto/pos-update-bus-schedule-autogenerator.dto';
export declare class PosBusScheduleAutogeneratorService {
    private busScheduleAutogeneratorModel;
    private readonly busScheduleAutogeneratorService;
    private alphabet;
    private nanoid;
    constructor(busScheduleAutogeneratorModel: Model<BusScheduleAutogeneratorDocument>, busScheduleAutogeneratorService: BusScheduleAutogeneratorService);
    create(PosCreateBusScheduleAutogeneratorDto: PosCreateBusScheduleAutogeneratorDto, tenantId: Types.ObjectId, timezoneOffset: number): Promise<PosBusScheduleAutogeneratorDto>;
    update(PosUpdateBusScheduleAutogeneratorDto: PosUpdateBusScheduleAutogeneratorDto, tenantId: Types.ObjectId, timezoneOffset: number): Promise<BusScheduleAutogeneratorDto>;
    delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean>;
    findAll(tenantId: Types.ObjectId): Promise<PosBusScheduleAutogeneratorDto[]>;
    searchBusScheduleAutogenerator(pageIdx: number, pageSize: number, keyword: string, sortBy: PosSearchBusSchedulePagingQuerySortFilter, filters: PosSearchBusSchedulePagingQuerySortFilter[], tenantId: Types.ObjectId): Promise<PosSearchBusScheduleRes>;
    generateSchedulesForToday(tenantId: Types.ObjectId, timezoneOffset: number): Promise<void>;
}
