import { AdminBusScheduleService } from './admin-bus-schedule.service';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { AdminSearchBusSchedulePagingQuery } from './dto/admin-bus-schedule.dto';
import { AdminUpdateBusScheduleDto } from './dto/admin-update-bus-schedule.dto';
import { AdminCreateBusScheduleDto } from './dto/admin-create-bus-schedule.dto';
import { Types } from 'mongoose';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class AdminBusScheduleController {
    private readonly adminBusScheduleService;
    constructor(adminBusScheduleService: AdminBusScheduleService);
    create(adminCreateBusScheduleDto: AdminCreateBusScheduleDto, tenantScope: TenantScopeResult): Promise<import("./dto/admin-bus-schedule.dto").AdminBusScheduleDto>;
    findAll(user: UserTokenDto): Promise<import("./dto/admin-bus-schedule.dto").AdminBusScheduleDto[]>;
    findOne(id: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/admin-bus-schedule.dto").AdminBusScheduleDto>;
    update(adminUpdateBusScheduleDto: AdminUpdateBusScheduleDto, user: UserTokenDto): Promise<import("./dto/admin-bus-schedule.dto").AdminBusScheduleDto>;
    updateCurrentStation(currentStationId: Types.ObjectId, busScheduleId: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/admin-bus-schedule.dto").AdminBusScheduleDto>;
    delete(id: Types.ObjectId, user: UserTokenDto): Promise<boolean>;
    searchBusSchedulePaging(query: AdminSearchBusSchedulePagingQuery, user: UserTokenDto): Promise<import("./dto/admin-bus-schedule.dto").AdminSearchBusSchedulePagingRes>;
}
