import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { AdminBusScheduleLayoutService } from './admin-bus-schedule-layout.service';
import { Types } from 'mongoose';
import { AdminCreateBusScheduleLayoutDto } from './dto/admin-create-bus-schedule-layout.dto';
import { AdminUpdateBusScheduleLayoutDto } from './dto/admin-update-bus-schedule-layout.dto';
export declare class AdminBusScheduleLayoutController {
    private readonly adminBusScheduleLayoutService;
    constructor(adminBusScheduleLayoutService: AdminBusScheduleLayoutService);
    create(adminCreateBusScheduleLayoutDto: AdminCreateBusScheduleLayoutDto, user: UserTokenDto): Promise<import("./dto/admin-bus-schedule-layout.dto").AdminBusScheduleLayoutDto>;
    update(id: string, adminUpdateBusScheduleLayoutDto: AdminUpdateBusScheduleLayoutDto, user: UserTokenDto): Promise<import("./dto/admin-bus-schedule-layout.dto").AdminBusScheduleLayoutDto>;
    remove(id: string, user: UserTokenDto): Promise<{
        message: string;
    }>;
    findAll(user: UserTokenDto): Promise<import("./dto/admin-bus-schedule-layout.dto").AdminBusScheduleLayoutDto[]>;
    findOne(id: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/admin-bus-schedule-layout.dto").AdminBusScheduleLayoutDto>;
    findOneByBusSchedule(busScheduleId: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/admin-bus-schedule-layout.dto").AdminBusScheduleLayoutDto>;
}
