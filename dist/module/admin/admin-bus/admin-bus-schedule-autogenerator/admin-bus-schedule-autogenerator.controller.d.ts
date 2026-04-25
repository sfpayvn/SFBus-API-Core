import { AdminBusScheduleAutogeneratorService } from './admin-bus-schedule-autogenerator.service';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { AdminCreateBusScheduleAutogeneratorDto } from './dto/admin-create-bus-schedule-autogenerator.dto';
import { AdminUpdateBusScheduleAutogeneratorDto } from './dto/admin-update-bus-schedule-autogenerator.dto';
import { Types } from 'mongoose';
import { AdminSearchBusScheduleAutogeneratorQuery } from './dto/admin-bus-schedule-autogenerator.dto';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class AdminBusScheduleAutogeneratorController {
    private readonly adminBusScheduleAutogeneratorService;
    constructor(adminBusScheduleAutogeneratorService: AdminBusScheduleAutogeneratorService);
    create(adminCreateBusScheduleAutogeneratorDto: AdminCreateBusScheduleAutogeneratorDto, user: UserTokenDto, timezoneOffset: number): Promise<import("./dto/admin-bus-schedule-autogenerator.dto").AdminBusScheduleAutogeneratorDto>;
    update(adminUpdateBusScheduleAutogeneratorDto: AdminUpdateBusScheduleAutogeneratorDto, user: UserTokenDto, timezoneOffset: number): Promise<import("../../../core/bus/bus-schedule-autogenerator/dto/bus-schedule-autogenerator.dto").BusScheduleAutogeneratorDto>;
    delete(id: Types.ObjectId, user: UserTokenDto): Promise<boolean>;
    findAll(user: UserTokenDto): Promise<import("./dto/admin-bus-schedule-autogenerator.dto").AdminBusScheduleAutogeneratorDto[]>;
    runCreateBusSchedule(_id: Types.ObjectId, tenantScope: TenantScopeResult): Promise<boolean>;
    searchBusScheduleAutogenerator(query: AdminSearchBusScheduleAutogeneratorQuery, user: UserTokenDto): Promise<import("./dto/admin-bus-schedule-autogenerator.dto").AdminSearchBusScheduleRes>;
}
